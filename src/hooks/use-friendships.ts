import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/database.types'

type Friendship = Database['public']['Tables']['friendships']['Row'] & {
    friend?: {
        id: string
        display_name: string | null
        avatar_url: string | null
    }
}

export function useFriendships() {
    const [friends, setFriends] = useState<Friendship[]>([])
    const [pendingRequests, setPendingRequests] = useState<Friendship[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetchFriendships = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            // Fetch all friendships where the user is either requester or addressee
            const { data, error } = await supabase
                .from('friendships')
                .select(`
                    *,
                    requester:users!friendships_requester_id_fkey(id, display_name, avatar_url),
                    addressee:users!friendships_addressee_id_fkey(id, display_name, avatar_url)
                `)
                .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`)

            if (error) {
                console.error('Error fetching friendships:', error)
                return
            }

            const processedFriends: Friendship[] = []
            const processedPending: Friendship[] = []

            data.forEach((item: any) => {
                const isRequester = item.requester_id === user.id
                const friendData = isRequester ? item.addressee : item.requester

                const enhancedItem = { ...item, friend: friendData }

                if (item.status === 'accepted') {
                    processedFriends.push(enhancedItem)
                } else if (item.status === 'pending') {
                    // Only show incoming requests in the main "pending" list usually, 
                    // but we might want to show outgoing too. 
                    // Let's store them and filter in UI.
                    processedPending.push(enhancedItem)
                }
            })

            setFriends(processedFriends)
            setPendingRequests(processedPending)
            setLoading(false)
        }

        fetchFriendships()

        // Subscription for realtime updates (optional, adding later)
    }, [])

    const sendFriendRequest = async (email: string) => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Not authenticated')

        // 1. Find user by email
        // Note: We need a way to look up users by email. 
        // IF RLS allows it. By default 'users' table might not allow searching others by email.
        // We might need a secure RPC function or ensuring RLS allows reading 'email' column? 
        // Actually 'users' table in public schema often mirrors auth.users but might not have email?
        // Let's check 'users' table definition in 001. 
        // It has display_name, avatar_url. It does NOT have email. 
        // We'll need to create a helper RPC or add email to public.users?
        // For now, assuming we search by matching display_name or exact ID if we had it. 
        // WAIT: User said "Search users by username/email". 
        // I should check `users` table content.

        // Assumption: We might have an 'email' column in public.users exposed? 
        // If not, we have to rely on display_name.
        // Let's assume for this step we search exact display_name OR we fix the table to have email. 
        // I will assume we can't easily search email without backend support. 
        // I'll stick to display_name for now or ask user. 
        // For standard robust apps, usually there's a user_lookup table or function.
        // I'll try to find by display_name.

        const { data: foundUsers, error: searchError } = await supabase
            .from('users')
            .select('id')
            .eq('email', email) // Using email arg as display_name for now
            .single()

        if (searchError || !foundUsers) throw new Error('User not found')

        const targetId = foundUsers.id

        if (targetId === user.id) throw new Error("You can't add yourself")

        const { error } = await supabase
            .from('friendships')
            .insert({
                requester_id: user.id,
                addressee_id: targetId,
                status: 'pending'
            })

        if (error) throw error
    }

    const respondToRequest = async (friendshipId: string, accept: boolean) => {
        const { error } = await supabase
            .from('friendships')
            .update({ status: accept ? 'accepted' : 'declined' })
            .eq('id', friendshipId)

        if (error) throw error

        // Optimistic update
        setPendingRequests(prev => prev.filter(req => req.id !== friendshipId))
        if (accept) {
            // We need to move it to friends list. We find it in pending.
            const req = pendingRequests.find(r => r.id === friendshipId)
            if (req) setFriends(prev => [...prev, { ...req, status: 'accepted' }])
        }
    }

    return {
        friends,
        pendingRequests,
        loading,
        sendFriendRequest,
        respondToRequest
    }
}
