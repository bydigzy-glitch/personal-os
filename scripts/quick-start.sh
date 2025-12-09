#!/bin/bash

# FreelancerOS Quick Start Script
# This script helps you get started with local development

set -e

echo "🚀 FreelancerOS Quick Start"
echo "============================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found!"
    echo ""
    echo "Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo ""
    echo "⚠️  Please edit .env.local and add your Supabase credentials"
    echo "   Get them from: https://supabase.com/dashboard/project/_/settings/api"
    echo ""
    echo "Then run this script again."
    exit 1
fi

# Check if Supabase URL is still placeholder
if grep -q "your-supabase-url" .env.local; then
    echo "⚠️  Your .env.local still has placeholder values"
    echo ""
    echo "Please update .env.local with your real Supabase credentials:"
    echo "  1. Go to https://supabase.com/dashboard"
    echo "  2. Select your project"
    echo "  3. Go to Settings → API"
    echo "  4. Copy the URL and keys to .env.local"
    echo ""
    exit 1
fi

echo "✅ Environment variables configured"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "✅ Dependencies installed"
echo ""

# Check if database is set up
echo "⚠️  Make sure you've run the database migration in Supabase!"
echo "   See SETUP_GUIDE.md for instructions"
echo ""

# Start the development server
echo "🚀 Starting development server..."
echo ""
npm run dev
