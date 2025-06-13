// UI Management Module
class UIManager {
    constructor(originalData, progressManager, filterManager) {
        this.originalData = originalData;
        this.progressManager = progressManager;
        this.filterManager = filterManager;
        this.data = [...originalData];
        this.shortcutsEnabled = localStorage.getItem('keyboardShortcuts') !== 'false';
        this.currentItemIndex = -1;
        this.items = [];
    }

    init() {
        this.bindEvents();
        this.bindKeyboardEvents();
        
        // Defer shortcuts button update to allow DOM to be ready
        setTimeout(() => {
            this.updateShortcutsButton();
        }, 100);
        
        this.render();
    }

    bindEvents() {
        // Listen for filtered data events
        document.addEventListener('dataFiltered', (e) => {
            this.data = e.detail.filteredData;
            this.render();
        });

        // Reset button
        document.getElementById('reset-btn').addEventListener('click', () => {
            if (this.progressManager.resetProgress()) {
                this.render();
                this.updateProgress();
                this.showNotification('Progress reset successfully', 'success');
            }
        });

        // FAB buttons
        document.getElementById('fab-main').addEventListener('click', () => {
            this.toggleFABMenu();
        });

        document.getElementById('scroll-to-top').addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        document.getElementById('mark-section-complete').addEventListener('click', () => {
            this.markCurrentSectionComplete();
        });

        // Completion celebration
        document.getElementById('close-celebration').addEventListener('click', () => {
            this.closeCelebration();
        });

        document.getElementById('export-final').addEventListener('click', () => {
            this.exportFinalReport();
        });

        // Shortcuts toggle - defer to ensure DOM is ready
        setTimeout(() => {
            const shortcutsToggle = document.getElementById('shortcuts-toggle');
            if (shortcutsToggle) {
                shortcutsToggle.addEventListener('click', () => {
                    this.toggleShortcuts();
                });
            }
        }, 100);

        // Auto-save on changes
        window.addEventListener('beforeunload', () => {
            this.progressManager.saveProgress();
        });

        // Notification system
        document.addEventListener('showNotification', (e) => {
            this.showNotification(e.detail.message, e.detail.type);
        });
    }

    render() {
        this.renderChecklist();
        this.updateProgress();
    }

