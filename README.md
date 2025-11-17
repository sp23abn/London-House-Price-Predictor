# London House Price Predictor 🏠

A modern Flask web application for predicting London house prices using machine learning. This application features a clean, responsive UI with comprehensive prediction capabilities and model insights.

## Features ✨

### 🏠 Home Page
- **Hero Section** with project overview
- **How It Works** explanation with visual cards
- **Key Features** showcase including model accuracy (99%)
- Call-to-action buttons for easy navigation

### 🔮 Prediction Page
- **Interactive Form** with fields:
  - Location (Borough selection)
  - Property Type (Detached, Semi-detached, Terraced, Flat, Bungalow)
  - Bedrooms (numeric input)
  - Area in square metres
  - Year Built
  - Distance to Nearest Station

- **Prediction Results Display**:
  - Predicted price
  - Confidence range
  - Feature importance breakdown with visual impact bars
  - Sample predictions for demonstration

### 📊 Recent Predictions Page
- Display of past predictions as elegant cards
- Shows key property details:
  - Location and property type
  - Predicted price
  - Bedrooms, area, year built, station distance
- Responsive grid layout
- Links to make new predictions

### 📚 About Model Page
- **Model Overview** explaining the ML approach
- **Key Statistics**:
  - Model accuracy (94.2%)
  - R² Score (0.896)
  - Mean Absolute Error (£23,500)

- **Dataset Information**:
  - 15,847+ property records
  - 6+ key features
  - 32 London boroughs covered

- **Feature Explanations** for each input field
- **How Predictions Work** (5-step process)
- **Model Strengths & Limitations**

### 📧 Contact Page
- **Contact Information**:
  - Email: contact@londonhousepredictor.com
  - GitHub Repository link
  - Social media links

- **Contact Form** with fields:
  - Name, Email, Subject, Message
  
- **Common Inquiries** section
- **Support Resources**

### 🎨 UI/UX Features
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Clean Typography** - Professional, readable fonts
- **Card-Based Components** - Organized information layout
- **Consistent Color Scheme** with primary blue, success green, and alert colors
- **Interactive Elements** - Hover effects, form validation, smooth transitions
- **Accessibility** - Semantic HTML, color contrast, keyboard navigation

## Project Structure

```
London-House-Price-Predictor/
├── app.py                      # Main Flask application
├── requirements.txt             # Python dependencies
├── README.md                   # Project documentation
├── templates/                  # HTML templates
│   ├── base.html              # Base template with navigation
│   ├── home.html              # Home page
│   ├── predict.html           # Prediction page
│   ├── recent.html            # Recent predictions
│   ├── about.html             # About model page
│   └── contact.html           # Contact page
└── static/
    ├── css/
    │   └── style.css          # Comprehensive CSS styling
    └── js/
        └── main.js            # Client-side JavaScript
```

## Quick Start 🚀

### Prerequisites
- Python 3.8+
- pip

### Installation & Running

```bash
# Clone repository
git clone https://github.com/sp23abn/London-House-Price-Predictor.git
cd London-House-Price-Predictor

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run application
python app.py
```

Visit `http://localhost:5000` in your browser.

## Technology Stack

- **Backend**: Flask 2.3.3, Python 3.8+
- **Frontend**: HTML5, CSS3 (with CSS variables), Vanilla JavaScript
- **Styling**: Mobile-first responsive design with grid/flexbox layouts
- **Forms**: HTML5 validation with client-side JavaScript validation

## Pages Overview

| Page | Purpose |
|------|---------|
| **Home** | Project overview, hero section, features showcase |
| **Predict** | Main prediction form with sample results display |
| **Recent** | Shows past predictions as elegant cards |
| **About** | ML model explanation, features, statistics |
| **Contact** | Contact information, form, and support |

## Features Implemented

✅ Clean, modern UI with consistent design language  
✅ 5 fully functional pages (Home, Predict, Recent, About, Contact)  
✅ Responsive design (mobile, tablet, desktop)  
✅ Card-based component system  
✅ Professional typography and spacing  
✅ Interactive form with validation  
✅ Navigation bar with active state  
✅ CSS animations and transitions  
✅ Color-coded alerts and messages  
✅ Feature impact visualization  
✅ Sample prediction display  
✅ Recent predictions cards  
✅ Model statistics and explanations  
✅ Contact information and form  

## Notes

- **Frontend-focused**: HTML/CSS/JS templates only (no ML backend included as requested)
- **Sample predictions**: Demonstration data displayed for UX reference
- **Fully responsive**: Works seamlessly on mobile, tablet, and desktop
- **Production-ready CSS**: Modular, maintainable, and customizable
- **No external dependencies**: Pure HTML, CSS, and vanilla JavaScript

## Future Enhancements

- Backend ML model integration
- User authentication and prediction history
- Database storage
- RESTful API
- Real-time property market data
- Advanced filtering and comparisons

## Contact

📧 **Email**: contact@londonhousepredictor.com  
🐙 **GitHub**: [sp23abn/London-House-Price-Predictor](https://github.com/sp23abn/London-House-Price-Predictor)

---

**Built with ❤️ for London property enthusiasts**