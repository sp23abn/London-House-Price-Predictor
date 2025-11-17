"""
London House Price Predictor Flask Application

A web application for predicting London house prices using machine learning.
This app provides a clean, modern UI for property valuation and market analysis.
"""

from flask import Flask, render_template, request, jsonify
import os

# Initialize Flask application
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-change-in-production'

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
    Prediction page route - displays the prediction form.
    
    Methods:
        GET: Display the prediction form
        POST: Process form submission (frontend only, no backend logic)
    
    Returns:
        Rendered prediction page template
    """
    if request.method == 'POST':
        # Extract form data (for demonstration only)
        form_data = {
            'location': request.form.get('location'),
            'property_type': request.form.get('property_type'),
            'bedrooms': request.form.get('bedrooms'),
            'area': request.form.get('area'),
            'year_built': request.form.get('year_built'),
            'distance_station': request.form.get('distance_station')
        }
        
        # In a real implementation, you would:
        # 1. Validate the input data
        # 2. Preprocess the features
        # 3. Load the trained ML model
        # 4. Generate predictions
        # 5. Calculate confidence ranges
        # 6. Compute feature importance
        # 7. Return results to the template
        
        return render_template('predict.html', form_data=form_data)
    
    return render_template('predict.html')


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
