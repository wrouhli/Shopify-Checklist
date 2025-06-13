// Keyboard Shortcut Management System
class KeyboardShortcutManager {
    constructor() {
        this.shortcuts = new Map();
        this.contexts = new Set(['global', 'modal', 'search', 'item', 'section']);
        this.currentContext = 'global';
        this.isHelpVisible = false;
        this.isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        
        this.init();
    }

    init() {
        this.registerDefaultShortcuts();
        this.bindEvents();
    }

    registerDefaultShortcuts() {
        // Global shortcuts
        this.register({
            key: 'ctrl+s,cmd+s',
            description: 'Save progress',
            category: 'Actions',
            context: 'global',
            action: () => this.triggerSave(),
            icon: 'save'
        });

        this.register({
            key: 'ctrl+e,cmd+e',
            description: 'Open export menu',
            category: 'Actions',
            context: 'global',
            action: () => this.triggerExport(),
            icon: 'download'
        });

        this.register({
            key: 'ctrl+f,cmd+f',
            description: 'Focus search input',
            category: 'Navigation',
            context: 'global',
            action: () => this.focusSearch(),
            icon: 'search'
        });

        this.register({
            key: 'ctrl+slash,cmd+slash,ctrl+shift+slash,cmd+shift+slash',
            description: 'Show keyboard shortcuts',
            category: 'Help',
            context: 'global',
            action: () => this.toggleHelp(),
            icon: 'keyboard'
        });

        this.register({
            key: 'ctrl+k,cmd+k',
            description: 'Open command palette',
            category: 'Navigation',
            context: 'global',
            action: () => this.showCommandPalette(),
            icon: 'command'
        });

        this.register({
            key: 'ctrl+t,cmd+t',
            description: 'Toggle dark mode',
            category: 'Interface',
            context: 'global',
            action: () => this.toggleTheme(),
            icon: 'moon'
        });

        // Note: Removed Cmd+R/Ctrl+R as it conflicts with browser refresh
        // Reset is available through the reset button and command palette

        // Navigation shortcuts
        this.register({
            key: 'g,g',
            description: 'Go to top',
            category: 'Navigation',
            context: 'global',
            action: () => this.scrollToTop(),
            icon: 'arrow-up',
            sequence: true
        });

        this.register({
            key: 'g,e',
            description: 'Go to end',
            category: 'Navigation',
            context: 'global',
            action: () => this.scrollToBottom(),
            icon: 'arrow-down',
            sequence: true
        });

        this.register({
            key: 'slash',
            description: 'Quick search',
            category: 'Navigation',
            context: 'global',
            action: () => this.quickSearch(),
            icon: 'search'
        });

        // Item-specific shortcuts
        this.register({
            key: 'ctrl+enter,cmd+enter',
            description: 'Mark item complete',
            category: 'Actions',
            context: 'item',
            action: () => this.markItemComplete(),
            icon: 'check'
        });

        this.register({
            key: 'space',
            description: 'Toggle item',
            category: 'Actions',
            context: 'item',
            action: () => this.toggleCurrentItem(),
            icon: 'square'
        });

        // Modal shortcuts
        this.register({
            key: 'escape',
            description: 'Close modal or clear search',
            category: 'Navigation',
            context: 'global',
            action: () => this.handleEscape(),
            icon: 'x'
        });

        // Arrow navigation
        this.register({
            key: 'ctrl+up,cmd+up',
            description: 'Previous section',
            category: 'Navigation',
            context: 'global',
            action: () => this.navigateSection(-1),
            icon: 'chevron-up'
        });

        this.register({
            key: 'ctrl+down,cmd+down',
            description: 'Next section',
            category: 'Navigation',
            context: 'global',
            action: () => this.navigateSection(1),
            icon: 'chevron-down'
        });
    }

    register(shortcut) {
        const keys = shortcut.key.split(',');
        keys.forEach(key => {
            this.shortcuts.set(key.trim(), {
                ...shortcut,
                normalizedKey: this.normalizeKey(key.trim())
            });
        });
    }

    normalizeKey(key) {
        return key.toLowerCase()
            .replace(/\+/g, '+')
            .replace(/cmd/g, this.isMac ? 'cmd' : 'ctrl')
            .replace(/ctrl/g, this.isMac ? 'cmd' : 'ctrl');
    }

