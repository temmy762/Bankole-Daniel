/**
 * Dark Mode Manager
 * Provides consistent dark mode functionality across all pages
 */
class DarkModeManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.applyInitialTheme();
        console.log('✅ Dark Mode: Initialized successfully');
    }

    setupThemeToggle() {
        // Find existing toggle button or create one if it doesn't exist
        this.themeToggle = document.getElementById('themeToggle');
        
        if (!this.themeToggle) {
            this.createThemeToggle();
        }
        
        // Add event listener to toggle button
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    this.enableDarkMode(false);
                } else {
                    this.disableDarkMode(false);
                }
            }
        });
    }

    createThemeToggle() {
        // Create toggle button if it doesn't exist
        this.themeToggle = document.createElement('button');
        this.themeToggle.id = 'themeToggle';
        this.themeToggle.className = 'fixed top-24 right-6 w-10 h-10 bg-white dark:bg-gray-800 text-primary dark:text-white rounded-full shadow-lg flex items-center justify-center z-40 border border-gray-200 dark:border-gray-700';
        this.themeToggle.setAttribute('aria-label', 'Toggle Dark Mode');
        
        // Create sun icon
        const sunIcon = document.createElement('i');
        sunIcon.className = 'ri-sun-line ri-lg';
        
        // Create moon icon
        const moonIcon = document.createElement('i');
        moonIcon.className = 'ri-moon-line ri-lg hidden';
        
        // Add icons to button
        this.themeToggle.appendChild(sunIcon);
        this.themeToggle.appendChild(moonIcon);
        
        // Add button to body
        document.body.appendChild(this.themeToggle);
    }

    applyInitialTheme() {
        // Check for saved theme preference or use device preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            this.enableDarkMode(false);
        } else {
            this.disableDarkMode(false);
        }
        
        // Show the body after the theme is applied to prevent flash
        document.body.classList.remove('opacity-0');
        document.body.classList.add('transition-opacity', 'duration-300', 'opacity-100');
    }

    toggleTheme() {
        if (document.documentElement.classList.contains('dark')) {
            this.disableDarkMode(true);
        } else {
            this.enableDarkMode(true);
        }
    }

    enableDarkMode(savePreference = true) {
        document.documentElement.classList.add('dark');
        if (savePreference) {
            localStorage.setItem('theme', 'dark');
        }
        this.updateThemeToggleButton();
    }

    disableDarkMode(savePreference = true) {
        document.documentElement.classList.remove('dark');
        if (savePreference) {
            localStorage.setItem('theme', 'light');
        }
        this.updateThemeToggleButton();
    }

    updateThemeToggleButton() {
        if (!this.themeToggle) return;
        
        const isDark = document.documentElement.classList.contains('dark');
        const sunIcon = this.themeToggle.querySelector('.ri-sun-line');
        const moonIcon = this.themeToggle.querySelector('.ri-moon-line');
        
        if (isDark) {
            sunIcon?.classList.add('hidden');
            moonIcon?.classList.remove('hidden');
        } else {
            sunIcon?.classList.remove('hidden');
            moonIcon?.classList.add('hidden');
        }
    }
}

// Initialize dark mode when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add transition class to HTML for smooth theme changes
    document.documentElement.classList.add('transition-colors', 'duration-300');
    
    // Create dark mode manager
    window.darkModeManager = new DarkModeManager();
});
