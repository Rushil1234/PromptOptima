#!/bin/bash

# Dual-Strategy Optimizer - Startup Script
# This script helps you start the application and troubleshoot issues

echo "🚀 Dual-Strategy Optimizer - Startup Script"
echo "=============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "   Please install Node.js from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if port 3000 is already in use
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Port 3000 is already in use!"
    echo ""
    echo "Options:"
    echo "  1. Kill the existing process: kill -9 \$(lsof -ti:3000)"
    echo "  2. Use a different port: PORT=3001 npm start"
    echo ""
    read -p "Kill existing process and continue? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Killing process on port 3000..."
        kill -9 $(lsof -ti:3000) 2>/dev/null
        sleep 2
    else
        echo "Exiting..."
        exit 1
    fi
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
fi

echo "🎯 Starting the Dual-Strategy Optimizer..."
echo ""
echo "=============================================="
echo "Server will start on: http://localhost:3000"
echo "API endpoint: http://localhost:3000/api"
echo "=============================================="
echo ""
echo "📝 Quick Links:"
echo "   • Web Interface: http://localhost:3000"
echo "   • API Test Page: http://localhost:3000/test.html"
echo "   • Health Check: http://localhost:3000/api/health"
echo ""
echo "🧪 Run tests in another terminal:"
echo "   • node demo.js"
echo "   • curl http://localhost:3000/api/health"
echo ""
echo "⏹️  To stop: Press Ctrl+C"
echo ""
echo "=============================================="
echo ""

# Start the server
npm start
