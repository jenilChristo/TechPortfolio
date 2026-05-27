#!/bin/bash
echo "Installing Node.js dependencies..."
npm install --production
echo "Starting Node.js server..."
node server.js
