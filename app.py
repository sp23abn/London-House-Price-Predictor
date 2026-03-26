"""
London House Price Predictor Flask Application

A web application for predicting London house prices using machine learning.
This app provides a clean, modern UI for property valuation and market analysis.
"""

from flask import Flask, render_template, request, jsonify
import os
import json
import numpy as np
import pandas as pd
import joblib
from datetime import datetime, timedelta

# Initialize Flask application
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-change-in-production'

# Store active user sessions
active_users = {}

# ===== MODEL LOADING =====

_MODEL_DIR = os.path.join(os.path.dirname(__file__), 'models')

def _load_model_artifacts():
    """Load the trained model, encoders, and feature metadata from disk."""
    model_path = os.path.join(_MODEL_DIR, 'house_price_model.pkl')
    enc_path   = os.path.join(_MODEL_DIR, 'encoders.pkl')
    info_path  = os.path.join(_MODEL_DIR, 'feature_info.json')

    if not all(os.path.exists(p) for p in [model_path, enc_path, info_path]):
        return None, None, None

    model    = joblib.load(model_path)
    encoders = joblib.load(enc_path)
    with open(info_path) as f:
        info = json.load(f)
    return model, encoders, info

_model, _encoders, _model_info = _load_model_artifacts()

# ===== API ROUTES =====

@app.route('/api/track-user', methods=['POST'])
def track_user():
    """
    Track active user sessions.
    Updates the timestamp for a user's session.
    
    Returns:
        JSON with active user count
    """
    try:
        data = request.get_json()
        session_id = data.get('sessionId')
        
        if session_id:
            # Update or create session with current timestamp
            active_users[session_id] = datetime.now()
            
            # Clean up old sessions (older than 10 seconds)
            cutoff_time = datetime.now() - timedelta(seconds=10)
            expired_sessions = [sid for sid, timestamp in active_users.items() 
                              if timestamp < cutoff_time]
            for sid in expired_sessions:
                del active_users[sid]
        
        # Return current active user count
        return jsonify({
            'active_users': len(active_users),
            'users': list(active_users.keys())
        })
    except Exception as e:
        return jsonify({'error': str(e), 'active_users': len(active_users)}), 400

# ===== ROUTE HANDLERS =====

@app.route('/')
def home():
    """
    Home page route - displays hero section, project overview, and features.
    
    Returns:
        Rendered home page template
    """
    return render_template('home.html')


@app.route('/predict', methods=['GET', 'POST'])
def predict():
    """
    Prediction page route - displays the prediction form and runs inference.

    Methods:
        GET:  Display the empty prediction form.
        POST: Validate inputs, run the ML model, return the predicted price.

    Returns:
        Rendered prediction page template
    """
    locations   = _model_info.get('locations',   []) if _model_info else []
    house_types = _model_info.get('house_types', []) if _model_info else []

    if request.method == 'POST':
        form_data = {
            'location':     request.form.get('location', ''),
            'property_type': request.form.get('property_type', ''),
            'bedrooms':     request.form.get('bedrooms', ''),
            'bathrooms':    request.form.get('bathrooms', ''),
            'receptions':   request.form.get('receptions', ''),
            'area':         request.form.get('area', ''),
        }

        error = None
        prediction = prediction_low = prediction_high = None

        if _model is None:
            error = 'Prediction model is not loaded. Please run train_model.py first.'
        else:
            try:
                area      = float(form_data['area'])
                bedrooms  = int(form_data['bedrooms'])
                bathrooms = int(form_data['bathrooms'])
                receptions = int(form_data['receptions'])

                le_ht  = _encoders['le_house_type']
                le_loc = _encoders['le_location']
                le_city = _encoders['le_city']

                ht_classes  = list(le_ht.classes_)
                loc_classes = list(le_loc.classes_)

                house_type_enc = le_ht.transform([form_data['property_type']])[0] \
                    if form_data['property_type'] in ht_classes else 0
                location_enc = le_loc.transform([form_data['location']])[0] \
                    if form_data['location'] in loc_classes else 0
                # City/County not collected from form – default to index 0
                city_enc = 0

                feature_map = {
                    'Area in sq ft':        area,
                    'No. of Bedrooms':      bedrooms,
                    'No. of Bathrooms':     bathrooms,
                    'No. of Receptions':    receptions,
                    'House Type Encoded':   house_type_enc,
                    'Location Encoded':     location_enc,
                    'City/County Encoded':  city_enc,
                }

                feature_cols = _model_info['features']
                X = pd.DataFrame([[feature_map[f] for f in feature_cols]], columns=feature_cols)

                prediction       = round(float(_model.predict(X)[0]), 2)
                prediction_low   = round(prediction * 0.90, 2)
                prediction_high  = round(prediction * 1.10, 2)

            except (ValueError, KeyError) as exc:
                error = f'Invalid input: {exc}'

        return render_template(
            'predict.html',
            locations=locations,
            house_types=house_types,
            form_data=form_data,
            prediction=prediction,
            prediction_low=prediction_low,
            prediction_high=prediction_high,
            error=error,
        )

    return render_template('predict.html', locations=locations, house_types=house_types,
                           prediction=None, prediction_low=None, prediction_high=None,
                           form_data=None, error=None)


