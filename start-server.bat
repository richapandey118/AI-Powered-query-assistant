@echo off
echo Starting AI Query Bot server...

:: Change to the directory containing the batch file
cd /d "%~dp0"

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js and try again
    pause
    exit /b 1
)

:: Check if server.js exists
if not exist "server.js" (
    echo Error: server.js not found in the current directory
    echo Current directory: %CD%
    pause
    exit /b 1
)

:: Check if npm packages are installed
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

:: Create a temporary file to store output
set "temp_file=%TEMP%\server_output.txt"

:: Start the server and redirect output to both console and file
echo Starting server...
echo Server is starting. Please wait...

:: Start the server in a way that we can capture its output
start /B cmd /c "node server.js > %temp_file% 2>&1 | findstr /V ""^""" 

:: Wait a bit for the server to initialize
timeout /t 3 /nobreak > nul

:: Check if the server started by looking for port info in the output
set found_url=0
set url=http://localhost:5001

:: Read the temp file to find the URL
for /F "tokens=*" %%a in ('type "%temp_file%" ^| findstr "Server running on http"') do (
    set line=%%a
    echo Server output: %%a
    set found_url=1
    for /F "tokens=4" %%u in ("%%a") do set url=%%u
)

:: If URL found, open the browser
if %found_url%==1 (
    echo Found server URL: %url%
    echo Opening browser to %url%
    start "" "%url%"
) else (
    :: If we couldn't find the URL, try to read the file and show what we got
    echo Could not detect server URL. Using default: http://localhost:5001
    start "" "http://localhost:5001"
    
    echo Server output:
    type "%temp_file%"
)

:: Delete the temp file
if exist "%temp_file%" del "%temp_file%"

:: Continue showing server output
echo.
echo Server is now running. Press Ctrl+C to stop.
echo.

:: Now run the server without redirection so we see all logs
node server.js 