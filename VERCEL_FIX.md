# Vercel Deployment Fix

## The Error
```
Error: Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.
```

## The Solution

### Step 1: Go to Vercel Project Settings
1. Open: https://vercel.com/bydigzy-glitch/personal-os/settings/environment-variables
2. Or navigate: Vercel Dashboard → personal-os → Settings → Environment Variables

### Step 2: Add Environment Variables

Click "Add New" for each variable:

**Variable 1:**
- Key: `NEXT_PUBLIC_SUPABASE_URL`
- Value: `https://njswmuhfcfqgeydzuose.supabase.co`
- Environment: Production, Preview, Development (select all)

**Variable 2:**
- Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qc3dtdWhmY2ZxZ2V5ZHp1b3NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzMDIxODksImV4cCI6MjA4MDg3ODE4OX0._JEITM-a4Fi_duHtPTh3p7YSCHiuasQzBZ1zAiEDC-c`
- Environment: Production, Preview, Development (select all)

**Variable 3:**
- Key: `SUPABASE_SERVICE_ROLE_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qc3dtdWhmY2ZxZ2V5ZHp1b3NlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTMwMjE4OSwiZXhwIjoyMDgwODc4MTg5fQ._fqt4B9zbhJ9FD81LFe0tA41lAD5ZiCdlj3KPh10JsI`
- Environment: Production, Preview, Development (select all)

### Step 3: Redeploy
1. Go to: Deployments tab
2. Find the latest deployment
3. Click the "..." menu
4. Click "Redeploy"

### Step 4: Wait
- Deployment takes 2-3 minutes
- You'll get a URL like: https://personal-os-xxx.vercel.app

## Quick Links
- Project: https://vercel.com/bydigzy-glitch/personal-os
- Settings: https://vercel.com/bydigzy-glitch/personal-os/settings/environment-variables
- Deployments: https://vercel.com/bydigzy-glitch/personal-os/deployments
