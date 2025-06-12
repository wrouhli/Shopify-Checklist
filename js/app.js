// Main Application Module

class ShopifyQAApp {
    constructor() {
        // Wait for data to be available
        if (!window.checklistData || !window.categoryColors) {
            console.error('Checklist data not loaded');
            return;
        }
        console.log('Creating app with data:', window.checklistData.length, 'sections');
        this.originalData = [...window.checklistData];
        this.initializeManagers();
    }

    initializeManagers() {
        // Initialize core managers
        this.progressManager = new ProgressManager(this.originalData);
        this.themeManager = new ThemeManager();
        this.filterManager = new FilterManager(this.originalData);
        this.exportManager = new ExportManager(this.originalData, this.progressManager);
        this.uiManager = new UIManager(this.originalData, this.progressManager, this.filterManager);
        this.animationManager = new AnimationManager();
    }

    init() {
        // Add animation CSS to document
        this.addAnimationCSS();
        
        // Initialize all managers
        this.progressManager.init();
        this.themeManager.init();
        this.filterManager.init();
        this.exportManager.init();
        this.uiManager.init();
        
        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    addAnimationCSS() {
        if (!document.getElementById('animation-styles')) {
            const style = document.createElement('style');
            style.id = 'animation-styles';
            style.textContent = animationCSS;
            document.head.appendChild(style);
        }
    }
}

// Initialize the application when everything is loaded
window.addEventListener('load', () => {
    console.log('Window loaded, checking for data...');
    
    // Ensure data is loaded before initializing
    const initApp = () => {
        console.log('Checking data:', !!window.checklistData, !!window.categoryColors);
        
        if (window.checklistData && window.categoryColors) {
            console.log('Data loaded, initializing app...');
            window.shopifyQAApp = new ShopifyQAApp();
            window.shopifyQAApp.init();
        } else {
            console.log('Waiting for data to load...');
            // Wait a bit more for data to load
            setTimeout(initApp, 50);
        }
    };
    
    // Start trying to initialize immediately
    initApp();
});