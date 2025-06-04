// Debug version of main.js
console.log('🚀 Main.js starting...');

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM Content Loaded');
    
    try {
        // Initialize AOS animations
        if (typeof AOS !== 'undefined') {
            console.log('✅ AOS found, initializing...');
            AOS.init({
                duration: 1000,
                once: true,
                mirror: false
            });
        } else {
            console.log('⚠️ AOS not found');
        }

        // Preloader
        console.log('🔄 Setting up preloader...');
        const preloader = document.getElementById('preloader');
        if (preloader) {
            console.log('✅ Preloader found');
            window.addEventListener('load', function() {
                console.log('✅ Window load event fired');
                setTimeout(function() {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
                    console.log('✅ Preloader hidden');
                }, 500);
            });
        } else {
            console.log('⚠️ Preloader not found');
        }

        // Mobile Menu Toggle
        console.log('📱 Setting up mobile menu...');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuBtn && mobileMenu) {
            console.log('✅ Mobile menu elements found');
            // Mobile menu functionality here...
        } else {
            console.log('⚠️ Mobile menu elements not found');
        }

        console.log('✅ Main.js initialization complete');
        
    } catch (error) {
        console.error('❌ Error in main.js:', error);
    }
});

console.log('📄 Main.js file loaded');
