@echo off
title Durga Puja Parikrama Bengal - Live Server
color 0E

echo ======================================================================
echo   DURGA PUJA PARIKRAMA BENGAL - REAL TIME LOCAL SERVER
echo ======================================================================
echo.
echo [1/2] Launching browser at http://localhost:3000 ...
start http://localhost:3000
echo.
echo [2/2] Starting local Python web server on port 3000...
echo (Press Ctrl + C in this window to stop the server anytime)
echo.
python -m http.server 3000
if %errorlevel% neq 0 (
    echo.
    echo Python server stopped or not found.
    pause
)
