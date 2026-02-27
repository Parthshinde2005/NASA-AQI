import requests
import time
import sys

def check_backend():
    """Check if backend is running"""
    try:
        response = requests.get("http://localhost:5000/api/forecast?city=London", timeout=10)
        return response.status_code == 200
    except:
        return False

def check_frontend():
    """Check if frontend is running"""
    try:
        response = requests.get("http://localhost:3000", timeout=5)
        return response.status_code == 200
    except:
        return False

def main():
    print("🔍 AirAware Health Check")
    print("=" * 30)
    
    print("Checking backend (http://localhost:5000)...")
    if check_backend():
        print("✅ Backend is running and responding")
    else:
        print("❌ Backend is not responding")
        print("   Make sure to run: python backend/app.py")
    
    print("\nChecking frontend (http://localhost:3000)...")
    if check_frontend():
        print("✅ Frontend is running and responding")
    else:
        print("❌ Frontend is not responding")
        print("   Make sure to run: npm start in frontend directory")
    
    print("\n🌐 If both are running, open: http://localhost:3000")

if __name__ == "__main__":
    main()