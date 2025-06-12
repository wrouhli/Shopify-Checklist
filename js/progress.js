// Progress Management Module
class ProgressManager {
    constructor(originalData) {
        this.originalData = originalData;
        this.completedItems = new Set();
    }

    init() {
        this.loadProgress();
    }

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
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
            this.completedItems.clear();
            this.originalData.forEach(section => {
                section.items.forEach(item => {
                    item.completed = false;
                    item.notes = '';
                });
            });
            localStorage.removeItem('shopify-qa-progress');
            return true;
        }
        return false;
    }

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

    toggleItem(itemId, showNotification) {
        let item = null;
        for (const section of this.originalData) {
            item = section.items.find(i => i.id === itemId);
            if (item) break;
        }

        if (item) {
            item.completed = !item.completed;
            
            if (item.completed) {
                this.completedItems.add(itemId);
                showNotification(`✓ ${item.title}`, 'success');
            } else {
                this.completedItems.delete(itemId);
                showNotification(`Unchecked: ${item.title}`, 'info');
            }

            this.saveProgress();
            return item.completed;
        }
        return false;
    }

    addNote(itemId, note) {
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
}