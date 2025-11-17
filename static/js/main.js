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
    field.style.borderColor = '#ef4444';
    field.style.backgroundColor = '#fee2e2';
    
    // Remove existing error message
    removeFieldError(field);
    
    // Create and insert error message
    const errorMsg = document.createElement('small');
    errorMsg.className = 'field-error';
    errorMsg.style.color = '#991b1b';
    errorMsg.style.fontSize = '0.875rem';
    errorMsg.style.marginTop = '0.25rem';
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
    field.style.backgroundColor = '';
    
    // Remove error message if it exists
    const errorMsg = field.parentNode.querySelector('.field-error');
    if (errorMsg) {
        errorMsg.remove();
    }
}

/**
 * Initialize navigation features
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '/' && href === '/')) {
            link.style.color = 'var(--primary-color)';
            link.style.borderBottom = '2px solid var(--primary-color)';
            link.style.paddingBottom = '2px';
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
