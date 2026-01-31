#!/bin/bash

# Init script for Finarena Next.js deployment
# This script checks if all required environment variables are set

echo "🔍 Checking environment variables..."

REQUIRED_VARS=(
    "GHOST_URL"
    "GHOST_CONTENT_API_KEY"
    "NEXT_PUBLIC_SITE_URL"
    "NEXT_PUBLIC_SITE_NAME"
)

MISSING_VARS=()

for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        MISSING_VARS+=($var)
    fi
done

if [ ${#MISSING_VARS[@]} -eq 0 ]; then
    echo "✅ All required environment variables are set!"
    echo ""
    echo "Configuration:"
    echo "  GHOST_URL: ${GHOST_URL}"
    echo "  NEXT_PUBLIC_SITE_URL: ${NEXT_PUBLIC_SITE_URL}"
    echo "  NEXT_PUBLIC_SITE_NAME: ${NEXT_PUBLIC_SITE_NAME}"
    exit 0
else
    echo "❌ Missing required environment variables:"
    for var in "${MISSING_VARS[@]}"; do
        echo "  - $var"
    done
    echo ""
    echo "Please set these variables in Coolify UI:"
    echo "  1. Go to your resource in Coolify"
    echo "  2. Click 'Environment Variables'"
    echo "  3. Add the missing variables"
    exit 1
fi
