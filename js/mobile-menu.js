/**
 * Mobile Menu Manager
 * Provides consistent mobile menu functionality across all pages
 */
class MobileMenuManager {
    constructor() {
        this.init();
    }

    init() {
        this.findElements();
        if (this.menuBtn && this.menu) {
            this.setupEventListeners();
            console.log('✅ Mobile Menu: Initialized successfully');
        } else {
            console.warn('⚠️ Mobile Menu: Required elements not found');
        }
    }

    findElements() {
        // Look for both ID variants to ensure consistency across pages
        this.menuBtn = document.getElementById('mobileMenuBtn') || document.getElementById('mobile-menu-btn');
        this.menu = document.getElementById('mobileMenu') || document.getElementById('mobile-menu');
        
        // If elements weren't found with the original IDs, try alternate formats
        if (!this.menuBtn) {
            console.warn('⚠️ Mobile Menu: Button not found with standard IDs, attempting alternative selectors');
            this.menuBtn = document.querySelector('[id*="mobile"][id*="menu"][id*="btn"], [id*="mobile"][id*="menu"][id*="button"], button[aria-label*="menu"]');
        }
        
        if (!this.menu) {
            console.warn('⚠️ Mobile Menu: Menu not found with standard IDs, attempting alternative selectors');
            this.menu = document.querySelector('[id*="mobile"][id*="menu"]:not(button), .mobile-menu, .mobile-nav, nav[class*="mobile"]');
        }
    }

    setupEventListeners() {
        // Toggle menu on button click
        this.menuBtn.addEventListener('click', () => this.toggleMenu());

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen() && !this.menu.contains(e.target) && !this.menuBtn.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Close menu on window resize (tablet/desktop)
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && this.isMenuOpen()) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        if (this.isMenuOpen()) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.menu.classList.remove('invisible', '-translate-y-full', 'opacity-0', 'hidden');
        this.menu.classList.add('visible', 'translate-y-0', 'opacity-100');
        
        // Update icon if using Remix icon library
        const iconElement = this.menuBtn.querySelector('i[class*="ri-"]');
        if (iconElement) {
            iconElement.className = iconElement.className.replace('menu-line', 'close-line');
        } else {
            // Fallback for other icon implementations
            this.menuBtn.setAttribute('aria-expanded', 'true');
        }
    }

    closeMenu() {
        this.menu.classList.add('invisible', '-translate-y-full', 'opacity-0');
        this.menu.classList.remove('visible', 'translate-y-0', 'opacity-100');
        
        // Update icon if using Remix icon library
        const iconElement = this.menuBtn.querySelector('i[class*="ri-"]');
        if (iconElement) {
            iconElement.className = iconElement.className.replace('close-line', 'menu-line');
        } else {
            // Fallback for other icon implementations
            this.menuBtn.setAttribute('aria-expanded', 'false');
        }
    }

    isMenuOpen() {
        return !this.menu.classList.contains('invisible') && 
               !this.menu.classList.contains('hidden') &&
               (this.menu.classList.contains('opacity-100') || 
                this.menu.classList.contains('translate-y-0') ||
                this.menu.getAttribute('aria-hidden') === 'false');
    }
}

// Initialize mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.mobileMenuManager = new MobileMenuManager();
});