    bindEvents() {
        let sequenceBuffer = [];
        let sequenceTimeout = null;

        document.addEventListener('keydown', (e) => {
            // Don't interfere with form inputs unless it's a specific shortcut
            if (this.isFormInput(e.target) && !this.isGlobalShortcut(e)) {
                return;
            }

            const keyCombo = this.getKeyCombo(e);
            
            // Handle sequence shortcuts (like g,g)
            if (this.isSequenceKey(keyCombo)) {
                sequenceBuffer.push(keyCombo);
                
                clearTimeout(sequenceTimeout);
                sequenceTimeout = setTimeout(() => {
                    sequenceBuffer = [];
                }, 1000);

                const sequence = sequenceBuffer.join(',');
                const shortcut = this.shortcuts.get(sequence);
                
                if (shortcut && shortcut.sequence) {
                    e.preventDefault();
                    this.executeShortcut(shortcut, e);
                    sequenceBuffer = [];
                }
                return;
            }

            // Handle regular shortcuts
            const shortcut = this.shortcuts.get(keyCombo);
            if (shortcut && this.isContextValid(shortcut.context)) {
                e.preventDefault();
                this.executeShortcut(shortcut, e);
            }
        });
    }

    getKeyCombo(e) {
        const parts = [];
        
        if (e.ctrlKey || e.metaKey) parts.push(this.isMac ? 'cmd' : 'ctrl');
        if (e.altKey) parts.push('alt');
        if (e.shiftKey && !this.isShiftableKey(e.key)) parts.push('shift');
        
        const key = e.key.toLowerCase();
        if (key === '/') parts.push('slash');
        else if (key === ' ') parts.push('space');
        else if (key === 'arrowup') parts.push('up');
        else if (key === 'arrowdown') parts.push('down');
        else if (key === 'arrowleft') parts.push('left');
        else if (key === 'arrowright') parts.push('right');
        else parts.push(key);
        
        return parts.join('+');
    }

    isShiftableKey(key) {
        return key === '?' || key === '!';
    }

    isFormInput(element) {
        const tagName = element.tagName.toLowerCase();
        return tagName === 'input' || tagName === 'textarea' || 
               element.contentEditable === 'true';
    }

    isGlobalShortcut(e) {
        const keyCombo = this.getKeyCombo(e);
        const shortcut = this.shortcuts.get(keyCombo);
        return shortcut && (shortcut.context === 'global' || 
               ['ctrl+s', 'cmd+s', 'ctrl+f', 'cmd+f', 'escape'].includes(keyCombo));
    }

    isSequenceKey(key) {
        return ['g', 'G'].includes(key);
    }

    isContextValid(context) {
        return context === 'global' || context === this.currentContext;
    }

    executeShortcut(shortcut, event) {
        try {
            shortcut.action(event);
            this.showShortcutFeedback(shortcut);
        } catch (error) {
            console.error('Shortcut execution error:', error);
        }
    }

