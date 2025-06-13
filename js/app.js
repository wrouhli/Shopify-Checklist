// Main Application Module

class ShopifyQAApp {
    constructor() {
        // Wait for data to be available
        if (!window.checklistData || !window.categoryColors) {
            console.error('Checklist data not loaded');
            throw new Error('Required data not available');
        }
        console.log('Creating app with data:', window.checklistData.length, 'sections');
        this.originalData = [...window.checklistData];
        try {
            this.initializeManagers();
        } catch (error) {
            console.error('Error initializing managers:', error);
            throw error;
        }
    }

    initializeManagers() {
        // Initialize core managers
        this.progressManager = new ProgressManager(this.originalData);
        this.themeManager = new ThemeManager();
        this.filterManager = new FilterManager(this.originalData, this.progressManager);
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
        
        // Show welcome message if no progress exists
        if (this.progressManager.getCompletedItems() === 0 && !localStorage.getItem('shopify-qa-progress')) {
            setTimeout(() => {
                if (this.uiManager) {
                    this.uiManager.showNotification('Welcome! Your progress will be automatically saved as you work.', 'info');
                }
            }, 1000);
        }
        
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
let appInitialized = false;

function initializeApp() {
    if (appInitialized) return;
    
    console.log('Starting app initialization...');
    
    // Ensure data is loaded before initializing
    const initApp = () => {
        console.log('Checking data:', !!window.checklistData, !!window.categoryColors);
        
        if (window.checklistData && window.categoryColors && !appInitialized) {
            console.log('Data loaded, initializing app...');
            try {
                window.shopifyQAApp = new ShopifyQAApp();
                if (window.shopifyQAApp) {
                    window.shopifyQAApp.init();
                    appInitialized = true;
                    console.log('App initialized successfully');
                } else {
                    console.error('Failed to create app instance');
                }
            } catch (error) {
                console.error('Error initializing app:', error);
            }
        } else if (!appInitialized) {
            console.log('Waiting for data to load...');
            // Wait a bit more for data to load
            setTimeout(initApp, 50);
        }
    };
    
    // Start trying to initialize immediately
    initApp();
}

// Try to initialize on both DOMContentLoaded and load events
document.addEventListener('DOMContentLoaded', initializeApp);
window.addEventListener('load', initializeApp);