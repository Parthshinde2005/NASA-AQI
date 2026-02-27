#!/usr/bin/env python3
"""
Complete test suite for AirAware Dashboard
Tests backend API, frontend build, and integration
"""
import subprocess
import sys
import os
import time
import requests
import json

def run_command(cmd, cwd=None):
    """Run a command and return success status"""
    try:
        result = subprocess.run(cmd, shell=True, cwd=cwd, capture_output=True, text=True)
        return result.returncode == 0, result.stdout, result.stderr
    except Exception as e:
        return False, "", str(e)

def test_backend_api():
    """Test backend API endpoints"""
    print("🧪 Testing Backend API...")
    
    # Import and test directly
    sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
    try:
        from app import app
        
        with app.test_client() as client:
            # Test health check
            response = client.get('/')
            if response.status_code == 200:
                print("✅ Health check endpoint working")
            else:
                print("❌ Health check failed")
                return False
            
            # Test forecast endpoint
            response = client.get('/api/forecast?city=London,UK')
            if response.status_code == 200:
                data = response.get_json()
                if data.get('current_aqi') and data.get('forecast'):
                    print(f"✅ Forecast API working - AQI: {data['current_aqi']['value']}")
                else:
                    print("❌ Forecast API missing data")
                    return False
            else:
                print("❌ Forecast API failed")
                return False
            
            # Test weather endpoint
            response = client.get('/api/weather?city=London,UK')
            if response.status_code == 200:
                data = response.get_json()
                if 'temperature' in data:
                    print(f"✅ Weather API working - Temp: {data['temperature']}°C")
                else:
                    print("❌ Weather API missing data")
                    return False
            else:
                print("❌ Weather API failed")
                return False
        
        return True
    except Exception as e:
        print(f"❌ Backend test error: {str(e)}")
        return False

def test_frontend_build():
    """Test frontend build process"""
    print("\n🏗️ Testing Frontend Build...")
    
    frontend_path = os.path.join(os.path.dirname(__file__), 'frontend')
    
    # Check if node_modules exists
    if not os.path.exists(os.path.join(frontend_path, 'node_modules')):
        print("📦 Installing frontend dependencies...")
        success, stdout, stderr = run_command("npm install", cwd=frontend_path)
        if not success:
            print(f"❌ npm install failed: {stderr}")
            return False
        print("✅ Dependencies installed")
    
    # Test build
    print("🔨 Building frontend...")
    success, stdout, stderr = run_command("npm run build", cwd=frontend_path)
    if success:
        print("✅ Frontend build successful")
        return True
    else:
        print(f"❌ Frontend build failed: {stderr}")
        return False

def test_integration():
    """Test full integration"""
    print("\n🔗 Testing Integration...")
    
    # Check if both services can start (simulation)
    backend_path = os.path.join(os.path.dirname(__file__), 'backend')
    
    # Check backend dependencies
    success, stdout, stderr = run_command("pip list | findstr Flask", cwd=backend_path)
    if success:
        print("✅ Backend dependencies available")
    else:
        print("❌ Backend dependencies missing")
        return False
    
    # Check frontend build exists
    frontend_build = os.path.join(os.path.dirname(__file__), 'frontend', 'build')
    if os.path.exists(frontend_build):
        print("✅ Frontend build ready")
    else:
        print("❌ Frontend build missing")
        return False
    
    return True

def main():
    """Run complete test suite"""
    print("🚀 AirAware Dashboard - Complete Test Suite")
    print("=" * 60)
    
    tests_passed = 0
    total_tests = 3
    
    # Test backend
    if test_backend_api():
        tests_passed += 1
    
    # Test frontend
    if test_frontend_build():
        tests_passed += 1
    
    # Test integration
    if test_integration():
        tests_passed += 1
    
    print(f"\n📊 Test Results: {tests_passed}/{total_tests} tests passed")
    
    if tests_passed == total_tests:
        print("\n🎉 All tests passed! Your AirAware Dashboard is ready to run!")
        print("\n🚀 To start the application:")
        print("   Option 1: Double-click 'start_application.bat'")
        print("   Option 2: Run backend and frontend manually")
        print("\n🌐 Access: http://localhost:3000")
        return True
    else:
        print("\n❌ Some tests failed. Please check the errors above.")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)