    showShortcutFeedback(shortcut) {
        // Create a subtle feedback indicator
        const feedback = document.createElement('div');
        feedback.className = 'shortcut-feedback';
        feedback.innerHTML = `
            <i data-lucide="${shortcut.icon}" class="w-4 h-4"></i>
            <span>${shortcut.description}</span>
        `;
        
        document.body.appendChild(feedback);
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        setTimeout(() => {
            feedback.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            feedback.classList.remove('show');
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.parentNode.removeChild(feedback);
                }
            }, 300);
        }, 1500);
    }

    // Shortcut actions
    triggerSave() {
        const event = new CustomEvent('shortcut:save');
        document.dispatchEvent(event);
    }

    triggerExport() {
        const exportBtn = document.getElementById('export-btn');
        if (exportBtn) exportBtn.click();
    }

    focusSearch() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }

    quickSearch() {
        this.focusSearch();
    }

    toggleHelp() {
        this.isHelpVisible = !this.isHelpVisible;
        if (this.isHelpVisible) {
            this.showHelpModal();
        } else {
            this.hideHelpModal();
        }
    }

    showCommandPalette() {
        if (document.getElementById('command-palette-modal')) return;

        const commands = [
            { name: 'Save Progress', description: 'Save current progress', action: () => this.triggerSave(), icon: 'save' },
            { name: 'Export Report', description: 'Export checklist as PDF', action: () => this.triggerExport(), icon: 'download' },
            { name: 'Toggle Theme', description: 'Switch between light and dark mode', action: () => this.toggleTheme(), icon: 'moon' },
            { name: 'Focus Search', description: 'Focus the search input', action: () => this.focusSearch(), icon: 'search' },
            { name: 'Show Shortcuts', description: 'Display keyboard shortcuts', action: () => this.toggleHelp(), icon: 'keyboard' },
            { name: 'Scroll to Top', description: 'Scroll to the top of the page', action: () => this.scrollToTop(), icon: 'arrow-up' },
            { name: 'Scroll to Bottom', description: 'Scroll to the bottom of the page', action: () => this.scrollToBottom(), icon: 'arrow-down' },
            { name: 'Reset Progress', description: 'Reset all progress (use Reset button instead)', action: () => this.triggerReset(), icon: 'rotate-ccw' }
        ];

        const modal = document.createElement('div');
        modal.id = 'command-palette-modal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-32 z-50 p-4';
        
        modal.innerHTML = `
            <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
                <div class="p-4 border-b border-slate-200 dark:border-slate-700">
                    <div class="relative">
                        <i data-lucide="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400"></i>
                        <input 
                            type="text" 
                            id="command-search" 
                            placeholder="Type a command..." 
                            class="w-full pl-10 pr-4 py-3 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none text-lg"
                            autocomplete="off"
                        >
                    </div>
                </div>
                
                <div id="command-results" class="max-h-80 overflow-y-auto">
                    ${commands.map((cmd, index) => `
                        <div class="command-item flex items-center px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors ${index === 0 ? 'bg-slate-50 dark:bg-slate-700' : ''}" data-index="${index}">
                            <div class="w-8 h-8 bg-slate-200 dark:bg-slate-600 rounded-lg flex items-center justify-center mr-3">
                                <i data-lucide="${cmd.icon}" class="w-4 h-4 text-slate-600 dark:text-slate-300"></i>
                            </div>
                            <div class="flex-1">
                                <div class="font-medium text-slate-900 dark:text-slate-100">${cmd.name}</div>
                                <div class="text-sm text-slate-500 dark:text-slate-400">${cmd.description}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const searchInput = modal.querySelector('#command-search');
        const resultsContainer = modal.querySelector('#command-results');
        let selectedIndex = 0;

        // Focus search input
        searchInput.focus();

        // Filter commands
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filteredCommands = commands.filter(cmd => 
                cmd.name.toLowerCase().includes(query) || 
                cmd.description.toLowerCase().includes(query)
            );

            resultsContainer.innerHTML = filteredCommands.map((cmd, index) => `
                <div class="command-item flex items-center px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors ${index === 0 ? 'bg-slate-50 dark:bg-slate-700' : ''}" data-index="${index}">
                    <div class="w-8 h-8 bg-slate-200 dark:bg-slate-600 rounded-lg flex items-center justify-center mr-3">
                        <i data-lucide="${cmd.icon}" class="w-4 h-4 text-slate-600 dark:text-slate-300"></i>
                    </div>
                    <div class="flex-1">
                        <div class="font-medium text-slate-900 dark:text-slate-100">${cmd.name}</div>
                        <div class="text-sm text-slate-500 dark:text-slate-400">${cmd.description}</div>
                    </div>
                </div>
            `).join('');

            selectedIndex = 0;
            this.updateCommandSelection(modal, filteredCommands);
            
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });

        // Keyboard navigation
        searchInput.addEventListener('keydown', (e) => {
            const items = modal.querySelectorAll('.command-item');
            const currentCommands = searchInput.value ? 
                commands.filter(cmd => 
                    cmd.name.toLowerCase().includes(searchInput.value.toLowerCase()) || 
                    cmd.description.toLowerCase().includes(searchInput.value.toLowerCase())
                ) : commands;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
                this.updateCommandSelection(modal, currentCommands);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedIndex = Math.max(selectedIndex - 1, 0);
                this.updateCommandSelection(modal, currentCommands);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (currentCommands[selectedIndex]) {
                    currentCommands[selectedIndex].action();
                    this.hideCommandPalette();
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                this.hideCommandPalette();
            }
        });

        // Click handlers
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideCommandPalette();
            }
            
            const commandItem = e.target.closest('.command-item');
            if (commandItem) {
                const index = parseInt(commandItem.getAttribute('data-index'));
                const currentCommands = searchInput.value ? 
                    commands.filter(cmd => 
                        cmd.name.toLowerCase().includes(searchInput.value.toLowerCase()) || 
                        cmd.description.toLowerCase().includes(searchInput.value.toLowerCase())
                    ) : commands;
                
                if (currentCommands[index]) {
                    currentCommands[index].action();
                    this.hideCommandPalette();
                }
            }
        });

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    updateCommandSelection(modal, commands) {
        const items = modal.querySelectorAll('.command-item');
        items.forEach((item, index) => {
            if (index === selectedIndex) {
                item.classList.add('bg-slate-50', 'dark:bg-slate-700');
            } else {
                item.classList.remove('bg-slate-50', 'dark:bg-slate-700');
            }
        });
    }

    hideCommandPalette() {
        const modal = document.getElementById('command-palette-modal');
        if (modal && modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }

    toggleTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) themeToggle.click();
    }

    triggerReset() {
        const resetBtn = document.getElementById('reset-btn');
        if (resetBtn) resetBtn.click();
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    scrollToBottom() {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }

    markItemComplete() {
        const focusedElement = document.activeElement;
        let checklistItem = focusedElement.closest('.checklist-item');
        
        if (checklistItem) {
            const checkbox = checklistItem.querySelector('input[type="checkbox"]');
            if (checkbox) checkbox.click();
        }
    }

    toggleCurrentItem() {
        this.markItemComplete();
    }

    handleEscape() {
        // Close command palette first
        if (document.getElementById('command-palette-modal')) {
            this.hideCommandPalette();
            return;
        }

        // Close help modal
        if (this.isHelpVisible) {
            this.hideHelpModal();
            return;
        }

        // Close completion celebration
        const celebration = document.getElementById('completion-celebration');
        if (celebration && !celebration.classList.contains('hidden')) {
            celebration.classList.add('hidden');
            return;
        }

        // Close other modals
        const modals = document.querySelectorAll('.fixed.inset-0.bg-black.bg-opacity-50');
        if (modals.length > 0) {
            modals.forEach(modal => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            });
            return;
        }

        // Clear search
        const searchInput = document.getElementById('search-input');
        if (searchInput && (document.activeElement === searchInput || searchInput.value.trim() !== '')) {
            searchInput.value = '';
            searchInput.blur();
            const event = new Event('input', { bubbles: true });
            searchInput.dispatchEvent(event);
            return;
        }

        // Close FAB menu
        const fabMenu = document.getElementById('fab-menu');
        if (fabMenu && !fabMenu.classList.contains('hidden')) {
            fabMenu.classList.add('hidden');
        }
    }

    navigateSection(direction) {
        const sections = document.querySelectorAll('[data-section-id]');
        if (sections.length === 0) return;

        const currentSection = document.querySelector('.checklist-item:focus')?.closest('[data-section-id]');
        let targetIndex = 0;

        if (currentSection) {
            const currentIndex = Array.from(sections).indexOf(currentSection);
            targetIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));
        }

        const targetSection = sections[targetIndex];
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            const firstItem = targetSection.querySelector('.checklist-item input');
            if (firstItem) {
                setTimeout(() => firstItem.focus(), 300);
            }
        }
    }

    getShortcutsByCategory() {
        const categories = {};
        
        // Create a map to avoid duplicates (since we register multiple key combinations for the same shortcut)
        const uniqueShortcuts = new Map();
        
        this.shortcuts.forEach((shortcut, key) => {
            const shortcutId = shortcut.description + shortcut.category;
            if (!uniqueShortcuts.has(shortcutId)) {
                uniqueShortcuts.set(shortcutId, { ...shortcut, key });
            }
        });
        
        uniqueShortcuts.forEach(shortcut => {
            const category = shortcut.category || 'Other';
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push(shortcut);
        });

        console.log('Generated categories:', categories);
        return categories;
    }

    formatKeyDisplay(key) {
        return key.replace(/ctrl/gi, this.isMac ? '⌘' : 'Ctrl')
                 .replace(/cmd/gi, '⌘')
                 .replace(/alt/gi, this.isMac ? '⌥' : 'Alt')
                 .replace(/shift/gi, this.isMac ? '⇧' : 'Shift')
                 .replace(/slash/gi, '/')
                 .replace(/space/gi, 'Space')
                 .replace(/up/gi, '↑')
                 .replace(/down/gi, '↓')
                 .replace(/left/gi, '←')
                 .replace(/right/gi, '→')
                 .replace(/enter/gi, '⏎')
                 .replace(/escape/gi, 'Esc')
                 .toUpperCase();
    }

    showHelpModal() {
        if (document.getElementById('shortcuts-help-modal')) return;

        const categories = this.getShortcutsByCategory();
        console.log('Categories for modal:', categories);
        
        if (Object.keys(categories).length === 0) {
            console.error('No shortcuts found for modal');
            return;
        }

        const modal = document.createElement('div');
        modal.id = 'shortcuts-help-modal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        
        const categoryTabs = Object.keys(categories).map(cat => 
            `<button class="category-tab px-4 py-2 text-sm rounded-lg transition-colors text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700" data-category="${cat}">${cat}</button>`
        ).join('');

        modal.innerHTML = `
            <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h3 class="text-2xl font-bold text-slate-800 dark:text-slate-100">Keyboard Shortcuts</h3>
                        <p class="text-slate-600 dark:text-slate-400">Master your workflow with these shortcuts</p>
                    </div>
                    <button id="close-shortcuts-help" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 rounded-lg">
                        <i data-lucide="x" class="w-6 h-6"></i>
                    </button>
                </div>

                <div class="flex flex-wrap gap-2 mb-6">
                    ${categoryTabs}
                </div>

                <div id="shortcuts-content" class="space-y-4">
                    ${this.renderShortcutCategories(categories)}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Bind events
        modal.querySelector('#close-shortcuts-help').addEventListener('click', () => {
            this.hideHelpModal();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideHelpModal();
            }
        });

        // Category tabs
        modal.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const category = e.target.getAttribute('data-category');
                this.showCategory(category);
                
                // Update active tab
                modal.querySelectorAll('.category-tab').forEach(t => {
                    t.classList.remove('bg-sky-500', 'text-white', 'active');
                    t.classList.add('text-slate-600', 'dark:text-slate-400');
                });
                
                e.target.classList.add('bg-sky-500', 'text-white', 'active');
                e.target.classList.remove('text-slate-600', 'dark:text-slate-400');
            });
        });

        // Activate first tab and show its content
        const firstTab = modal.querySelector('.category-tab');
        if (firstTab) {
            firstTab.classList.add('bg-sky-500', 'text-white', 'active');
            firstTab.classList.remove('text-slate-600', 'dark:text-slate-400');
            const firstCategory = firstTab.getAttribute('data-category');
            this.showCategory(firstCategory);
        }

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    renderShortcutCategories(categories) {
        return Object.entries(categories).map(([category, shortcuts]) => `
            <div class="shortcut-category hidden" data-category="${category}">
                <div class="grid gap-3">
                    ${shortcuts.map(shortcut => `
                        <div class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-slate-200 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                                    <i data-lucide="${shortcut.icon}" class="w-4 h-4 text-slate-600 dark:text-slate-300"></i>
                                </div>
                                <span class="text-slate-800 dark:text-slate-200">${shortcut.description}</span>
                            </div>
                            <div class="keyboard-shortcut">
                                ${this.renderKeyCombo(shortcut.key)}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    renderKeyCombo(key) {
        // Handle special sequence keys like "g,g"
        if (key.includes(',')) {
            const keys = key.split(',');
            return keys.map(k => `
                <kbd class="px-2 py-1 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded shadow-sm">
                    ${this.formatKeyDisplay(k.trim())}
                </kbd>
            `).join('<span class="mx-1 text-slate-400">,</span>');
        }
        
        // Handle regular key combinations
        const keys = key.split('+');
        return keys.map(k => `
            <kbd class="px-2 py-1 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded shadow-sm">
                ${this.formatKeyDisplay(k.trim())}
            </kbd>
        `).join('<span class="mx-1 text-slate-400">+</span>');
    }

    showCategory(category) {
        const modal = document.getElementById('shortcuts-help-modal');
        if (!modal) return;

        modal.querySelectorAll('.shortcut-category').forEach(cat => {
            cat.classList.add('hidden');
        });

        const targetCategory = modal.querySelector(`[data-category="${category}"]`);
        if (targetCategory) {
            targetCategory.classList.remove('hidden');
        }
    }

    hideHelpModal() {
        const modal = document.getElementById('shortcuts-help-modal');
        if (modal && modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
        this.isHelpVisible = false;
    }

    // Utility method to get all shortcuts for tooltip integration
    getShortcutForAction(action) {
        for (let [key, shortcut] of this.shortcuts) {
            if (shortcut.description.toLowerCase().includes(action.toLowerCase())) {
                return this.formatKeyDisplay(key);
            }
        }
        return null;
    }
}

// Initialize global shortcut manager after DOM is ready
function initializeShortcuts() {
    if (!window.keyboardShortcuts) {
        window.keyboardShortcuts = new KeyboardShortcutManager();
        console.log('✓ Keyboard shortcuts initialized');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeShortcuts);
} else {
    initializeShortcuts();
}