// Filtering and Search Module
class FilterManager {
    constructor(originalData, progressManager = null) {
        this.originalData = originalData;
        this.progressManager = progressManager;
        this.currentFilter = {
            search: '',
            priority: '',
            status: '',
            category: ''
        };
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
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
    }

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
        if (this.currentFilter.status && this.progressManager) {
            const isCompleted = this.currentFilter.status === 'completed';
            filteredData = filteredData.map(section => ({
                ...section,
                items: section.items.filter(item => {
                    const itemCompleted = this.progressManager.completedItems.has(item.id);
                    return itemCompleted === isCompleted;
                })
            })).filter(section => section.items.length > 0);
        }

        // Dispatch custom event with filtered data
        document.dispatchEvent(new CustomEvent('dataFiltered', { 
            detail: { filteredData } 
        }));

        return filteredData;
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
        
        // Dispatch event with original data
        document.dispatchEvent(new CustomEvent('dataFiltered', { 
            detail: { filteredData: this.originalData } 
        }));
    }

    highlightSearchTerm(text) {
        if (!this.currentFilter.search) return text;
        
        const searchTerm = this.currentFilter.search;
        const sanitized = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${sanitized})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }

    getFilteredData() {
        return this.applyFilters();
    }
}