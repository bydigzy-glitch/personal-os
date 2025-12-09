#!/bin/bash

echo "🚀 Personal OS - GitHub Repository Setup"
echo "=========================================="
echo ""

# Check if we already have a remote
if git remote get-url origin &> /dev/null; then
    echo "⚠️  Git remote 'origin' already exists"
    echo "Current remote: $(git remote get-url origin)"
    echo ""
    read -p "Do you want to update it? (y/n): " UPDATE
    if [ "$UPDATE" != "y" ]; then
        echo "Skipping remote setup"
        exit 0
    fi
fi

echo "Please create a new GitHub repository:"
echo ""
echo "1. Go to: https://github.com/new"
echo "2. Repository name: personal-os"
echo "3. Description: Your Personal Operating System"
echo "4. Make it Public or Private (your choice)"
echo "5. DO NOT initialize with README, .gitignore, or license"
echo "6. Click 'Create repository'"
echo ""
read -p "Press Enter when you've created the repository..."

echo ""
read -p "Enter your GitHub username: " GITHUB_USER

# Set up remote
REPO_URL="https://github.com/$GITHUB_USER/personal-os.git"
echo ""
echo "Setting up remote: $REPO_URL"

if git remote get-url origin &> /dev/null; then
    git remote set-url origin $REPO_URL
else
    git remote add origin $REPO_URL
fi

echo ""
echo "Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "🔗 Repository: https://github.com/$GITHUB_USER/personal-os"
    echo ""
    echo "Next: Deploy to Vercel"
    echo "Run: ./deploy-vercel.sh"
else
    echo ""
    echo "❌ Push failed. Please check your GitHub credentials."
    echo "You may need to authenticate with: gh auth login"
fi
