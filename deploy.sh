#!/bin/bash

# Personal OS - Manual Deployment Guide
# This script helps you deploy to GitHub and Vercel

echo "🚀 Personal OS Deployment Helper"
echo "=================================="
echo ""

# Step 1: GitHub Repository
echo "📦 Step 1: Create GitHub Repository"
echo ""
echo "Please go to: https://github.com/new"
echo ""
echo "Fill in:"
echo "  - Repository name: personal-os"
echo "  - Description: Your Personal Operating System - Built with Next.js, TypeScript, and Supabase"
echo "  - Visibility: Public (or Private if you prefer)"
echo "  - DO NOT initialize with README, .gitignore, or license"
echo ""
read -p "Press Enter when you've created the repository..."

# Step 2: Get repository URL
echo ""
read -p "Enter your GitHub username: " GITHUB_USERNAME
REPO_URL="https://github.com/$GITHUB_USERNAME/personal-os.git"

echo ""
echo "Setting up remote..."
git remote add origin $REPO_URL 2>/dev/null || git remote set-url origin $REPO_URL

echo "Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Code pushed to GitHub!"
echo "🔗 Repository: https://github.com/$GITHUB_USERNAME/personal-os"
echo ""

# Step 3: Vercel Deployment
echo "📦 Step 2: Deploy to Vercel"
echo ""
echo "Please go to: https://vercel.com/new"
echo ""
echo "Steps:"
echo "  1. Click 'Import Git Repository'"
echo "  2. Select your 'personal-os' repository"
echo "  3. Click 'Import'"
echo "  4. Add these environment variables:"
echo "     - NEXT_PUBLIC_SUPABASE_URL"
echo "     - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "     - SUPABASE_SERVICE_ROLE_KEY"
echo "  5. Click 'Deploy'"
echo ""
echo "Wait for deployment to complete (2-3 minutes)"
echo ""
read -p "Press Enter when deployment is complete..."

echo ""
echo "🎉 Deployment Complete!"
echo ""
echo "Your Personal OS is now live!"
echo ""
echo "Next steps:"
echo "  1. Copy your Vercel URL (e.g., https://personal-os.vercel.app)"
echo "  2. Go to Supabase → Authentication → URL Configuration"
echo "  3. Add your Vercel URL to 'Redirect URLs'"
echo "  4. Test your app!"
echo ""
