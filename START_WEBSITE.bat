@echo off
title NIVARA NATURALS - Development Server
cd /d "%~dp0"
set "PATH=C:\Users\garvi\AppData\Local\Programs\node-portable\node-v20.18.0-win-x64;%PATH%"

echo ========================================================
echo   NIVARA NATURALS - Luxury Skincare E-Commerce
echo ========================================================
echo.
echo 1. Opening website in your default browser...
start http://localhost:3000

echo.
echo 2. Starting Vite development server...
echo    Local URL: http://localhost:3000
echo.
echo (Keep this window open while browsing the website)
echo.

call npm run dev -- --host
pause
