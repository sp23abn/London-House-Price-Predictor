# Development Guide - London House Price Predictor

## Quick Commands

### Start Development Server
```bash
python app.py
```
Server runs on `http://localhost:5000` with auto-reload enabled.

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Quick Start Script
```bash
bash quickstart.sh
```

---

## Project Architecture

### Folder Structure
```
app.py                    # Main Flask application
requirements.txt          # Python dependencies
.gitignore               # Git configuration
DOCUMENTATION.md         # Detailed documentation
README.md                # Project overview
quickstart.sh            # Quick start script

templates/
├── base.html            # Base template (navigation, footer)
├── home.html            # Home page
├── predict.html         # Prediction form page
├── recent.html          # Recent predictions page
├── about.html           # About model page
└── contact.html         # Contact page

static/
├── css/
│   └── style.css        # All styling (650+ lines)
└── js/
    └── main.js          # Client-side functionality
```

---

## Flask Routes

| Route | Method | Template | Purpose |
|-------|--------|----------|---------|
| `/` | GET | home.html | Home page |
| `/predict` | GET, POST | predict.html | Prediction form |
| `/recent` | GET | recent.html | Recent predictions |
| `/about` | GET | about.html | Model information |
| `/contact` | GET, POST | contact.html | Contact page |

---

## Adding New Features

### Add a New Page
1. Create route in `app.py`:
   ```python
   @app.route('/newpage')
   def newpage():
       return render_template('newpage.html')
   ```

2. Create template `templates/newpage.html`:
   ```html
   {% extends 'base.html' %}
   {% block title %}Page Title{% endblock %}
   {% block content %}
       <!-- Page content -->
   {% endblock %}
   ```

3. Add navigation link in `templates/base.html`:
   ```html
   <li><a href="{{ url_for('newpage') }}" class="nav-link">New Page</a></li>
   ```

### Add New Component
1. Add CSS classes to `static/css/style.css`:
   ```css
   .my-component {
       /* Styling */
   }
   ```

2. Use in templates:
   ```html
   <div class="my-component">
       Content here
   </div>
   ```

### Add JavaScript Functionality
Add functions to `static/js/main.js`:
```javascript
function myFunction() {
    // Implementation
}
```

---

## CSS Customization

### Change Primary Color
In `static/css/style.css`, modify:
```css
:root {
    --primary-color: #2563eb;  /* Change this hex value */
    /* ... other variables */
}
```

### Add New Component Style
```css
.my-new-component {
    background-color: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 1rem;
}
```

### Adjust Responsive Breakpoints
Look for `@media (max-width: 768px)` and `@media (max-width: 1024px)`.

---

## Form Handling

### Backend Processing
The current templates show form structure. To add backend processing:

1. In `app.py`:
   ```python
   @app.route('/predict', methods=['GET', 'POST'])
   def predict():
       if request.method == 'POST':
           # Process form data
           location = request.form.get('location')
           # Add your ML model logic here
           return render_template('predict.html', result=prediction)
       return render_template('predict.html')
   ```

2. Display results in template:
   ```html
   {% if result %}
       <div class="prediction-result">
           <p>Price: {{ result }}</p>
       </div>
   {% endif %}
   ```

---

## Database Integration

To add database storage for predictions:

1. Install Flask-SQLAlchemy:
   ```bash
   pip install Flask-SQLAlchemy
   ```

2. Configure in `app.py`:
   ```python
   from flask_sqlalchemy import SQLAlchemy
   
   app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///predictions.db'
   db = SQLAlchemy(app)
   
   class Prediction(db.Model):
       id = db.Column(db.Integer, primary_key=True)
       location = db.Column(db.String(100))
       property_type = db.Column(db.String(50))
       bedrooms = db.Column(db.Integer)
       area = db.Column(db.Float)
       year_built = db.Column(db.Integer)
       distance_station = db.Column(db.Float)
       predicted_price = db.Column(db.Float)
       created_at = db.Column(db.DateTime, default=datetime.utcnow)
   ```

---

## ML Model Integration

To connect your trained ML model:

1. Save your model:
   ```python
   import pickle
   with open('model.pkl', 'wb') as f:
       pickle.dump(trained_model, f)
   ```

2. Load in Flask app:
   ```python
   import pickle
   
   with open('model.pkl', 'rb') as f:
       model = pickle.load(f)
   ```

3. Use for predictions:
   ```python
   @app.route('/predict', methods=['POST'])
   def predict():
       data = request.form
       features = [float(data['bedrooms']), float(data['area']), ...]
       prediction = model.predict([features])[0]
       return render_template('predict.html', price=prediction)
   ```

---

## Testing

### Test Routes
```bash
# Test home page
curl http://localhost:5000/

# Test prediction page
curl http://localhost:5000/predict

# Test recent page
curl http://localhost:5000/recent
```

### Manual Testing Checklist
- [ ] All navigation links work
- [ ] All pages load correctly
- [ ] Forms display properly
- [ ] Responsive design works on mobile
- [ ] CSS loads correctly
- [ ] JavaScript validation works
- [ ] No console errors

---

## Performance Optimization

### Caching
Add caching headers to static files:
```python
@app.after_request
def add_cache_headers(response):
    if response.content_type.startswith('image/') or \
       response.content_type in ['text/css', 'application/javascript']:
        response.cache_control.max_age = 86400  # 24 hours
    return response
```

### Minification
Minify CSS and JavaScript:
- Use tools like CSS-Nano or UglifyJS
- Update links in templates

### Image Optimization
Add images with WebP support:
```html
<picture>
    <source srcset="image.webp" type="image/webp">
    <img src="image.jpg" alt="Description">
</picture>
```

---

## Deployment

### Heroku
1. Create `Procfile`:
   ```
   web: gunicorn app:app
   ```

2. Deploy:
   ```bash
   git push heroku main
   ```

### Docker
1. Create `Dockerfile`:
   ```dockerfile
   FROM python:3.9-slim
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   COPY . .
   CMD ["gunicorn", "app:app"]
   ```

2. Build and run:
   ```bash
   docker build -t predictor .
   docker run -p 5000:5000 predictor
   ```

---

## Debugging

### Flask Debug Mode
Already enabled in `app.py`. Access debug toolbar at `http://localhost:5000/__debug__`.

### Browser DevTools
- Press F12 to open Developer Tools
- Check Network tab for load times
- Check Console for JavaScript errors
- Check Elements for HTML/CSS inspection

### Python Debugging
```python
import pdb
pdb.set_trace()  # Debugger breakpoint
```

---

## Common Issues

### Templates Not Found
- Ensure `templates/` folder exists
- Verify template names match route references
- Check Flask is looking in correct directory

### Static Files Not Loading
- Ensure `static/` folder exists with `css/` and `js/` subfolders
- Check file paths in templates use `{{ url_for() }}`
- Clear browser cache

### Form Submission Issues
- Verify form method matches route method
- Check form field names match Python form.get() calls
- Inspect Network tab to see request

---

## Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [Jinja2 Templates](https://jinja.palletsprojects.com/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

---

## Support

For questions or issues:
1. Check DOCUMENTATION.md
2. Review code comments
3. Check Flask logs in terminal
4. Open issue on GitHub

Happy developing! 🚀
