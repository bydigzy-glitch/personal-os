#!/bin/bash

# FreelancerOS GitHub Setup Script
# This script helps you create and configure the GitHub repository

set -e

echo "🚀 FreelancerOS GitHub Setup"
echo "=============================="
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo ""
    echo "Please install it first:"
    echo "  macOS: brew install gh"
    echo "  Or visit: https://cli.github.com/"
    echo ""
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo "🔐 You need to authenticate with GitHub first."
    echo "Run: gh auth login"
    echo ""
    exit 1
fi

echo "✅ GitHub CLI is installed and authenticated"
echo ""

# Create the repository
echo "📦 Creating GitHub repository: freelancer-os"
gh repo create freelancer-os \
    --public \
    --description "Production-ready SaaS for freelancers - Built with Next.js, TypeScript, Tailwind CSS, and Supabase" \
    --source=. \
    --remote=origin

echo ""
echo "✅ Repository created successfully!"
echo ""

# Add all files
echo "📝 Staging files..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: FreelancerOS - Production-ready SaaS application

- Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS v4 for styling
- shadcn/ui components
- Supabase backend (Auth, Database, Storage)
- Row Level Security policies
- Complete CRUD operations
- GitHub Actions CI/CD
- Vercel deployment ready"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Code pushed to GitHub successfully!"
echo ""
echo "🔗 Repository URL: https://github.com/$(gh repo view --json owner,name -q '.owner.login + "/" + .name')"
echo ""
echo "Next steps:"
echo "1. Set up Supabase project and run migrations"
echo "2. Configure GitHub Secrets for CI/CD"
echo "3. Deploy to Vercel"
echo ""
echo "See README.md for detailed instructions."