    renderChecklist() {
        const container = document.getElementById('checklist-container');
        
        if (this.data.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i data-lucide="search" class="w-8 h-8 text-slate-400"></i>
                    </div>
                    <h3 class="text-lg font-medium text-slate-900 mb-2">No items found</h3>
                    <p class="text-slate-500">Try adjusting your search or filters</p>
                    <button id="clear-search" class="mt-4 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                        Clear Filters
                    </button>
                </div>
            `;
            
            document.getElementById('clear-search')?.addEventListener('click', () => {
                this.filterManager.clearFilters();
            });
            
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            return;
        }

        container.innerHTML = this.data.map(section => this.renderSection(section)).join('');
        
        this.bindItemEvents();
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    renderSection(section) {
        const progress = this.progressManager.getSectionProgress(section.id);
        const colorScheme = window.categoryColors[section.color] || window.categoryColors.blue;

        return `
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden slide-in transition-colors" data-section-id="${section.id}">
                <div class="p-6 ${colorScheme.bg} dark:bg-slate-700 ${colorScheme.border} dark:border-slate-600 border-b transition-colors">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 ${colorScheme.bg} dark:bg-slate-600 rounded-lg flex items-center justify-center border ${colorScheme.border} dark:border-slate-500">
                                <i data-lucide="${section.icon}" class="w-5 h-5 ${colorScheme.icon} dark:text-slate-300"></i>
                            </div>
                            <div>
                                <h2 class="text-xl font-semibold ${colorScheme.text} dark:text-slate-100">${section.title}</h2>
                                <p class="text-sm text-slate-600 dark:text-slate-300">${section.description}</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-4">
                            <div class="text-right">
                                <div class="text-sm font-medium ${colorScheme.text} dark:text-slate-200">${progress.percentage}%</div>
                                <div class="text-xs text-slate-500 dark:text-slate-400">${progress.completed}/${progress.total}</div>
                            </div>
                            <button class="section-toggle p-2 hover:bg-white hover:bg-opacity-20 dark:hover:bg-slate-600 dark:hover:bg-opacity-50 rounded-lg transition-colors" data-section="${section.id}">
                                <i data-lucide="chevron-down" class="w-5 h-5 ${colorScheme.icon} dark:text-slate-300 transition-transform"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="mt-4">
                        <div class="w-full bg-white bg-opacity-50 dark:bg-slate-600 dark:bg-opacity-50 rounded-full h-2">
                            <div class="h-2 rounded-full transition-all duration-500 ${section.color === 'blue' ? 'bg-blue-500' : section.color === 'green' ? 'bg-green-500' : section.color === 'purple' ? 'bg-purple-500' : section.color === 'red' ? 'bg-red-500' : section.color === 'yellow' ? 'bg-yellow-500' : section.color === 'indigo' ? 'bg-indigo-500' : section.color === 'teal' ? 'bg-teal-500' : section.color === 'orange' ? 'bg-orange-500' : section.color === 'pink' ? 'bg-pink-500' : 'bg-emerald-500'}" style="width: ${progress.percentage}%"></div>
                        </div>
                    </div>
                </div>
                
                <div class="section-content" data-section="${section.id}">
                    <div class="p-6 dark:bg-slate-800 transition-colors">
                        ${this.renderItems(section.items)}
                    </div>
                </div>
            </div>
        `;
    }

    renderItems(items) {
        const groupedItems = this.groupItemsByCategory(items);
        
        return Object.entries(groupedItems).map(([category, categoryItems]) => `
            <div class="mb-6 last:mb-0">
                <h3 class="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 flex items-center">
                    <i data-lucide="folder" class="w-4 h-4 mr-2 text-slate-500 dark:text-slate-400"></i>
                    ${category}
                </h3>
                <div class="space-y-3">
                    ${categoryItems.map(item => this.renderItem(item)).join('')}
                </div>
            </div>
        `).join('');
    }

    groupItemsByCategory(items) {
        return items.reduce((groups, item) => {
            const category = item.category || 'General';
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(item);
            return groups;
        }, {});
    }

    renderItem(item) {
        const isCompleted = this.progressManager.completedItems.has(item.id);
        const priorityColor = {
            high: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700',
            medium: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-700',
            low: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700'
        }[item.priority];

        return `
            <div class="checklist-item group p-4 border border-slate-200 dark:border-slate-600 rounded-lg hover:border-slate-300 dark:hover:border-slate-500 hover:shadow-sm transition-all ${isCompleted ? 'opacity-75' : ''}" data-item-id="${item.id}">
                <div class="flex items-start space-x-3">
                    <label class="flex items-center cursor-pointer">
                        <input type="checkbox" 
                               class="custom-checkbox" 
                               data-item-id="${item.id}" 
                               ${isCompleted ? 'checked' : ''}>
                    </label>
                    
                    <div class="flex-1 min-w-0">
                        <div class="flex items-start justify-between">
                            <div class="flex-1">
                                <h4 class="text-sm font-medium text-slate-900 dark:text-slate-100 checklist-text ${isCompleted ? 'line-through' : ''}">${this.filterManager.highlightSearchTerm(item.title)}</h4>
                                <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">${this.filterManager.highlightSearchTerm(item.hint)}</p>
                            </div>
                            
                            <span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${priorityColor} ml-2">
                                ${item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                            </span>
                        </div>
                        
                        ${item.links && item.links.length > 0 ? `
                            <div class="flex flex-wrap gap-2 mt-2">
                                ${item.links.map(link => `
                                    <a href="${link.url}" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       class="inline-flex items-center text-xs text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 transition-colors">
                                        <i data-lucide="external-link" class="w-3 h-3 mr-1"></i>
                                        ${link.text}
                                    </a>
                                `).join('')}
                            </div>
                        ` : ''}
                        
                        <div class="mt-3">
                            <textarea 
                                placeholder="Add notes..."
                                class="w-full text-xs p-2 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-400 rounded focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none transition-colors"
                                rows="2"
                                data-notes-for="${item.id}"
                            >${item.notes || ''}</textarea>
                        </div>
                    </div>
                    
                    <div class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="info-btn p-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors tooltip" data-item-id="${item.id}">
                            <i data-lucide="info" class="w-4 h-4"></i>
                            <div class="tooltip-content">View Details</div>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    bindItemEvents() {
        // Checkbox changes
        document.querySelectorAll('input[data-item-id]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const itemId = e.target.getAttribute('data-item-id');
                const completed = this.progressManager.toggleItem(itemId, (msg, type) => this.showNotification(msg, type));
                this.updateItemVisual(itemId, completed);
                this.updateProgress();
                if (completed) {
                    this.animateItemCompletion(itemId);
                }
            });
        });

        // Notes changes
        document.querySelectorAll('textarea[data-notes-for]').forEach(textarea => {
            textarea.addEventListener('blur', (e) => {
                const itemId = e.target.getAttribute('data-notes-for');
                const note = e.target.value;
                this.progressManager.addNote(itemId, note);
            });
            
            let timeoutId;
            textarea.addEventListener('input', (e) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    const itemId = e.target.getAttribute('data-notes-for');
                    const note = e.target.value;
                    this.progressManager.addNote(itemId, note);
                }, 1000);
            });
        });

        // Section toggles
        document.querySelectorAll('.section-toggle').forEach(button => {
            button.addEventListener('click', (e) => {
                const sectionId = e.target.closest('button').getAttribute('data-section');
                this.toggleSection(sectionId);
            });
        });

        // Info buttons
        document.querySelectorAll('.info-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = e.target.closest('button').getAttribute('data-item-id');
                this.showItemDetails(itemId);
            });
        });
    }

    updateProgress() {
        const percentage = this.progressManager.getCompletionPercentage();
        const completed = this.progressManager.getCompletedItems();
        const total = this.progressManager.getTotalItems();

        // Update progress ring
        const progressRing = document.getElementById('progress-ring');
        const circumference = 2 * Math.PI * 15.9155;
        const offset = circumference - (percentage / 100) * circumference;
        progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
        progressRing.style.strokeDashoffset = offset;

        // Update progress text
        document.getElementById('progress-percentage').textContent = `${percentage}%`;
        document.getElementById('progress-text').textContent = `${completed} of ${total} complete`;

        // Check for completion
        if (percentage === 100 && completed > 0) {
            this.showCompletionCelebration();
        }

        // Update summary cards
        this.updateSummaryCards();
    }

    updateSummaryCards() {
        const summaryContainer = document.getElementById('summary-cards');
        const totalItems = this.progressManager.getTotalItems();
        const completedItems = this.progressManager.getCompletedItems();
        const pendingItems = totalItems - completedItems;
        const percentage = this.progressManager.getCompletionPercentage();

        const priorityStats = this.progressManager.getPriorityStats();

        summaryContainer.innerHTML = `
            <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-slate-600 dark:text-slate-400">Total Progress</p>
                        <p class="text-2xl font-bold text-slate-900 dark:text-slate-100">${percentage}%</p>
                        <p class="text-xs text-slate-500 dark:text-slate-400">${completedItems}/${totalItems} items</p>
                    </div>
                    <div class="w-12 h-12 bg-sky-100 dark:bg-sky-900 rounded-lg flex items-center justify-center">
                        <i data-lucide="target" class="w-6 h-6 text-sky-600 dark:text-sky-400"></i>
                    </div>
                </div>
            </div>
            
            <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-slate-600 dark:text-slate-400">Completed</p>
                        <p class="text-2xl font-bold text-green-600 dark:text-green-400">${completedItems}</p>
                        <p class="text-xs text-slate-500 dark:text-slate-400">Items finished</p>
                    </div>
                    <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <i data-lucide="check-circle" class="w-6 h-6 text-green-600 dark:text-green-400"></i>
                    </div>
                </div>
            </div>
            
            <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-slate-600 dark:text-slate-400">Remaining</p>
                        <p class="text-2xl font-bold text-amber-600 dark:text-amber-400">${pendingItems}</p>
                        <p class="text-xs text-slate-500 dark:text-slate-400">Items pending</p>
                    </div>
                    <div class="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center">
                        <i data-lucide="clock" class="w-6 h-6 text-amber-600 dark:text-amber-400"></i>
                    </div>
                </div>
            </div>
            
            <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-slate-600 dark:text-slate-400">High Priority</p>
                        <p class="text-2xl font-bold text-red-600 dark:text-red-400">${priorityStats.high.pending}</p>
                        <p class="text-xs text-slate-500 dark:text-slate-400">${priorityStats.high.completed}/${priorityStats.high.total} done</p>
                    </div>
                    <div class="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                        <i data-lucide="alert-triangle" class="w-6 h-6 text-red-600 dark:text-red-400"></i>
                    </div>
                </div>
            </div>
        `;

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    updateItemVisual(itemId, completed) {
        const checkbox = document.querySelector(`input[data-item-id="${itemId}"]`);
        const itemElement = checkbox?.closest('.checklist-item');
        
        if (checkbox && itemElement) {
            checkbox.checked = completed;
            
            if (completed) {
                itemElement.classList.add('opacity-75');
                itemElement.querySelector('.checklist-text').classList.add('line-through');
            } else {
                itemElement.classList.remove('opacity-75');
                itemElement.querySelector('.checklist-text').classList.remove('line-through');
            }
        }
    }

    animateItemCompletion(itemId) {
        const itemElement = document.querySelector(`input[data-item-id="${itemId}"]`)?.closest('.checklist-item');
        if (itemElement) {
            itemElement.classList.add('celebration');
            setTimeout(() => {
                itemElement.classList.remove('celebration');
            }, 600);
        }
    }

    toggleSection(sectionId) {
        const content = document.querySelector(`.section-content[data-section="${sectionId}"]`);
        const button = document.querySelector(`.section-toggle[data-section="${sectionId}"]`);
        const icon = button.querySelector('i');
        
        if (content && button && icon) {
            const isHidden = content.style.display === 'none' || window.getComputedStyle(content).display === 'none';
            
            if (isHidden) {
                content.style.display = 'block';
                icon.style.transform = 'rotate(0deg)';
            } else {
                content.style.display = 'none';
                icon.style.transform = 'rotate(-90deg)';
            }
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all transform translate-x-full ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 
            type === 'warning' ? 'bg-yellow-500' : 
            'bg-blue-500'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    showCompletionCelebration() {
        const celebration = document.getElementById('completion-celebration');
        celebration.classList.remove('hidden');
        this.createConfetti();
    }

    closeCelebration() {
        document.getElementById('completion-celebration').classList.add('hidden');
    }

    createConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}vw;
                width: 10px;
                height: 10px;
                background: ${['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][Math.floor(Math.random() * 5)]};
                pointer-events: none;
                border-radius: 50%;
                z-index: 9999;
                animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                document.body.removeChild(confetti);
            }, 5000);
        }
    }

    toggleFABMenu() {
        const menu = document.getElementById('fab-menu');
        menu.classList.toggle('hidden');
    }

    markCurrentSectionComplete() {
        for (const section of this.originalData) {
            const incompleteItems = section.items.filter(item => !this.progressManager.completedItems.has(item.id));
            if (incompleteItems.length > 0) {
                if (confirm(`Mark all ${incompleteItems.length} remaining items in "${section.title}" as complete?`)) {
                    incompleteItems.forEach(item => {
                        item.completed = true;
                        this.progressManager.completedItems.add(item.id);
                    });
                    this.progressManager.saveProgress();
                    this.render();
                    this.showNotification(`Section "${section.title}" completed!`, 'success');
                }
                break;
            }
        }
    }

    bindKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            // Handle shortcuts toggle (always works)
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                this.toggleShortcuts();
                return;
            }
            
            // Handle Escape key even when typing in inputs
            if (e.key === 'Escape' && this.shortcutsEnabled) {
                this.handleEscape();
                return;
            }
            
            if (this.shortcutsEnabled && this.shouldHandleShortcut(e)) {
                this.handleKeyboardShortcut(e);
            }
        });

        // Update items list when rendered
        document.addEventListener('dataFiltered', () => {
            this.updateItemsList();
        });

        // Add specific Escape handler for search input - defer to ensure DOM is ready
        setTimeout(() => {
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        e.preventDefault();
                        if (searchInput.value) {
                            searchInput.value = '';
                            this.filterManager.clearFilters();
                        }
                        searchInput.blur();
                    }
                });
            }
        }, 100);
    }

    shouldHandleShortcut(e) {
        const activeElement = document.activeElement;
        const tagName = activeElement.tagName.toLowerCase();
        
        // Don't trigger when user is typing
        if (tagName === 'input' || 
            tagName === 'textarea' || 
            activeElement.contentEditable === 'true' ||
            activeElement.isContentEditable) {
            return false;
        }
        
        // Don't trigger with modifier keys (except our toggle)
        if (e.ctrlKey || e.metaKey || e.altKey) {
            return false;
        }
        
        return true;
    }

    handleKeyboardShortcut(e) {
        const key = e.key.toLowerCase();
        
        switch(key) {
            case '?': 
                e.preventDefault();
                this.showKeyboardHelp(); 
                break;
            case 'escape':
                this.handleEscape();
                break;
            case '/':
                e.preventDefault();
                this.focusSearch();
                break;
            case 'j':
                e.preventDefault();
                this.navigateNext();
                break;
            case 'k':
                e.preventDefault();
                this.navigatePrevious();
                break;
            case ' ':
                if (this.currentItemIndex >= 0) {
                    e.preventDefault();
                    this.toggleCurrentItem();
                }
                break;
            case 'enter':
            case 'i':
                if (this.currentItemIndex >= 0) {
                    e.preventDefault();
                    this.openCurrentItemDetails();
                }
                break;
            case 't':
                e.preventDefault();
                this.toggleCurrentSection();
                break;
            case 'e':
                if (this.currentItemIndex >= 0) {
                    e.preventDefault();
                    this.editCurrentNotes();
                }
                break;
            case 's':
                e.preventDefault();
                this.progressManager.saveProgress();
                this.showNotification('Progress saved manually', 'success');
                break;
            case 'r':
                e.preventDefault();
                this.filterManager.clearFilters();
                break;
            case 'x':
                e.preventDefault();
                document.getElementById('export-btn').click();
                break;
            case 'm':
                e.preventDefault();
                document.getElementById('theme-toggle').click();
                break;
            case 'g':
                e.preventDefault();
                this.scrollToTop();
                break;
            case 'home':
                e.preventDefault();
                this.scrollToTop();
                break;
            case '1': case '2': case '3': case '4': case '5':
            case '6': case '7': case '8': case '9':
                e.preventDefault();
                this.jumpToSection(parseInt(key) - 1);
                break;
        }
    }

    toggleShortcuts() {
        this.shortcutsEnabled = !this.shortcutsEnabled;
        localStorage.setItem('keyboardShortcuts', this.shortcutsEnabled);
        this.updateShortcutsButton();
        
        if (!this.shortcutsEnabled) {
            this.clearCurrentHighlight();
        }
        
        this.showNotification(
            `Keyboard shortcuts ${this.shortcutsEnabled ? 'enabled' : 'disabled'}`, 
            'info'
        );
    }

    updateShortcutsButton() {
        const button = document.getElementById('shortcuts-toggle');
        if (!button) {
            console.warn('Shortcuts toggle button not found - skipping update');
            return;
        }
        
        const icon = button.querySelector('i');
        if (!icon) {
            console.warn('Shortcuts toggle icon not found - skipping update');
            return;
        }
        
        if (this.shortcutsEnabled) {
            button.classList.add('bg-sky-100', 'dark:bg-sky-900');
            icon.classList.add('text-sky-600', 'dark:text-sky-400');
        } else {
            button.classList.remove('bg-sky-100', 'dark:bg-sky-900');
            icon.classList.remove('text-sky-600', 'dark:text-sky-400');
        }
    }

    updateItemsList() {
        this.items = Array.from(document.querySelectorAll('.checklist-item'));
        this.currentItemIndex = -1;
    }

    navigateNext() {
        if (this.items.length === 0) this.updateItemsList();
        if (this.currentItemIndex < this.items.length - 1) {
            this.currentItemIndex++;
            this.highlightCurrentItem();
        }
    }

    navigatePrevious() {
        if (this.items.length === 0) this.updateItemsList();
        if (this.currentItemIndex > 0) {
            this.currentItemIndex--;
            this.highlightCurrentItem();
        } else if (this.currentItemIndex === -1 && this.items.length > 0) {
            this.currentItemIndex = 0;
            this.highlightCurrentItem();
        }
    }

    highlightCurrentItem() {
        this.clearCurrentHighlight();
        
        if (this.items[this.currentItemIndex]) {
            this.items[this.currentItemIndex].classList.add('keyboard-active');
            this.items[this.currentItemIndex].scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }

    clearCurrentHighlight() {
        document.querySelectorAll('.keyboard-active').forEach(el => {
            el.classList.remove('keyboard-active');
        });
    }

    focusSearch() {
        const searchInput = document.getElementById('search-input');
        searchInput.focus();
        searchInput.select();
    }

    handleEscape() {
        // Close any modal with close button (item details, keyboard help, etc.)
        const modals = document.querySelectorAll('.fixed.inset-0.bg-black.bg-opacity-50');
        if (modals.length > 0) {
            // Remove the most recent modal
            const latestModal = modals[modals.length - 1];
            latestModal.remove();
            return;
        }
        
        // Close celebration modal
        const celebration = document.getElementById('completion-celebration');
        if (!celebration.classList.contains('hidden')) {
            this.closeCelebration();
            return;
        }
        
        // Handle search input focus and content
        const searchInput = document.getElementById('search-input');
        if (document.activeElement === searchInput) {
            // If search is focused, blur it and clear if it has content
            if (searchInput.value) {
                searchInput.value = '';
                this.filterManager.clearFilters();
            }
            searchInput.blur();
            return;
        }
        
        // Clear search if it has content but not focused
        if (searchInput.value) {
            searchInput.value = '';
            this.filterManager.clearFilters();
            return;
        }
        
        // Clear current selection
        this.clearCurrentHighlight();
        this.currentItemIndex = -1;
    }

    toggleCurrentItem() {
        if (this.items[this.currentItemIndex]) {
            const checkbox = this.items[this.currentItemIndex].querySelector('.custom-checkbox');
            if (checkbox) {
                checkbox.click();
            }
        }
    }

    openCurrentItemDetails() {
        if (this.items[this.currentItemIndex]) {
            const infoBtn = this.items[this.currentItemIndex].querySelector('.info-btn');
            if (infoBtn) {
                infoBtn.click();
            }
        }
    }

    toggleCurrentSection() {
        if (this.items[this.currentItemIndex]) {
            const section = this.items[this.currentItemIndex].closest('[data-section-id]');
            if (section) {
                const toggle = section.querySelector('.section-toggle');
                if (toggle) {
                    toggle.click();
                }
            }
        }
    }

    editCurrentNotes() {
        if (this.items[this.currentItemIndex]) {
            const textarea = this.items[this.currentItemIndex].querySelector('textarea');
            if (textarea) {
                textarea.focus();
            }
        }
    }

    jumpToSection(index) {
        const sections = document.querySelectorAll('[data-section-id]');
        if (sections[index]) {
            sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Clear current selection when going to top
        this.clearCurrentHighlight();
        this.currentItemIndex = -1;
    }

    showKeyboardHelp() {
        // Close existing help modal if it exists
        const existingModal = document.querySelector('[data-modal-type="keyboard-help"]');
        if (existingModal) {
            existingModal.remove();
            return;
        }
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.setAttribute('data-modal-type', 'keyboard-help');
        modal.innerHTML = `
            <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100">Keyboard Shortcuts</h3>
                    <button id="close-help" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                        <i data-lucide="x" class="w-6 h-6"></i>
                    </button>
                </div>
                
                <div class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div class="flex justify-between"><span><kbd>?</kbd></span><span>Show this help</span></div>
                        <div class="flex justify-between"><span><kbd>Esc</kbd></span><span>Cancel/Close</span></div>
                        <div class="flex justify-between"><span><kbd>/</kbd></span><span>Focus search</span></div>
                        <div class="flex justify-between"><span><kbd>j</kbd></span><span>Next item</span></div>
                        <div class="flex justify-between"><span><kbd>k</kbd></span><span>Previous item</span></div>
                        <div class="flex justify-between"><span><kbd>Space</kbd></span><span>Toggle item</span></div>
                        <div class="flex justify-between"><span><kbd>Enter</kbd> or <kbd>i</kbd></span><span>Open item details</span></div>
                        <div class="flex justify-between"><span><kbd>t</kbd></span><span>Toggle section</span></div>
                        <div class="flex justify-between"><span><kbd>e</kbd></span><span>Edit notes</span></div>
                        <div class="flex justify-between"><span><kbd>s</kbd></span><span>Save progress</span></div>
                        <div class="flex justify-between"><span><kbd>r</kbd></span><span>Reset filters</span></div>
                        <div class="flex justify-between"><span><kbd>x</kbd></span><span>Export</span></div>
                        <div class="flex justify-between"><span><kbd>m</kbd></span><span>Toggle theme</span></div>
                        <div class="flex justify-between"><span><kbd>g</kbd> or <kbd>Home</kbd></span><span>Go to top</span></div>
                        <div class="flex justify-between"><span><kbd>1-9</kbd></span><span>Jump to section</span></div>
                        <div class="flex justify-between"><span><kbd>Ctrl+K</kbd></span><span>Toggle shortcuts</span></div>
                    </div>
                </div>
                
                <div class="mt-6 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <p class="text-xs text-slate-600 dark:text-slate-400">
                        💡 Shortcuts are disabled when typing in text fields. 
                        Use the keyboard icon in the header or Ctrl+K to toggle shortcuts on/off.
                    </p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('#close-help').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    handleKeyboard() {
        // Legacy method - now handled by bindKeyboardEvents
        // Kept for backward compatibility if needed
    }

    showItemDetails(itemId) {
        // Check if modal for the same item is already open (toggle behavior)
        const existingModal = document.querySelector('[data-modal-type="item-details"]');
        if (existingModal) {
            const existingItemId = existingModal.getAttribute('data-item-id');
            if (existingItemId === itemId) {
                // Same item - close modal (toggle off)
                existingModal.remove();
                return;
            } else {
                // Different item - replace modal
                existingModal.remove();
            }
        }
        
        let item = null;
        for (const section of this.originalData) {
            item = section.items.find(i => i.id === itemId);
            if (item) break;
        }

        if (!item) return;

        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.setAttribute('data-modal-type', 'item-details');
        modal.setAttribute('data-item-id', itemId);
        modal.innerHTML = `
            <div class="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-bold text-slate-800 pr-4">${escapeHTML(item.title)}</h3>
                    <button id="close-details" class="text-slate-400 hover:text-slate-600">
                        <i data-lucide="x" class="w-6 h-6"></i>
                    </button>
                </div>
                
                <div class="space-y-4">
                    <div>
                        <h4 class="font-medium text-slate-700 mb-2">Hint</h4>
                        <p class="text-slate-600">${escapeHTML(item.hint)}</p>
                    </div>
                    
                    ${item.links && item.links.length > 0 ? `
                        <div>
                            <h4 class="font-medium text-slate-700 mb-2">Helpful Links</h4>
                            <div class="space-y-2">
                                ${item.links.map(link => `
                                    <a href="${link.url}" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       class="flex items-center text-sky-600 hover:text-sky-800 transition-colors">
                                        <i data-lucide="external-link" class="w-4 h-4 mr-2"></i>
                                        ${link.text}
                                        <span class="ml-2 text-xs bg-slate-100 px-2 py-1 rounded">${link.type}</span>
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <div>
                        <h4 class="font-medium text-slate-700 mb-2">Priority</h4>
                        <span class="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
                            item.priority === 'high' ? 'text-red-600 bg-red-50 border border-red-200' :
                            item.priority === 'medium' ? 'text-yellow-600 bg-yellow-50 border border-yellow-200' :
                            'text-green-600 bg-green-50 border border-green-200'
                        }">
                            ${item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                        </span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('#close-details').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    exportFinalReport() {
        document.getElementById('export-btn').click();
        this.closeCelebration();
    }
}