#!/bin/bash

# Pawpedia Deployment Script
echo "🚀 Deploying Pawpedia to Netlify..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Build the project
echo "🔨 Building project..."
npm run build

# Deploy to Netlify
echo "📤 Deploying to Netlify..."
netlify deploy --prod --dir=build

echo "✅ Deployment complete!"
echo "🌐 Your app should be live at the URL provided above"