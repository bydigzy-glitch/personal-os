# FreelancerOS - Creative Suite for Freelancers

A production-ready SaaS application built with Next.js, TypeScript, Tailwind CSS v4, shadcn/ui, and Supabase. This is a complete rebuild of the reference app with full backend functionality.

## 📚 Quick Links

- **[Setup Guide](SETUP_GUIDE.md)** - Step-by-step setup instructions
- **[Documentation](DOCUMENTATION.md)** - Technical documentation
- **[Project Summary](PROJECT_SUMMARY.md)** - Project completion summary
- **[File Structure](FILE_STRUCTURE.md)** - Visual file structure
- **[GitHub Setup Script](scripts/setup-github.sh)** - Automated GitHub setup
- **[Quick Start Script](scripts/quick-start.sh)** - Quick local development setup


## 🚀 Features

- **Authentication**: Email/password and Google OAuth via Supabase Auth
- **Projects Management**: Create, read, update, and delete projects with progress tracking
- **File Management**: Upload and manage files with Supabase Storage
- **Apps Directory**: Organize and categorize your creative applications
- **User Profiles**: Customizable user profiles with avatars
- **Row Level Security**: All data is protected with Supabase RLS policies
- **Responsive Design**: Beautiful UI that works on desktop, tablet, and mobile
- **Real-time Updates**: Automatic data refresh after mutations

## 📋 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Backend**: Supabase (Postgres, Auth, Storage, RLS)
- **Deployment**: Vercel-ready

## 🛠️ Prerequisites

- Node.js 18+ and npm
- A Supabase account ([sign up here](https://supabase.com))
- Git
- A Vercel account (for deployment)
- A GitHub account (for repository and CI/CD)

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/freelancer-os.git
cd freelancer-os
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

#### Create a New Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be provisioned
3. Go to Project Settings > API to get your credentials

#### Run Database Migrations

1. Go to the SQL Editor in your Supabase dashboard
2. Copy the contents of `supabase/migrations/001_initial_schema.sql`
3. Paste and run the SQL in the editor
4. This will create all tables, RLS policies, triggers, and storage buckets

#### Configure Storage

1. Go to Storage in your Supabase dashboard
2. Verify that the `user-files` bucket was created
3. The storage policies are already set up via the migration

#### Enable Google OAuth (Optional)

1. Go to Authentication > Providers in Supabase
2. Enable Google provider
3. Add your Google OAuth credentials
4. Add `http://localhost:3000/auth/callback` to authorized redirect URIs for local development

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Update the values in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Get these values from your Supabase project settings.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗂️ Project Structure

```
freelancer-os/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── auth/                 # Authentication pages
│   │   │   ├── sign-in/
│   │   │   ├── sign-up/
│   │   │   └── callback/
│   │   ├── projects/             # Projects pages
│   │   │   ├── [id]/            # Project detail page
│   │   │   └── page.tsx
│   │   ├── files/                # Files page
│   │   ├── apps/                 # Apps page
│   │   ├── settings/             # Settings page
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Dashboard
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── dashboard/            # Dashboard-specific components
│   │   ├── projects/             # Project components
│   │   ├── files/                # File components
│   │   ├── apps/                 # App components
│   │   └── settings/             # Settings components
│   ├── lib/
│   │   ├── supabase/             # Supabase client configuration
│   │   │   ├── client.ts         # Browser client
│   │   │   ├── server.ts         # Server client
│   │   │   └── database.types.ts # TypeScript types
│   │   └── utils.ts              # Utility functions
│   └── middleware.ts             # Auth middleware
├── supabase/
│   └── migrations/               # Database migrations
│       └── 001_initial_schema.sql
├── .env.example                  # Environment variables template
└── package.json
```

## 🗄️ Database Schema

### Tables

- **users**: User profiles (extends auth.users)
- **projects**: User projects with status and progress tracking
- **files**: File metadata with Supabase Storage paths
- **apps**: User's creative applications

### Row Level Security

All tables have RLS enabled with policies ensuring users can only access their own data.

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL` (your production URL)
4. Deploy!

### Update OAuth Callback URL

After deployment, add your production URL to:
- Supabase Auth settings (Redirect URLs)
- Google OAuth settings (if using Google sign-in)

## 🔄 GitHub Actions CI/CD

The project includes a GitHub Actions workflow that:
- Runs on every push to `main`
- Installs dependencies
- Builds the project
- Runs tests (when added)
- Deploys to Vercel

### Setting Up GitHub Secrets

Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `VERCEL_TOKEN` (get from Vercel account settings)
- `VERCEL_ORG_ID` (from Vercel project settings)
- `VERCEL_PROJECT_ID` (from Vercel project settings)

## 🌿 Branching Strategy

- `main`: Production branch (auto-deploys to Vercel)
- `feature/*`: Feature branches (create PR to merge to main)

### Creating a Feature Branch

```bash
git checkout -b feature/your-feature-name
# Make changes
git add .
git commit -m "Add your feature"
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 📝 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint

## 🎨 Customization

### Updating Colors

Edit `src/app/globals.css` to customize the color scheme using CSS variables.

### Adding New Components

Use shadcn/ui CLI to add components:

```bash
npx shadcn@latest add [component-name]
```

## 🔐 Security Notes

- Never commit `.env.local` or expose your service role key
- All API routes and server actions validate user authentication
- RLS policies ensure data isolation between users
- File uploads are scoped to user directories in storage

## 🐛 Troubleshooting

### Database Connection Issues

- Verify your Supabase URL and keys in `.env.local`
- Check that the migration ran successfully
- Ensure RLS policies are enabled

### Authentication Issues

- Check that the callback URL is correctly configured
- Verify OAuth provider settings in Supabase
- Clear browser cookies and try again

### Build Errors

- Delete `.next` folder and `node_modules`
- Run `npm install` again
- Check for TypeScript errors with `npm run build`

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues and questions:
- Open a GitHub issue
- Check the Supabase documentation
- Review Next.js documentation

---

Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Supabase
