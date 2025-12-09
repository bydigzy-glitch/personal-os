# 🚀 Getting Started with FreelancerOS

Welcome! This guide will help you get FreelancerOS up and running in the fastest way possible.

## ⚡ Quick Start (5 minutes)

### Step 1: Install GitHub CLI (if not already installed)

```bash
brew install gh
```

### Step 2: Authenticate with GitHub

```bash
gh auth login
```

Follow the prompts to authenticate.

### Step 3: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in:
   - Name: `FreelancerOS`
   - Database Password: (choose a strong password)
   - Region: (closest to you)
4. Click "Create new project"
5. Wait 2-3 minutes

### Step 4: Run Database Migration

1. In Supabase, go to **SQL Editor**
2. Click "New query"
3. Copy all contents from `supabase/migrations/001_initial_schema.sql`
4. Paste and click "Run"
5. You should see "Success. No rows returned"

### Step 5: Get Supabase Credentials

1. In Supabase, go to **Settings** → **API**
2. Copy these values:
   - Project URL
   - anon public key
   - service_role key (keep secret!)

### Step 6: Update Environment Variables

Edit `.env.local` and replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 7: Start Development Server

```bash
./scripts/quick-start.sh
```

Or manually:

```bash
npm install
npm run dev
```

### Step 8: Open the App

Visit [http://localhost:3000](http://localhost:3000)

Click "Sign up" to create an account!

## 🎯 Next Steps

### Deploy to Production

1. **Create GitHub Repository**
   ```bash
   ./scripts/setup-github.sh
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

3. **Set up CI/CD**
   - Add GitHub Secrets (see [SETUP_GUIDE.md](SETUP_GUIDE.md))
   - Push to main to trigger deployment

### Customize the App

- Update branding in `src/components/dashboard/dashboard-layout.tsx`
- Modify colors in `src/app/globals.css`
- Add your logo to `public/`
- Customize the dashboard layout

## 📖 Documentation

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed setup instructions
- **[DOCUMENTATION.md](DOCUMENTATION.md)** - Technical documentation
- **[README.md](README.md)** - Main README with all features

## 🆘 Common Issues

### "Cannot find module './database.types'"

This is a TypeScript warning that can be ignored. The types are correctly defined.

### Build fails with Supabase error

Make sure you've updated `.env.local` with real Supabase credentials.

### Authentication not working

1. Check that the migration ran successfully
2. Verify your Supabase URL and keys
3. Clear browser cookies and try again

## 💡 Tips

- Use the **Projects** page to create and track projects
- Upload files in the **Files** page (they're stored in Supabase Storage)
- Add your favorite apps in the **Apps** page
- Update your profile in **Settings**

## 🎉 You're Ready!

You now have a fully functional SaaS application running locally. Explore the features, customize the design, and deploy to production when you're ready!

---

**Need help?** Check the [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions or open an issue on GitHub.
