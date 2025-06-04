// Enhanced About Section JavaScript Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Enhanced-about.js: DOM loaded');
    
    // Delay initialization to prevent conflicts with main scripts
    setTimeout(function() {
        try {
            initializeEnhancedAbout();
            console.log('✅ Enhanced-about.js: Initialized successfully');
        } catch (error) {
            console.error('Enhanced-about.js: Initialization failed:', error);
        }
    }, 200);
    
    // Enhanced About Section Interactivity
    function initializeEnhancedAbout() {
        // Technology badge hover effects
        const techBadges = document.querySelectorAll('.tech-badge');
        techBadges.forEach(badge => {
            badge.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
                this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
                this.style.transition = 'all 0.3s ease';
            });
            
            badge.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            });
        });

        // Enhanced statistics counter animation with stagger effect
        const statCards = document.querySelectorAll('.counter-box');
        statCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 150}ms`;
            
            // Add pulse effect on hover
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('[class*="group-hover:animate-pulse"]');
                if (icon) {
                    icon.style.animation = 'pulse 0.5s ease-in-out';
                }
                
                // Add subtle glow effect
                this.style.boxShadow = '0 10px 40px rgba(15, 157, 88, 0.3)';
                this.style.transition = 'all 0.3s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('[class*="group-hover:animate-pulse"]');
                if (icon) {
                    icon.style.animation = '';
                }
                this.style.boxShadow = '';
            });
        });

        // Expertise cards interactive effects
        const expertiseCards = document.querySelectorAll('[class*="hover:bg-gray-50"]');
        expertiseCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f9fafb';
                this.style.borderLeft = '4px solid #0f9d58';
                this.style.paddingLeft = '12px';
                this.style.transition = 'all 0.3s ease';
                
                // Animate the icon
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                    icon.style.transition = 'all 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
                this.style.borderLeft = '';
                this.style.paddingLeft = '';
                
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = '';
                }
            });
        });

        // Professional image reveal effect
        const profileImage = document.querySelector('img[alt="Daniel Bankole Oriyomi"]');
        if (profileImage) {
            // Add loading animation
            profileImage.style.opacity = '0';
            profileImage.style.transform = 'scale(0.9)';
            profileImage.style.transition = 'all 0.8s ease';
            
            profileImage.addEventListener('load', function() {
                setTimeout(() => {
                    this.style.opacity = '1';
                    this.style.transform = 'scale(1)';
                }, 100);
            });
            
            // Add hover effect
            profileImage.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.filter = 'brightness(1.1)';
            });
            
            profileImage.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.filter = 'brightness(1)';
            });
        }

        // Company badges interactive animation
        const companyBadges = document.querySelectorAll('img[alt="Microsoft"], img[alt="Google"], img[alt="Meta"]');
        companyBadges.forEach((badge, index) => {
            // Stagger animation on load
            badge.style.opacity = '0';
            badge.style.transform = 'translateY(20px)';
            badge.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                badge.style.opacity = '1';
                badge.style.transform = 'translateY(0)';
            }, (index + 1) * 200);
            
            badge.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2) rotate(5deg) translateY(-5px)';
                this.style.filter = 'brightness(1.1) drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2))';
                this.style.transition = 'all 0.3s ease';
            });
            
            badge.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg) translateY(0)';
                this.style.filter = 'brightness(1) drop-shadow(none)';
            });
        });
    }

    // Enhanced button interactions with ripple effect
    function initializeButtonEffects() {
        const primaryButtons = document.querySelectorAll('.btn-primary');
        const secondaryButtons = document.querySelectorAll('.btn-secondary');
        
        [...primaryButtons, ...secondaryButtons].forEach(button => {
            // Make button position relative for ripple effect
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            
            // Ripple effect on click
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple-animation 0.6s linear;
                    pointer-events: none;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                `;
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
            
            // Enhanced hover effects
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = this.classList.contains('btn-primary') 
                    ? '0 12px 30px rgba(15, 157, 88, 0.4)' 
                    : '0 12px 30px rgba(15, 157, 88, 0.2)';
                this.style.transition = 'all 0.3s ease';
                
                // Add slight rotation to icons
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'rotate(5deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = this.classList.contains('btn-primary') 
                    ? '0 4px 15px rgba(15, 157, 88, 0.3)' 
                    : '0 4px 15px rgba(15, 157, 88, 0.1)';
                
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        });
    }

    // Parallax scrolling effect for background elements
    function initializeParallaxEffects() {
        const aboutSection = document.querySelector('section.py-20');
        if (aboutSection) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = aboutSection.querySelector('.absolute.inset-0');
                if (parallax) {
                    parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
                    parallax.style.opacity = Math.max(0.05, 0.1 - scrolled * 0.0005);
                }
            });
        }
    }    // Animated number counting for statistics with enhanced visual feedback
    function enhanceCounterAnimation() {
        const counters = document.querySelectorAll('.counter');
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const suffix = counter.textContent.includes('+') ? '+' : '';
                    let current = 0;
                    const increment = target / 80; // Slower, smoother animation
                    const duration = 2000; // 2 seconds
                    const stepTime = duration / 80;
                    
                    // Add pulsing effect to parent container
                    const parentCard = counter.closest('.counter-box');
                    if (parentCard) {
                        parentCard.style.transform = 'scale(1.02)';
                        parentCard.style.transition = 'transform 0.3s ease';
                        
                        setTimeout(() => {
                            parentCard.style.transform = 'scale(1)';
                        }, 300);
                    }
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target + suffix;
                            clearInterval(timer);
                            
                            // Add completion effect
                            counter.style.transform = 'scale(1.1)';
                            counter.style.transition = 'transform 0.2s ease';
                            setTimeout(() => {
                                counter.style.transform = 'scale(1)';
                            }, 200);
                            
                        } else {
                            counter.textContent = Math.floor(current) + suffix;
                        }
                    }, stepTime);
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // Smooth reveal animations for content sections
    function initializeSmoothReveals() {
        const revealElements = document.querySelectorAll('.bg-white, .tech-badge, .counter-box');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            revealObserver.observe(element);
        });
    }

    // Mouse tracking effect for interactive elements
    function initializeMouseTracking() {
        const trackingElements = document.querySelectorAll('.counter-box, .tech-badge');
        
        trackingElements.forEach(element => {
            element.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });
    }    // Initialize all enhanced features
    function initializeAll() {
        try {
            initializeEnhancedAbout();
            initializeButtonEffects();
            initializeParallaxEffects();
            enhanceCounterAnimation();
            initializeSmoothReveals();
            initializeMouseTracking();
        } catch (error) {
            console.error('Error in enhanced-about.js:', error);
        }
    }

    // Wait a bit for other scripts to load, then initialize
    setTimeout(initializeAll, 100);

    // Add CSS animations
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes glow {
            0%, 100% {
                box-shadow: 0 0 5px rgba(15, 157, 88, 0.2);
            }
            50% {
                box-shadow: 0 0 20px rgba(15, 157, 88, 0.4);
            }
        }
        
        .animate-glow {
            animation: glow 2s ease-in-out infinite;
        }
        
        .bg-grid-pattern {
            background-image: radial-gradient(circle, rgba(15, 157, 88, 0.1) 1px, transparent 1px);
            background-size: 30px 30px;
            animation: backgroundMove 20s linear infinite;
        }
        
        @keyframes backgroundMove {
            0% { background-position: 0 0; }
            100% { background-position: 30px 30px; }
        }
    `;
    document.head.appendChild(styleSheet);
});
