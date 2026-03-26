/**
 * London House Price Predictor - Main JavaScript
 * 
 * Provides client-side functionality for the web application
 */

// Document ready handler
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips, form validations, etc.
    initializeFormValidation();
    initializeNavigation();
    initializeAnimations();
    initializeLiveUsersWidget();
    initializePredictionForm();
});

/**
 * Initialize form validation
 * Adds custom validation messages and styling
 */
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Perform custom validation if needed
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
    
    // Add real-time validation to input fields
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('change', function() {
            validateField(this);
        });
    });
}

/**
 * Validate a single form field
 * @param {HTMLElement} field - The form field to validate
 */
function validateField(field) {
    const value = field.value.trim();
    
    // Check for required fields
    if (field.hasAttribute('required') && !value) {
        addFieldError(field, 'This field is required');
        return false;
    }
    
    // Check email format
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            addFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Check number ranges
    if (field.type === 'number' && value) {
        const min = field.getAttribute('min');
        const max = field.getAttribute('max');
        const num = parseFloat(value);
        
        if (min && num < parseFloat(min)) {
            addFieldError(field, `Value must be at least ${min}`);
            return false;
        }
        
        if (max && num > parseFloat(max)) {
            addFieldError(field, `Value must be at most ${max}`);
            return false;
        }
    }
    
    // Field is valid, remove error styling
    removeFieldError(field);
    return true;
}

/**
 * Add error styling and message to a form field
 * @param {HTMLElement} field - The form field
 * @param {string} message - The error message
 */
function addFieldError(field, message) {
    field.style.borderColor = 'var(--danger, #ff4d6a)';
    field.style.boxShadow = '0 0 0 3px rgba(255,77,106,0.1)';

    removeFieldError(field);

    const errorMsg = document.createElement('small');
    errorMsg.className = 'field-error';
    errorMsg.style.color = 'var(--danger, #ff4d6a)';
    errorMsg.style.fontFamily = 'var(--mono, monospace)';
    errorMsg.style.fontSize = '0.75rem';
    errorMsg.style.marginTop = '0.3rem';
    errorMsg.style.display = 'block';
    errorMsg.textContent = message;

    field.parentNode.appendChild(errorMsg);
}

/**
 * Remove error styling and message from a form field
 * @param {HTMLElement} field - The form field
 */
function removeFieldError(field) {
    field.style.borderColor = '';
    field.style.boxShadow = '';

    const errorMsg = field.parentNode.querySelector('.field-error');
    if (errorMsg) errorMsg.remove();
}

/**
 * Initialize navigation features — mark active link based on current path
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // exact match, or root path
        if (href === currentPath || (currentPath === '/' && href === '/')) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize subtle animations
 */
function initializeAnimations() {
    // Add animation to cards on scroll
    const cards = document.querySelectorAll('.card');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        cards.forEach(card => {
            observer.observe(card);
        });
    }
}

/**
 * Smooth scroll to section
 * @param {string} sectionId - The ID of the section to scroll to
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Format currency for display
 * @param {number} value - The numeric value
 * @returns {string} Formatted currency string
 */
function formatCurrency(value) {
    return '£' + value.toLocaleString('en-GB', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

/**
 * Format number with comma separators
 * @param {number} value - The numeric value
 * @returns {string} Formatted number string
 */
function formatNumber(value) {
    return value.toLocaleString('en-GB');
}

/**
 * Show notification/toast message
 * @param {string} message - The message to display
 * @param {string} type - The notification type (success, error, info, warning)
 * @param {number} duration - Duration in milliseconds
 */
function showNotification(message, type = 'info', duration = 3000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: var(--${type}-color, var(--primary-color));
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after duration
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

/**
 * Export utility functions for global use
 */
window.PredictorApp = {
    formatCurrency,
    formatNumber,
    showNotification,
    scrollToSection,
    validateField
};

// Add animations to stylesheet dynamically if not present
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Add dynamic styles on page load
addDynamicStyles();

/**
 * Initialize live users widget
 * Simulates live users with SessionStorage and updates count
 */
function initializeLiveUsersWidget() {
    // Generate a unique session ID for this tab/window
    const sessionId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Function to send heartbeat and update user count
    function updateLiveUsersCount() {
        // Send session to server for tracking
        fetch('/api/track-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionId: sessionId })
        })
        .then(response => response.json())
        .then(data => {
            const userCountElement = document.querySelector('.user-count');
            const userLabelElement = document.querySelector('.user-label');
            
            if (userCountElement && data.active_users) {
                const currentCount = parseInt(userCountElement.textContent) || 1;
                const newCount = data.active_users;
                
                // Update count if changed
                if (currentCount !== newCount) {
                    userCountElement.style.opacity = '0.7';
                    userCountElement.textContent = newCount;
                    
                    // Update label (singular/plural)
                    if (userLabelElement) {
                        userLabelElement.textContent = newCount === 1 ? 'User Live' : 'Users Live';
                    }
                    
                    setTimeout(() => {
                        userCountElement.style.opacity = '1';
                    }, 200);
                }
            }
        })
        .catch(error => {
            console.warn('Could not update user count:', error);
        });
    }
    
    // Initial update
    updateLiveUsersCount();
    
    // Update count every 2 seconds
    setInterval(updateLiveUsersCount, 2000);
}

/**
/**
 * Initialize prediction form – show loading spinner then allow normal POST submit
 */
function initializePredictionForm() {
    const form = document.querySelector('form[action*="predict"]');

    if (!form) return;

    form.addEventListener('submit', function() {
        // Show loading spinner while the page navigates to POST response
        showLoadingState();
    });
}

/**
 * Show loading state on prediction form
 */
function showLoadingState() {
    const loadingElement = document.getElementById('predictionLoading');
    const resultElement = document.getElementById('predictionResult');
    const warningElement = document.getElementById('modelWarning');

    if (loadingElement) {
        loadingElement.style.display = 'block';
    }
    if (resultElement) {
        resultElement.style.display = 'none';
    }
    if (warningElement) {
        warningElement.style.display = 'none';
    }
}

/**
 * Hide loading state
 */
function hideLoadingState() {
    const loadingElement = document.getElementById('predictionLoading');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
}

/**
 * Show model warning when not trained
 */
function showModelWarning() {
    const warningElement = document.getElementById('modelWarning');
    const resultElement = document.getElementById('predictionResult');
    const loadingElement = document.getElementById('predictionLoading');

    if (warningElement) {
        warningElement.style.display = 'block';
    }
    if (resultElement) {
        resultElement.style.display = 'none';
    }
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
}

/**
 * Show prediction result
 */
function showPredictionResult() {
    const resultElement = document.getElementById('predictionResult');
    const warningElement = document.getElementById('modelWarning');

    if (resultElement) {
        resultElement.style.display = 'block';
    }
    if (warningElement) {
        warningElement.style.display = 'none';
    }
}
