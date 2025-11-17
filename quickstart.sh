#!/bin/bash
# Quick Start Script for London House Price Predictor

echo "🏠 London House Price Predictor - Quick Start"
echo "=============================================="
echo ""

# Check Python installation
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "✓ Python detected: $(python3 --version)"
echo ""

# Create virtual environment
echo "📦 Setting up virtual environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "✓ Virtual environment created"
else
    echo "✓ Virtual environment already exists"
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📚 Installing dependencies..."
pip install -q -r requirements.txt
echo "✓ Dependencies installed"

echo ""
echo "=============================================="
echo "🎉 Setup complete!"
echo ""
echo "To start the application, run:"
echo "  python app.py"
echo ""
echo "Then visit: http://localhost:5000"
echo ""
echo "Pages available:"
echo "  • Home        - http://localhost:5000/"
echo "  • Predict     - http://localhost:5000/predict"
echo "  • Recent      - http://localhost:5000/recent"
echo "  • About       - http://localhost:5000/about"
echo "  • Contact     - http://localhost:5000/contact"
echo ""