@app.route('/recent')
def recent():
    """
    Recent predictions page route - displays past predictions.
    
    Returns:
        Rendered recent predictions page template
    """
    # In a real implementation, you would:
    # 1. Query the database for recent predictions
    # 2. Format the data for display
    # 3. Pass to the template
    
    return render_template('recent.html')


@app.route('/about')
def about():
    """
    About model page route - explains the ML model and how it works.
    
    Returns:
        Rendered about page template
    """
    return render_template('about.html')


@app.route('/contact', methods=['GET', 'POST'])
def contact():
    """
    Contact page route - displays contact information and form.
    
    Methods:
        GET: Display the contact form
        POST: Process form submission (frontend only, no backend logic)
    
    Returns:
        Rendered contact page template
    """
    if request.method == 'POST':
        # Extract form data
        form_data = {
            'name': request.form.get('name'),
            'email': request.form.get('email'),
            'subject': request.form.get('subject'),
            'message': request.form.get('message')
        }
        
        # In a real implementation, you would:
        # 1. Validate the contact information
        # 2. Send an email or save to database
        # 3. Send confirmation to user
        # 4. Display success message
        
        return render_template('contact.html')
    
    return render_template('contact.html')


# ===== ERROR HANDLERS =====

@app.errorhandler(404)
def page_not_found(error):
    """
    Handle 404 Not Found errors.
    
    Args:
        error: The error object
    
    Returns:
        Error response tuple (rendered template, status code)
    """
    return render_template('home.html'), 404


@app.errorhandler(500)
def internal_error(error):
    """
    Handle 500 Internal Server errors.
    
    Args:
        error: The error object
    
    Returns:
        Error response tuple (rendered template, status code)
    """
    return render_template('home.html'), 500


# ===== CONTEXT PROCESSORS =====

@app.context_processor
def inject_config():
    """
    Inject global configuration variables into all templates.
    
    Returns:
        Dictionary of variables to be available in all templates
    """
    return {
        'app_name': 'London House Price Predictor',
        'app_version': '1.0.0',
        'current_year': 2025
    }


# ===== APPLICATION ENTRY POINT =====

if __name__ == '__main__':
    """
    Run the Flask application.
    
    Development settings:
    - Debug mode enabled for auto-reload and better error messages
    - Server runs on localhost:5000
    - Host set to allow access from container
    """
    
    # Create static directories if they don't exist
    os.makedirs('static/css', exist_ok=True)
    os.makedirs('static/js', exist_ok=True)
    os.makedirs('templates', exist_ok=True)
    
    # Run the application
    app.run(
        debug=True,
        host='0.0.0.0',
        port=5000,
        use_reloader=True
    )
