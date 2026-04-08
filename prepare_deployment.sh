#!/bin/bash

echo "============================================="
echo "   Sentira Wellness Deployment Preparation   "
echo "============================================="
echo ""
echo "This script will help you prepare your environment files for deployment."
echo ""

read -p "Enter your live Backend API URL (e.g., https://your-backend.onrender.com): " BACKEND_URL
if [[ -z "$BACKEND_URL" ]]; then
  echo "Backend URL cannot be empty. Exiting."
  exit 1
fi

FRONTEND_ENV_FILE="./sentira-wellness-ui-main/.env.production"

echo "Creating/Updating $FRONTEND_ENV_FILE..."
echo "NEXT_PUBLIC_API_URL=$BACKEND_URL" > $FRONTEND_ENV_FILE

# Copying over stripe keys from local env to production env
if [ -f "./sentira-wellness-ui-main/.env.local" ]; then
    grep "STRIPE_PRICE_ID" "./sentira-wellness-ui-main/.env.local" >> $FRONTEND_ENV_FILE
fi

echo "Frontend environment file updated for production!"
echo ""

echo "============================================="
echo "                 NEXT STEPS                  "
echo "============================================="
echo "1. FRONTEND: When deploying to Vercel, it will automatically use the variables in .env.production"
echo "2. BACKEND: Make sure to add the following Environment Variables in your Render/Railway dashboard:"
echo "   - MONGO_URI (Your MongoDB Atlas Connection String)"
echo "   - JWT_SECRET (Your secret key for tokens)"
echo "   - All other variables from your backend/.env file"
echo ""
echo "You are ready to commit these changes and deploy!"
echo "Run: git add . && git commit -m 'chore: prepare files for deployment' && git push"
