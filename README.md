# London House Price Predictor

A Flask web application that predicts London property prices using a trained Gradient Boosting machine learning model. Built on a dataset of 3,480 real London property records.

## Model

| Metric | Value |
|--------|-------|
| Algorithm | Gradient Boosting Regressor |
| R² Score | 0.66 |
| MAE | £552,468 |
| RMSE | £1,040,023 |
| Training set | 3,480 properties across 657 locations |

Model training is documented in `model_training (1).ipynb`. Pre-trained artifacts are included in `models/`.

## Features

- **Predict** — Enter property details (area, bedrooms, bathrooms, receptions, house type, location) and get an instant price estimate with a ±10% confidence range
- **Recent Predictions** — Browse recent prediction examples
- **About** — Model methodology, dataset info, and performance metrics
- **Contact** — Project links and GitHub repository

## Project Structure

```
├── app.py                          # Flask application
├── requirements.txt                # Python dependencies
├── dataset/
│   └── London.csv                  # Source dataset
├── models/
│   ├── house_price_model.pkl       # Trained Gradient Boosting model
│   ├── encoders.pkl                # LabelEncoders for categorical fields
│   └── feature_info.json          # Feature list, locations, house types, metrics
├── model_training (1).ipynb        # Training notebook
├── templates/                      # Jinja2 HTML templates
│   ├── base.html
│   ├── home.html
│   ├── predict.html
│   ├── recent.html
│   ├── about.html
│   └── contact.html
└── static/
    ├── css/style.css
    └── js/main.js
```

## Quick Start

**Prerequisites:** Python 3.8+

```bash
# Clone repository
git clone https://github.com/sp23abn/London-House-Price-Predictor.git
cd London-House-Price-Predictor

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Run the app
python app.py
```

Visit `http://localhost:5000` in your browser.

## Prediction Inputs

| Field | Description |
|-------|-------------|
| Area (sq ft) | Total property floor area |
| Bedrooms | Number of bedrooms |
| Bathrooms | Number of bathrooms |
| Receptions | Number of reception rooms |
| House Type | 8 types (Detached, Semi-Detached, Terraced, Flat, etc.) |
| Location | 657 London locations from the dataset |

## Technology Stack

- **Backend**: Flask 2.3.3, Python 3.8+
- **ML**: scikit-learn (Gradient Boosting), pandas, numpy, joblib
- **Frontend**: HTML5, CSS3 (dark tech theme), Vanilla JavaScript
- **Fonts**: Inter + JetBrains Mono (Google Fonts)

## GitHub

[sp23abn/London-House-Price-Predictor](https://github.com/sp23abn/London-House-Price-Predictor)