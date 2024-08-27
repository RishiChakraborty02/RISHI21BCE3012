#!/bin/bash

echo "Starting Everything"

cd backend && npm install && npm run dev &
cd .. && echo pwd && cd frontend && npm install && npm run dev

echo "Everything is running"


