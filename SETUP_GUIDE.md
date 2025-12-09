# FreelancerOS Setup Guide

This guide will walk you through setting up FreelancerOS from scratch, including Supabase, GitHub, and Vercel deployment.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Supabase Setup](#supabase-setup)
4. [GitHub Repository Setup](#github-repository-setup)
5. [Vercel Deployment](#vercel-deployment)
6. [GitHub Actions CI/CD](#github-actions-cicd)
7. [Testing the Application](#testing-the-application)

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** and npm installed
- **Git** installed
- **GitHub CLI** (`gh`) installed: `brew install gh` (macOS)
- A **Supabase** account ([sign up](https://supabase.com))
- A **Vercel** account ([sign up](https://vercel.com))
- A **GitHub** account

## Local Development Setup

### 1. Navigate to the Project

```bash
cd /Users/digzy/.gemini/antigravity/scratch/freelancer-os
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

The `.env.local` file already exists with placeholder values. You'll update it with real values after setting up Supabase.

## Supabase Setup

### 1. Create a New Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in the details:
   - **Name**: FreelancerOS
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your users
4. Click "Create new project"
5. Wait 2-3 minutes for provisioning

### 2. Get Your API Credentials

1. In your Supabase project, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")
   - **service_role** key (under "Project API keys" - keep this secret!)

### 3. Update Environment Variables

Edit `.env.local` and replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Database Migrations

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste into the SQL editor
5. Click "Run" or press Cmd/Ctrl + Enter
6. You should see "Success. No rows returned"

### 5. Verify Database Setup

1. Go to **Table Editor** in Supabase
2. You should see these tables:
   - `users`
   - `projects`
   - `files`
   - `apps`

3. Go to **Storage** in Supabase
4. You should see a bucket named `user-files`

### 6. Enable Google OAuth (Optional)

1. Go to **Authentication** → **Providers**
2. Find "Google" and click to expand
3. Toggle "Enable Sign in with Google"
4. Add your Google OAuth credentials:
   - Get credentials from [Google Cloud Console](https://console.cloud.google.com)
   - Create OAuth 2.0 Client ID
   - Add authorized redirect URI: `https://your-project-id.supabase.co/auth/v1/callback`
5. Save the configuration

## GitHub Repository Setup

### 1. Authenticate GitHub CLI

```bash
gh auth login
```

Follow the prompts to authenticate.

### 2. Run the Setup Script

```bash
./scripts/setup-github.sh
```

This script will:
- Create a new GitHub repository named `freelancer-os`
- Add all files to git
- Create an initial commit
- Push to GitHub

### 3. Verify Repository

Visit your repository at: `https://github.com/YOUR_USERNAME/freelancer-os`

## Vercel Deployment

### 1. Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### 2. Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your `freelancer-os` repository from GitHub
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next

### 3. Add Environment Variables in Vercel

In the Vercel project settings, add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### 4. Deploy

Click "Deploy" and wait for the build to complete.

### 5. Update OAuth Redirect URLs

After deployment, update your Supabase Auth settings:

1. Go to **Authentication** → **URL Configuration** in Supabase
2. Add your Vercel URL to **Redirect URLs**:
   - `https://your-app.vercel.app/auth/callback`
   - `https://your-app.vercel.app/**` (for wildcard support)

If using Google OAuth, also update the authorized redirect URIs in Google Cloud Console.

## GitHub Actions CI/CD

### 1. Get Vercel Credentials

1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Create a new token named "GitHub Actions"
3. Copy the token

4. Get your Vercel project details:
```bash
vercel link
```

This will create a `.vercel` folder. Get the IDs from `.vercel/project.json`:
- `orgId` → VERCEL_ORG_ID
- `projectId` → VERCEL_PROJECT_ID

### 2. Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click "New repository secret" and add:

| Secret Name | Value |
|------------|-------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |
| `VERCEL_TOKEN` | Your Vercel token |
| `VERCEL_ORG_ID` | Your Vercel org ID |
| `VERCEL_PROJECT_ID` | Your Vercel project ID |

### 3. Test the Workflow

1. Make a small change to the code
2. Commit and push:
```bash
git add .
git commit -m "Test CI/CD workflow"
git push
```

3. Go to **Actions** tab in GitHub to see the workflow run
4. The app will automatically deploy to Vercel on success

## Testing the Application

### 1. Start Local Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 2. Create an Account

1. Click "Sign up" on the auth page
2. Enter your details
3. You'll be redirected to the dashboard

### 3. Test Features

- **Projects**: Create, edit, and delete projects
- **Files**: Upload files (they'll be stored in Supabase Storage)
- **Apps**: Add and manage your creative apps
- **Settings**: Update your profile

### 4. Verify Database

1. Go to Supabase **Table Editor**
2. Check that your data appears in the tables
3. Go to **Storage** to see uploaded files

## Troubleshooting

### Build Errors

If you get build errors:

```bash
rm -rf .next node_modules
npm install
npm run build
```

### Authentication Issues

- Verify your Supabase URL and keys in `.env.local`
- Check that redirect URLs are configured correctly
- Clear browser cookies and try again

### Database Connection Issues

- Ensure the migration ran successfully
- Check RLS policies are enabled
- Verify your service role key is correct

### Deployment Issues

- Check Vercel logs for errors
- Ensure all environment variables are set
- Verify the build completes locally first

## Next Steps

- Customize the design and branding
- Add more features (comments, teams, notifications)
- Set up monitoring and analytics
- Configure custom domain in Vercel
- Add tests with Jest and React Testing Library

## Support

- Check the main [README.md](../README.md)
- Review [Next.js documentation](https://nextjs.org/docs)
- Check [Supabase documentation](https://supabase.com/docs)
- Open an issue on GitHub

---

Congratulations! Your FreelancerOS application is now live! 🎉
