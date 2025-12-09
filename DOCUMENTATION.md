# FreelancerOS - Project Documentation

## Overview

FreelancerOS is a production-ready SaaS application designed for freelancers and creative professionals to manage their projects, files, and applications in one unified workspace.

## Architecture

### Frontend

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: React Server Components + Client Components
- **Routing**: File-based routing with Next.js App Router

### Backend

- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth (Email/Password + OAuth)
- **Storage**: Supabase Storage
- **Security**: Row Level Security (RLS) policies
- **API**: Next.js Server Actions + API Routes

### Infrastructure

- **Hosting**: Vercel
- **CI/CD**: GitHub Actions
- **Version Control**: Git + GitHub
- **Environment**: Node.js 18+

## Database Schema

### Tables

#### users
Extends Supabase auth.users with additional profile information.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, references auth.users |
| display_name | TEXT | User's display name |
| avatar_url | TEXT | URL to user's avatar image |
| created_at | TIMESTAMPTZ | Account creation timestamp |

#### projects
Stores user projects with progress tracking.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to users |
| title | TEXT | Project title |
| description | TEXT | Project description |
| status | ENUM | active, paused, or completed |
| progress | INTEGER | Progress percentage (0-100) |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

#### files
Stores file metadata with references to Supabase Storage.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to users |
| project_id | UUID | Optional foreign key to projects |
| name | TEXT | File name |
| type | TEXT | MIME type |
| supabase_path | TEXT | Path in Supabase Storage |
| created_at | TIMESTAMPTZ | Upload timestamp |

#### apps
Stores user's creative applications.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to users |
| name | TEXT | App name |
| category | TEXT | App category |
| description | TEXT | App description |
| icon | TEXT | Icon emoji or URL |
| created_at | TIMESTAMPTZ | Creation timestamp |

### Row Level Security

All tables have RLS enabled with policies ensuring:
- Users can only read their own data
- Users can only modify their own data
- No cross-user data access
- Storage files are scoped to user directories

## Application Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── auth/                     # Authentication pages
│   │   ├── sign-in/             # Sign-in page
│   │   ├── sign-up/             # Sign-up page
│   │   └── callback/            # OAuth callback handler
│   ├── projects/                 # Projects pages
│   │   ├── [id]/                # Project detail page
│   │   └── page.tsx             # Projects list
│   ├── files/                    # Files management
│   ├── apps/                     # Apps directory
│   ├── settings/                 # User settings
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Dashboard
│   └── not-found.tsx             # 404 page
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── dashboard/                # Dashboard components
│   │   ├── dashboard-layout.tsx  # Main layout with sidebar
│   │   ├── project-card.tsx      # Project card component
│   │   ├── file-card.tsx         # File card component
│   │   └── app-card.tsx          # App card component
│   ├── projects/                 # Project-specific components
│   ├── files/                    # File-specific components
│   ├── apps/                     # App-specific components
│   └── settings/                 # Settings components
├── lib/
│   ├── supabase/                 # Supabase configuration
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   └── database.types.ts     # TypeScript types
│   └── utils.ts                  # Utility functions
└── middleware.ts                 # Auth middleware
```

## Key Features

### Authentication
- Email/password authentication
- Google OAuth (configurable)
- Protected routes via middleware
- Automatic session management
- Secure cookie handling

### Projects Management
- Create, read, update, delete projects
- Progress tracking (0-100%)
- Status management (active, paused, completed)
- Project detail pages
- Associated files view

### File Management
- Upload files to Supabase Storage
- File type detection and icons
- Project association
- Secure file access via RLS
- Download functionality

### Apps Directory
- Add and manage creative apps
- Category organization
- Custom icons (emoji support)
- App descriptions

### User Settings
- Update display name
- View account information
- Profile management

## Security Considerations

### Authentication
- Passwords hashed by Supabase Auth
- Secure session management
- CSRF protection via Next.js
- HTTP-only cookies

### Authorization
- Row Level Security on all tables
- User-scoped queries
- Service role key kept server-side only
- No client-side access to sensitive data

### Data Protection
- Environment variables for secrets
- No hardcoded credentials
- Secure file storage
- User data isolation

## Performance Optimizations

### Server Components
- Data fetching on the server
- Reduced client-side JavaScript
- Faster initial page loads
- Better SEO

### Caching
- Next.js automatic caching
- Revalidation on mutations
- Optimistic UI updates

### Code Splitting
- Automatic route-based splitting
- Dynamic imports for heavy components
- Lazy loading where appropriate

## Development Workflow

### Local Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run ESLint
```

### Git Workflow
1. Create feature branch: `git checkout -b feature/name`
2. Make changes and commit
3. Push to GitHub: `git push origin feature/name`
4. Create Pull Request
5. Merge to main after review

### Deployment
- Push to `main` triggers GitHub Actions
- Automated build and tests
- Automatic deployment to Vercel
- Environment variables from GitHub Secrets

## Testing Strategy

### Manual Testing
- Test all CRUD operations
- Verify authentication flows
- Check file uploads
- Test responsive design

### Future Automated Testing
- Unit tests with Jest
- Integration tests with React Testing Library
- E2E tests with Playwright
- API tests for server actions

## Monitoring and Logging

### Vercel Analytics
- Page views and performance
- Web Vitals tracking
- Error monitoring

### Supabase Logs
- Database query logs
- Auth event logs
- Storage access logs

## Future Enhancements

### Planned Features
- [ ] Team collaboration
- [ ] Project templates
- [ ] Advanced file preview
- [ ] Comments and notes
- [ ] Activity timeline
- [ ] Email notifications
- [ ] Dark mode
- [ ] Mobile app
- [ ] API for third-party integrations
- [ ] Advanced analytics

### Technical Improvements
- [ ] Add comprehensive test suite
- [ ] Implement caching strategies
- [ ] Add error boundaries
- [ ] Implement rate limiting
- [ ] Add request logging
- [ ] Set up monitoring alerts
- [ ] Optimize bundle size
- [ ] Add performance monitoring

## Contributing

### Code Style
- Follow TypeScript best practices
- Use ESLint configuration
- Format with Prettier (if configured)
- Write meaningful commit messages

### Pull Request Process
1. Update documentation if needed
2. Add tests for new features
3. Ensure build passes
4. Request review from maintainers
5. Address review feedback

## License

MIT License - See LICENSE file for details

## Support

- GitHub Issues for bugs
- Discussions for questions
- Documentation in README.md and SETUP_GUIDE.md

---

Last Updated: December 2024
Version: 1.0.0
