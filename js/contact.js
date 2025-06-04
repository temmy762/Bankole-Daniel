// Contact Page JavaScript - Enhanced User Experience
// Professional contact form handling with animations and validation

class ContactManager {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.successMessage = document.getElementById('successMessage');
        this.isSubmitting = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFormValidation();
        this.setupAnimations();
        this.setupFAQ();
        this.setupMobileMenu();
    }

    setupEventListeners() {
        // Form submission
        this.form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });

        // Real-time validation
        const inputs = this.form?.querySelectorAll('input, select, textarea');
        inputs?.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupFormValidation() {
        // Email validation
        const emailInput = this.form?.querySelector('input[name="email"]');
        emailInput?.addEventListener('input', (e) => {
            const email = e.target.value;
            const isValid = this.validateEmail(email);
            
            if (email && !isValid) {
                this.showFieldError(e.target, 'Please enter a valid email address');
            } else {
                this.clearFieldError(e.target);
            }
        });

        // Phone validation
        const phoneInput = this.form?.querySelector('input[name="phone"]');
        phoneInput?.addEventListener('input', (e) => {
            let phone = e.target.value.replace(/\D/g, '');
            
            // Format phone number
            if (phone.length >= 6) {
                phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (phone.length >= 3) {
                phone = phone.replace(/(\d{3})(\d{0,3})/, '($1) $2');
            }
            
            e.target.value = phone;
        });

        // Character count for message
        const messageInput = this.form?.querySelector('textarea[name="message"]');
        if (messageInput) {
            const charCount = document.createElement('div');
            charCount.className = 'text-xs text-gray-500 mt-1 text-right';
            messageInput.parentNode.appendChild(charCount);

            messageInput.addEventListener('input', (e) => {
                const count = e.target.value.length;
                charCount.textContent = `${count}/1000 characters`;
                
                if (count > 1000) {
                    charCount.className = 'text-xs text-red-500 mt-1 text-right';
                } else {
                    charCount.className = 'text-xs text-gray-500 mt-1 text-right';
                }
            });
        }
    }

    setupAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Animate contact cards
        document.querySelectorAll('.contact-card, .contact-info-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease-out';
            observer.observe(card);
        });

        // Animate FAQ items
        document.querySelectorAll('.faq-item').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
            observer.observe(item);
        });
    }

    setupFAQ() {
        const faqButtons = document.querySelectorAll('.faq-button');
        
        faqButtons.forEach(button => {
            button.addEventListener('click', () => {
                const content = button.nextElementSibling;
                const icon = button.querySelector('i');
                const isOpen = !content.classList.contains('hidden');

                // Close all other FAQ items
                faqButtons.forEach(otherButton => {
                    if (otherButton !== button) {
                        const otherContent = otherButton.nextElementSibling;
                        const otherIcon = otherButton.querySelector('i');
                        
                        otherContent.classList.add('hidden');
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                });

                // Toggle current FAQ item
                if (isOpen) {
                    content.classList.add('hidden');
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    content.classList.remove('hidden');
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        });
    }

    setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');

        mobileMenuToggle?.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            const icon = mobileMenuToggle.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'ri-menu-line ri-xl';
            } else {
                icon.className = 'ri-close-line ri-xl';
            }
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Specific field validations
        switch (fieldName) {
            case 'email':
                if (value && !this.validateEmail(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'phone':
                if (value && !this.validatePhone(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
                break;
            case 'message':
                if (value && value.length > 1000) {
                    isValid = false;
                    errorMessage = 'Message must be less than 1000 characters';
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePhone(phone) {
        const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
        return phoneRegex.test(phone);
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('border-red-500');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'text-red-500 text-xs mt-1 field-error';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.classList.remove('border-red-500');
        
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    async handleFormSubmission() {
        if (this.isSubmitting) return;

        // Validate all fields
        const formData = new FormData(this.form);
        const isValid = this.validateForm();

        if (!isValid) {
            this.showNotification('Please correct the errors in the form', 'error');
            return;
        }

        this.isSubmitting = true;
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        // Show loading state
        submitButton.innerHTML = `
            <span class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
            </span>
        `;
        submitButton.disabled = true;

        try {
            // Simulate API call
            await this.submitForm(formData);
            
            // Show success
            this.showSuccessMessage();
            this.form.reset();
            
            // Analytics tracking (if implemented)
            this.trackFormSubmission(formData);
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('Something went wrong. Please try again.', 'error');
        } finally {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            this.isSubmitting = false;
        }
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async submitForm(formData) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // In a real application, you would send the data to your server
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        console.log('Form submission:', formObject);

        // For demo purposes, we'll store in localStorage
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        submissions.push({
            ...formObject,
            timestamp: new Date().toISOString(),
            id: Date.now()
        });
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

        return { success: true };
    }

    showSuccessMessage() {
        this.successMessage.classList.remove('hidden');
        this.successMessage.classList.add('success-animation');
        
        // Scroll to success message
        this.successMessage.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // Auto-hide after 10 seconds
        setTimeout(() => {
            this.successMessage.classList.add('hidden');
        }, 10000);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white max-w-sm transition-all transform translate-x-full opacity-0`;
        
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        };
        
        notification.classList.add(colors[type] || colors.info);
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="ri-${type === 'success' ? 'check' : type === 'error' ? 'error-warning' : 'information'}-line"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full', 'opacity-0');
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    trackFormSubmission(formData) {
        // Google Analytics tracking (if implemented)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'Contact',
                event_label: formData.get('projectType') || 'Unknown',
                value: 1
            });
        }

        // Custom analytics tracking
        console.log('📊 Form submission tracked:', {
            projectType: formData.get('projectType'),
            timeline: formData.get('timeline'),
            budget: formData.get('budget'),
            timestamp: new Date().toISOString()
        });
    }
}

// Initialize Contact Manager
document.addEventListener('DOMContentLoaded', () => {
    const contactManager = new ContactManager();
    
    // Add some interactive enhancements
    addInteractiveEnhancements();
});

function addInteractiveEnhancements() {
    // Add typing animation to form labels
    const labels = document.querySelectorAll('label');
    labels.forEach(label => {
        const input = label.parentNode.querySelector('input, select, textarea');
        
        if (input) {
            input.addEventListener('focus', () => {
                label.style.color = '#0F9D58';
                label.style.transform = 'translateY(-2px)';
                label.style.transition = 'all 0.3s ease';
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.style.color = '';
                    label.style.transform = '';
                }
            });
        }
    });

    // Add hover effects to social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-3px) rotate(5deg) scale(1.05)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translateY(0) rotate(0deg) scale(1)';
        });
    });

    // Add particle effect to hero section
    createParticleEffect();
}

function createParticleEffect() {
    const hero = document.querySelector('.contact-hero');
    if (!hero) return;

    // Create additional floating elements
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-element';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (6 + Math.random() * 4) + 's';
        
        const floatingElements = hero.querySelector('.floating-elements');
        if (floatingElements) {
            floatingElements.appendChild(particle);
        }
    }
}

// Utility function for smooth scrolling
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

console.log('📞 Contact Page Loaded Successfully!');
console.log('✨ Features activated:', {
    'Form Validation': '✅',
    'Real-time Feedback': '✅',
    'Smooth Animations': '✅',
    'Mobile Responsive': '✅',
    'FAQ System': '✅'
});
