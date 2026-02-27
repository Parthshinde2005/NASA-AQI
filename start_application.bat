@echo off
echo ========================================
echo    AirAware - AQI Dashboard Startup
echo ========================================
echo.

echo [1/4] Checking Python installation...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python not found! Please install Python 3.7+ first.
    pause
    exit /b 1
)
echo ✅ Python found

echo.
echo [2/4] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found! Please install Node.js 14+ first.
    pause
    exit /b 1
)
echo ✅ Node.js found

echo.
echo [3/4] Installing backend dependencies...
cd backend
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed

echo.
echo [4/4] Installing frontend dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed

echo.
echo ========================================
echo    Starting AirAware Dashboard
echo ========================================
echo.
echo 🚀 Backend starting on: http://localhost:5000
echo 🌐 Frontend starting on: http://localhost:3000
echo.
echo Starting backend server...
start "AirAware Backend" cmd /k "cd /d %~dp0backend && echo Starting Flask server... && python app.py"

echo Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo Starting frontend server...
start "AirAware Frontend" cmd /k "cd /d %~dp0frontend && echo Starting React server... && npm start"

echo.
echo ✅ Both servers are starting!
echo 📱 Wait 30 seconds, then open: http://localhost:3000
echo.
echo Press any key to exit this window...
pause >nul