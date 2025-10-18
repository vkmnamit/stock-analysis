#!/bin/bash

# Quick Start Script for Stock Analysis App
# Run this from the stock_analysis root directory

echo "🚀 Starting Stock Analysis Application..."
echo ""

# Check if we're in the right directory
if [ ! -d "my-express-app" ] || [ ! -d "my_app" ]; then
    echo "❌ Error: Please run this script from the stock_analysis root directory"
    exit 1
fi

# Start backend on port 5001
echo "📡 Starting backend API server on port 5001..."
cd my-express-app
PORT=5001 node server.js &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🎨 Starting frontend dev server..."
cd my_app
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Both servers started successfully!"
echo ""
echo "📊 Backend API:  http://localhost:5001"
echo "🖥️  Frontend App: http://localhost:5173"
echo ""
echo "📖 See TESTING_GUIDE.md for full testing instructions"
echo ""
echo "🛑 To stop both servers, press Ctrl+C"
echo ""

# Wait for user interrupt
wait
