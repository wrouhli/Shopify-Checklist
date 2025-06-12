// Theme Management Module
class ThemeManager {
    constructor() {
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    }

    init() {
        this.initializeTheme();
        this.bindEvents();
    }

    initializeTheme() {
        if (this.isDarkMode) {
            document.documentElement.classList.add('dark');
            this.updateThemeIcon('sun');
        } else {
            document.documentElement.classList.remove('dark');
            this.updateThemeIcon('moon');
        }
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('darkMode', this.isDarkMode);
        
        if (this.isDarkMode) {
            document.documentElement.classList.add('dark');
            this.updateThemeIcon('sun');
        } else {
            document.documentElement.classList.remove('dark');
            this.updateThemeIcon('moon');
        }
    }

    updateThemeIcon(icon) {
        const themeButton = document.getElementById('theme-toggle');
        const iconElement = themeButton.querySelector('i');
        iconElement.setAttribute('data-lucide', icon);
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    bindEvents() {
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });
    }
}