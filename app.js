// Shopify QA Checklist Application
class ShopifyQAApp {
    constructor() {
        this.data = [...checklistData];
        this.originalData = [...checklistData];
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.currentFilter = {
            search: '',
            priority: '',
            status: '',
            category: ''
        };
        this.completedItems = new Set();
        
        this.init();
    }

    init() {
        this.loadProgress();
        this.initializeTheme();
        this.bindEvents();
        this.render();
        this.updateProgress();
        
        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Event Binding
    bindEvents() {
        // Search and filters
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.currentFilter.search = e.target.value;
            this.applyFilters();
        });

        document.getElementById('priority-filter').addEventListener('change', (e) => {
            this.currentFilter.priority = e.target.value;
            this.applyFilters();
        });

        document.getElementById('status-filter').addEventListener('change', (e) => {
            this.currentFilter.status = e.target.value;
            this.applyFilters();
        });

        document.getElementById('clear-filters').addEventListener('click', () => {
            this.clearFilters();
        });

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Action buttons
        document.getElementById('export-btn').addEventListener('click', () => {
            this.showExportMenu();
        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetProgress();
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

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });

        // Auto-save on changes
        window.addEventListener('beforeunload', () => {
            this.saveProgress();
        });
    }

    // Theme Management
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

    // Data Management
    loadProgress() {
        const saved = localStorage.getItem('shopify-qa-progress');
        if (saved) {
            try {
                const progressData = JSON.parse(saved);
                this.restoreChecklistState(progressData.checklist);
                this.updateLastModified(progressData.timestamp);
            } catch (error) {
                console.error('Error loading progress:', error);
            }
        }
    }

    saveProgress() {
        const progressData = {
            checklist: this.originalData,
            timestamp: new Date().toISOString(),
            metadata: {
                totalItems: this.getTotalItems(),
                completedItems: this.getCompletedItems(),
                completionPercentage: this.getCompletionPercentage()
            }
        };
        
        localStorage.setItem('shopify-qa-progress', JSON.stringify(progressData));
    }

    restoreChecklistState(savedData) {
        this.completedItems.clear();
        savedData.forEach(savedSection => {
            const section = this.originalData.find(s => s.id === savedSection.id);
            if (section) {
                savedSection.items.forEach(savedItem => {
                    const item = section.items.find(i => i.id === savedItem.id);
                    if (item) {
                        item.completed = savedItem.completed;
                        item.notes = savedItem.notes || '';
                        if (item.completed) {
                            this.completedItems.add(item.id);
                        }
                    }
                });
            }
        });
        this.data = [...this.originalData];
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
            this.data = JSON.parse(JSON.stringify(this.originalData));
            this.completedItems.clear();
            localStorage.removeItem('shopify-qa-progress');
            this.render();
            this.updateProgress();
            this.showNotification('Progress reset successfully', 'success');
        }
    }

    // Filtering and Search
    applyFilters() {
        let filteredData = [...this.originalData];

        // Apply search filter
        if (this.currentFilter.search) {
            const searchTerm = this.currentFilter.search.toLowerCase();
            filteredData = filteredData.map(section => ({
                ...section,
                items: section.items.filter(item =>
                    item.title.toLowerCase().includes(searchTerm) ||
                    item.hint.toLowerCase().includes(searchTerm) ||
                    item.category.toLowerCase().includes(searchTerm)
                )
            })).filter(section => section.items.length > 0);
        }

        // Apply priority filter
        if (this.currentFilter.priority) {
            filteredData = filteredData.map(section => ({
                ...section,
                items: section.items.filter(item => item.priority === this.currentFilter.priority)
            })).filter(section => section.items.length > 0);
        }

        // Apply status filter
        if (this.currentFilter.status) {
            const isCompleted = this.currentFilter.status === 'completed';
            filteredData = filteredData.map(section => ({
                ...section,
                items: section.items.filter(item => item.completed === isCompleted)
            })).filter(section => section.items.length > 0);
        }

        this.data = filteredData;
        this.render();
    }

    clearFilters() {
        this.currentFilter = {
            search: '',
            priority: '',
            status: '',
            category: ''
        };
        
        document.getElementById('search-input').value = '';
        document.getElementById('priority-filter').value = '';
        document.getElementById('status-filter').value = '';
        
        this.data = [...this.originalData];
        this.render();
    }

    // Progress Calculation
    getTotalItems() {
        return this.originalData.reduce((total, section) => total + section.items.length, 0);
    }

    getCompletedItems() {
        return this.completedItems.size;
    }

    getCompletionPercentage() {
        const total = this.getTotalItems();
        const completed = this.getCompletedItems();
        return total > 0 ? Math.round((completed / total) * 100) : 0;
    }

    getSectionProgress(sectionId) {
        const section = this.originalData.find(s => s.id === sectionId);
        if (!section) return { completed: 0, total: 0, percentage: 0 };

        const completed = section.items.filter(item => this.completedItems.has(item.id)).length;
        const total = section.items.length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        return { completed, total, percentage };
    }

    updateProgress() {
        const percentage = this.getCompletionPercentage();
        const completed = this.getCompletedItems();
        const total = this.getTotalItems();

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
        const totalItems = this.getTotalItems();
        const completedItems = this.getCompletedItems();
        const pendingItems = totalItems - completedItems;
        const percentage = this.getCompletionPercentage();

        const priorityStats = this.getPriorityStats();

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

    getPriorityStats() {
        const stats = {
            high: { total: 0, completed: 0, pending: 0 },
            medium: { total: 0, completed: 0, pending: 0 },
            low: { total: 0, completed: 0, pending: 0 }
        };

        this.originalData.forEach(section => {
            section.items.forEach(item => {
                stats[item.priority].total++;
                if (this.completedItems.has(item.id)) {
                    stats[item.priority].completed++;
                } else {
                    stats[item.priority].pending++;
                }
            });
        });

        return stats;
    }

    // Item Management
    toggleItem(itemId) {
        // Find the item in original data
        let item = null;
        for (const section of this.originalData) {
            item = section.items.find(i => i.id === itemId);
            if (item) break;
        }

        if (item) {
            item.completed = !item.completed;
            
            if (item.completed) {
                this.completedItems.add(itemId);
                this.showNotification(`✓ ${item.title}`, 'success');
                this.animateItemCompletion(itemId);
            } else {
                this.completedItems.delete(itemId);
                this.showNotification(`Unchecked: ${item.title}`, 'info');
            }

            this.saveProgress();
            this.updateProgress();
            this.updateItemVisual(itemId, item.completed);
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

    addNote(itemId, note) {
        // Find the item in original data
        let item = null;
        for (const section of this.originalData) {
            item = section.items.find(i => i.id === itemId);
            if (item) break;
        }

        if (item) {
            item.notes = note;
            this.saveProgress();
        }
    }

    // Rendering
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
                this.clearFilters();
            });
            
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            return;
        }

        container.innerHTML = this.data.map(section => this.renderSection(section)).join('');
        
        // Bind item events
        this.bindItemEvents();
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    renderSection(section) {
        const progress = this.getSectionProgress(section.id);
        const colorScheme = categoryColors[section.color] || categoryColors.blue;

        return `
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden slide-in transition-colors" data-section-id="${section.id}">
                <!-- Section Header -->
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
                    
                    <!-- Progress Bar -->
                    <div class="mt-4">
                        <div class="w-full bg-white bg-opacity-50 dark:bg-slate-600 dark:bg-opacity-50 rounded-full h-2">
                            <div class="h-2 rounded-full transition-all duration-500 ${section.color === 'blue' ? 'bg-blue-500' : section.color === 'green' ? 'bg-green-500' : section.color === 'purple' ? 'bg-purple-500' : section.color === 'red' ? 'bg-red-500' : section.color === 'yellow' ? 'bg-yellow-500' : section.color === 'indigo' ? 'bg-indigo-500' : section.color === 'teal' ? 'bg-teal-500' : section.color === 'orange' ? 'bg-orange-500' : section.color === 'pink' ? 'bg-pink-500' : 'bg-emerald-500'}" style="width: ${progress.percentage}%"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Section Content -->
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
        const isCompleted = this.completedItems.has(item.id);
        const priorityColor = {
            high: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700',
            medium: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-700',
            low: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700'
        }[item.priority];

        return `
            <div class="checklist-item group p-4 border border-slate-200 dark:border-slate-600 rounded-lg hover:border-slate-300 dark:hover:border-slate-500 hover:shadow-sm transition-all ${isCompleted ? 'opacity-75' : ''}" data-item-id="${item.id}">
                <div class="flex items-start space-x-3">
                    <!-- Checkbox -->
                    <label class="flex items-center cursor-pointer">
                        <input type="checkbox" 
                               class="custom-checkbox" 
                               data-item-id="${item.id}" 
                               ${isCompleted ? 'checked' : ''}>
                    </label>
                    
                    <!-- Content -->
                    <div class="flex-1 min-w-0">
                        <div class="flex items-start justify-between">
                            <div class="flex-1">
                                <h4 class="text-sm font-medium text-slate-900 dark:text-slate-100 checklist-text ${isCompleted ? 'line-through' : ''}">${this.highlightSearchTerm(item.title)}</h4>
                                <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">${this.highlightSearchTerm(item.hint)}</p>
                            </div>
                            
                            <!-- Priority Badge -->
                            <span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${priorityColor} ml-2">
                                ${item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                            </span>
                        </div>
                        
                        <!-- Links -->
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
                        
                        <!-- Notes -->
                        <div class="mt-3">
                            <textarea 
                                placeholder="Add notes..."
                                class="w-full text-xs p-2 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-400 rounded focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none transition-colors"
                                rows="2"
                                data-notes-for="${item.id}"
                            >${item.notes || ''}</textarea>
                        </div>
                    </div>
                    
                    <!-- Actions -->
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

    highlightSearchTerm(text) {
        if (!this.currentFilter.search) return text;
        
        const searchTerm = this.currentFilter.search;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }

    bindItemEvents() {
        // Checkbox changes
        document.querySelectorAll('input[data-item-id]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const itemId = e.target.getAttribute('data-item-id');
                this.toggleItem(itemId);
            });
        });

        // Notes changes
        document.querySelectorAll('textarea[data-notes-for]').forEach(textarea => {
            textarea.addEventListener('blur', (e) => {
                const itemId = e.target.getAttribute('data-notes-for');
                const note = e.target.value;
                this.addNote(itemId, note);
            });
            
            // Auto-save as user types (with debounce)
            let timeoutId;
            textarea.addEventListener('input', (e) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    const itemId = e.target.getAttribute('data-notes-for');
                    const note = e.target.value;
                    this.addNote(itemId, note);
                }, 1000); // Save 1 second after user stops typing
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

    toggleSection(sectionId) {
        const content = document.querySelector(`.section-content[data-section="${sectionId}"]`);
        const button = document.querySelector(`.section-toggle[data-section="${sectionId}"]`);
        const icon = button.querySelector('i');
        
        if (content.style.display === 'none') {
            content.style.display = 'block';
            icon.style.transform = 'rotate(0deg)';
        } else {
            content.style.display = 'none';
            icon.style.transform = 'rotate(-90deg)';
        }
    }

    // Utility Functions
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
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remove after delay
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
        
        // Add confetti effect here if desired
        this.createConfetti();
    }

    closeCelebration() {
        document.getElementById('completion-celebration').classList.add('hidden');
    }

    createConfetti() {
        // Simple confetti effect
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

    showExportMenu() {
        // Create export menu modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md mx-4 transition-colors">
                <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Export Options</h3>
                <div class="space-y-3">
                    <button id="export-pdf" class="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center">
                        <i data-lucide="file-text" class="w-5 h-5 mr-2"></i>
                        <div class="text-left">
                            <div>Export as PDF</div>
                            <div class="text-xs opacity-75">Professional PDF document</div>
                        </div>
                    </button>
                    <button id="export-html" class="w-full px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center">
                        <i data-lucide="globe" class="w-5 h-5 mr-2"></i>
                        <div class="text-left">
                            <div>Export as HTML</div>
                            <div class="text-xs opacity-75">Web page format</div>
                        </div>
                    </button>
                    <button id="export-json" class="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center">
                        <i data-lucide="download" class="w-5 h-5 mr-2"></i>
                        <div class="text-left">
                            <div>Export Progress (JSON)</div>
                            <div class="text-xs opacity-75">Save progress data</div>
                        </div>
                    </button>
                    <button id="export-csv" class="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center">
                        <i data-lucide="table" class="w-5 h-5 mr-2"></i>
                        <div class="text-left">
                            <div>Export as CSV</div>
                            <div class="text-xs opacity-75">Spreadsheet format</div>
                        </div>
                    </button>
                </div>
                <button id="close-export" class="w-full mt-4 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    Cancel
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Bind export events
        modal.querySelector('#export-pdf').addEventListener('click', () => {
            this.exportToPDF();
            document.body.removeChild(modal);
        });
        
        modal.querySelector('#export-html').addEventListener('click', () => {
            this.exportAsHTML();
            document.body.removeChild(modal);
        });
        
        modal.querySelector('#export-json').addEventListener('click', () => {
            this.exportToJSON();
            document.body.removeChild(modal);
        });
        
        modal.querySelector('#export-csv').addEventListener('click', () => {
            this.exportToCSV();
            document.body.removeChild(modal);
        });
        
        modal.querySelector('#close-export').addEventListener('click', () => {
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

    exportToPDF() {
        // Check if jsPDF is available
        if (typeof window.jspdf === 'undefined' && typeof jsPDF === 'undefined') {
            this.showNotification('PDF export not available', 'error');
            console.error('jsPDF library not loaded');
            return;
        }

        try {
            // Try to get jsPDF from different possible locations
            let jsPDFClass;
            if (typeof window.jspdf !== 'undefined') {
                jsPDFClass = window.jspdf.jsPDF;
            } else if (typeof jsPDF !== 'undefined') {
                jsPDFClass = jsPDF;
            } else {
                throw new Error('jsPDF not found');
            }

            const doc = new jsPDFClass();
            const pageWidth = doc.internal.pageSize.width;
            const pageHeight = doc.internal.pageSize.height;
            
            let yPos = 20;
            
            // === SIMPLE HEADER (like HTML version) ===
            doc.setFontSize(24);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(51, 51, 51); // dark gray
            doc.text('Shopify QA Checklist', pageWidth / 2, yPos, { align: 'center' });
            
            yPos += 15;
            doc.setFontSize(16);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(102, 102, 102); // medium gray
            doc.text('Konnectoos Agency', pageWidth / 2, yPos, { align: 'center' });
            
            yPos += 25;
            
            // === PROGRESS SUMMARY (simple box like HTML) ===
            const progress = this.getCompletionPercentage();
            const totalItems = this.getTotalItems();
            const completedItems = this.getCompletedItems();
            const date = new Date().toLocaleDateString();
            
            // Simple gray background box
            doc.setFillColor(240, 240, 240); // light gray
            doc.rect(20, yPos, pageWidth - 40, 35, 'F');
            
            yPos += 15;
            doc.setFontSize(18);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(51, 51, 51);
            doc.text(`Progress: ${progress}% Complete`, pageWidth / 2, yPos, { align: 'center' });
            
            yPos += 10;
            doc.setFontSize(12);
            doc.setFont(undefined, 'normal');
            doc.text(`${completedItems} of ${totalItems} items completed`, pageWidth / 2, yPos, { align: 'center' });
            
            yPos += 8;
            doc.text(`Generated: ${date}`, pageWidth / 2, yPos, { align: 'center' });
            
            yPos += 30;
            
            // === SECTIONS (clean and simple like HTML) ===
            this.originalData.forEach(section => {
                // Check if we need a new page
                if (yPos > pageHeight - 60) {
                    doc.addPage();
                    yPos = 20;
                }
                
                // Section title (simple, no background)
                doc.setFontSize(16);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(51, 51, 51);
                doc.text(section.title, 20, yPos);
                yPos += 15;
                
                // Items (clean list like HTML)
                section.items.forEach(item => {
                    if (yPos > pageHeight - 20) {
                        doc.addPage();
                        yPos = 20;
                    }
                    
                    const isCompleted = this.completedItems.has(item.id);
                    
                    // Simple status indicator
                    doc.setFontSize(12);
                    doc.setFont(undefined, 'bold');
                    if (isCompleted) {
                        doc.setTextColor(34, 197, 94); // green
                        doc.text('✓', 25, yPos);
                    } else {
                        doc.setTextColor(156, 163, 175); // gray
                        doc.text('☐', 25, yPos);
                    }
                    
                    // Item title
                    doc.setFontSize(11);
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(51, 51, 51);
                    const titleLines = doc.splitTextToSize(item.title, pageWidth - 80);
                    doc.text(titleLines, 35, yPos);
                    
                    // Priority badge (simple colored text)
                    const priorityColors = {
                        high: [220, 38, 38],    // red
                        medium: [217, 119, 6],  // orange  
                        low: [22, 163, 74]      // green
                    };
                    const priorityColor = priorityColors[item.priority];
                    doc.setTextColor(...priorityColor);
                    doc.setFontSize(9);
                    doc.setFont(undefined, 'bold');
                    doc.text(item.priority.toUpperCase(), pageWidth - 25, yPos);
                    
                    yPos += Math.max(titleLines.length * 5, 12);
                    
                    // Item hint (smaller text)
                    doc.setFontSize(9);
                    doc.setFont(undefined, 'normal');
                    doc.setTextColor(102, 102, 102);
                    const hintLines = doc.splitTextToSize(item.hint, pageWidth - 80);
                    doc.text(hintLines, 35, yPos);
                    
                    yPos += Math.max(hintLines.length * 4, 8);
                    
                    // Add notes if they exist
                    if (item.notes && item.notes.trim()) {
                        doc.setFontSize(8);
                        doc.setFont(undefined, 'italic');
                        doc.setTextColor(75, 85, 99);
                        const notesLines = doc.splitTextToSize(`Notes: ${item.notes}`, pageWidth - 80);
                        doc.text(notesLines, 35, yPos);
                        yPos += Math.max(notesLines.length * 3, 6);
                    }
                    
                    yPos += 3; // small spacing between items
                });
                
                yPos += 10; // spacing between sections
            });
            
            // Add page numbers (simple)
            const totalPages = doc.internal.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(156, 163, 175);
                doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
            }
            
            doc.save('shopify-qa-checklist.pdf');
            this.showNotification('PDF exported successfully!', 'success');
            
        } catch (error) {
            console.error('PDF Export Error:', error);
            this.exportAsHTML(); // Fallback to HTML export
        }
    }

    exportAsHTML() {
        const progress = this.getCompletionPercentage();
        const date = new Date().toLocaleDateString();
        
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Shopify QA Checklist - Konnectoos Agency</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .progress { background: #f0f0f0; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 18px; font-weight: bold; margin-bottom: 15px; color: #333; }
        .item { margin: 10px 0; padding: 10px; border-left: 3px solid #ddd; }
        .item.completed { border-left-color: #22c55e; background: #f0fff4; }
        .item.high { border-left-color: #ef4444; }
        .item.medium { border-left-color: #f59e0b; }
        .item.low { border-left-color: #22c55e; }
        .status { font-weight: bold; }
        .priority { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 12px; }
        .priority.high { background: #fef2f2; color: #dc2626; }
        .priority.medium { background: #fffbeb; color: #d97706; }
        .priority.low { background: #f0fdf4; color: #16a34a; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Shopify QA Checklist</h1>
        <h2>Konnectoos Agency</h2>
        <div class="progress">
            <h3>Progress: ${progress}% Complete</h3>
            <p>${this.getCompletedItems()} of ${this.getTotalItems()} items completed</p>
            <p>Generated: ${date}</p>
        </div>
    </div>
    
    ${this.originalData.map(section => `
        <div class="section">
            <div class="section-title">${section.title}</div>
            ${section.items.map(item => `
                <div class="item ${this.completedItems.has(item.id) ? 'completed' : ''} ${item.priority}">
                    <span class="status">${this.completedItems.has(item.id) ? '✓' : '☐'}</span>
                    <strong>${item.title}</strong>
                    <span class="priority ${item.priority}">${item.priority.toUpperCase()}</span>
                    <br>
                    <small>${item.hint}</small>
                    ${item.notes ? `<br><em>Notes: ${item.notes}</em>` : ''}
                </div>
            `).join('')}
        </div>
    `).join('')}
</body>
</html>`;

        this.downloadFile(htmlContent, 'shopify-qa-checklist.html', 'text/html');
        this.showNotification('Exported as HTML successfully', 'success');
    }

    exportToJSON() {
        try {
            const data = {
                checklist: this.originalData,
                exported: new Date().toISOString(),
                agency: 'Konnectoos',
                project: prompt('Project Name:') || 'Shopify Store QA',
                progress: {
                    total: this.getTotalItems(),
                    completed: this.getCompletedItems(),
                    percentage: this.getCompletionPercentage()
                }
            };
            
            this.downloadJSON(data, 'shopify-qa-progress.json');
            this.showNotification('Progress exported successfully', 'success');
        } catch (error) {
            console.error('JSON Export Error:', error);
            this.showNotification('Export failed. Please try again.', 'error');
        }
    }

    exportToCSV() {
        try {
            const csvData = [];
            csvData.push(['Section', 'Item', 'Priority', 'Status', 'Notes']);
            
            this.originalData.forEach(section => {
                section.items.forEach(item => {
                    csvData.push([
                        section.title,
                        item.title,
                        item.priority,
                        this.completedItems.has(item.id) ? 'Completed' : 'Pending',
                        item.notes || ''
                    ]);
                });
            });
            
            const csv = csvData.map(row => 
                row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
            ).join('\n');
            
            this.downloadFile(csv, 'shopify-qa-checklist.csv', 'text/csv');
            this.showNotification('CSV exported successfully', 'success');
        } catch (error) {
            console.error('CSV Export Error:', error);
            this.showNotification('Export failed. Please try again.', 'error');
        }
    }

    downloadJSON(data, filename) {
        const json = JSON.stringify(data, null, 2);
        this.downloadFile(json, filename, 'application/json');
    }

    downloadFile(content, filename, mimeType) {
        try {
            const blob = new Blob([content], { type: mimeType });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download Error:', error);
            // Fallback: try to open content in new window
            const newWindow = window.open();
            if (newWindow) {
                newWindow.document.write(content);
                newWindow.document.title = filename;
                this.showNotification('File opened in new window. Please save manually.', 'info');
            } else {
                this.showNotification('Download failed. Please check browser settings.', 'error');
            }
        }
    }

    exportFinalReport() {
        this.exportToPDF();
        this.closeCelebration();
    }

    toggleFABMenu() {
        const menu = document.getElementById('fab-menu');
        menu.classList.toggle('hidden');
    }

    markCurrentSectionComplete() {
        // Find the first incomplete section
        for (const section of this.originalData) {
            const incompleteItems = section.items.filter(item => !this.completedItems.has(item.id));
            if (incompleteItems.length > 0) {
                if (confirm(`Mark all ${incompleteItems.length} remaining items in "${section.title}" as complete?`)) {
                    incompleteItems.forEach(item => {
                        item.completed = true;
                        this.completedItems.add(item.id);
                    });
                    this.saveProgress();
                    this.render();
                    this.showNotification(`Section "${section.title}" completed!`, 'success');
                }
                break;
            }
        }
    }

    handleKeyboard(e) {
        // Ctrl/Cmd + S to save
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            this.saveProgress();
            this.showNotification('Progress saved', 'success');
        }
        
        // Ctrl/Cmd + E to export
        if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
            e.preventDefault();
            this.showExportMenu();
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            const celebration = document.getElementById('completion-celebration');
            if (!celebration.classList.contains('hidden')) {
                this.closeCelebration();
            }
        }
    }

    updateLastModified(timestamp) {
        const date = new Date(timestamp);
        const footer = document.querySelector('footer') || document.createElement('footer');
        footer.innerHTML = `
            <div class="text-center text-sm text-slate-500 py-4">
                Last updated: ${date.toLocaleString()}
            </div>
        `;
        if (!document.querySelector('footer')) {
            document.body.appendChild(footer);
        }
    }

    showItemDetails(itemId) {
        // Find the item
        let item = null;
        for (const section of this.originalData) {
            item = section.items.find(i => i.id === itemId);
            if (item) break;
        }

        if (!item) return;

        // Create detail modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-bold text-slate-800 pr-4">${item.title}</h3>
                    <button id="close-details" class="text-slate-400 hover:text-slate-600">
                        <i data-lucide="x" class="w-6 h-6"></i>
                    </button>
                </div>
                
                <div class="space-y-4">
                    <div>
                        <h4 class="font-medium text-slate-700 mb-2">Hint</h4>
                        <p class="text-slate-600">${item.hint}</p>
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
}

// Add confetti animation CSS
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confetti-fall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Initialize the application when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.shopifyQAApp = new ShopifyQAApp();
});