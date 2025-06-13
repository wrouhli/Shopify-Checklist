// Export Functionality Module
class ExportManager {
    constructor(originalData, progressManager) {
        this.originalData = originalData;
        this.progressManager = progressManager;
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('export-btn').addEventListener('click', () => {
            this.showExportMenu();
        });
    }

    showExportMenu() {
        // Close existing export modal if it exists
        const existingModal = document.querySelector('[data-modal-type="export-menu"]');
        if (existingModal) {
            existingModal.remove();
            return;
        }
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.setAttribute('data-modal-type', 'export-menu');
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
        if (typeof window.jspdf === 'undefined' && typeof jsPDF === 'undefined') {
            this.showNotification('PDF export not available', 'error');
            console.error('jsPDF library not loaded');
            return;
        }

        try {
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
            
            // Header
            doc.setFontSize(24);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(51, 51, 51);
            doc.text('Shopify QA Checklist', pageWidth / 2, yPos, { align: 'center' });
            
            yPos += 15;
            doc.setFontSize(16);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(102, 102, 102);
            doc.text('Konnectoos Agency', pageWidth / 2, yPos, { align: 'center' });
            
            yPos += 25;
            
            // Progress Summary
            const progress = this.progressManager.getCompletionPercentage();
            const totalItems = this.progressManager.getTotalItems();
            const completedItems = this.progressManager.getCompletedItems();
            const date = new Date().toLocaleDateString();
            
            doc.setFillColor(240, 240, 240);
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
            
            // Sections
            this.originalData.forEach(section => {
                if (yPos > pageHeight - 60) {
                    doc.addPage();
                    yPos = 20;
                }
                
                doc.setFontSize(16);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(51, 51, 51);
                doc.text(section.title, 20, yPos);
                yPos += 15;
                
                section.items.forEach(item => {
                    if (yPos > pageHeight - 20) {
                        doc.addPage();
                        yPos = 20;
                    }
                    
                    const isCompleted = this.progressManager.completedItems.has(item.id);
                    
                    doc.setFontSize(12);
                    doc.setFont(undefined, 'bold');
                    if (isCompleted) {
                        doc.setTextColor(34, 197, 94);
                        doc.text('✓', 25, yPos);
                    } else {
                        doc.setTextColor(156, 163, 175);
                        doc.text('☐', 25, yPos);
                    }
                    
                    doc.setFontSize(11);
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(51, 51, 51);
                    const titleLines = doc.splitTextToSize(item.title, pageWidth - 80);
                    doc.text(titleLines, 35, yPos);
                    
                    const priorityColors = {
                        high: [220, 38, 38],
                        medium: [217, 119, 6],
                        low: [22, 163, 74]
                    };
                    const priorityColor = priorityColors[item.priority];
                    doc.setTextColor(...priorityColor);
                    doc.setFontSize(9);
                    doc.setFont(undefined, 'bold');
                    doc.text(item.priority.toUpperCase(), pageWidth - 25, yPos);
                    
                    yPos += Math.max(titleLines.length * 5, 12);
                    
                    doc.setFontSize(9);
                    doc.setFont(undefined, 'normal');
                    doc.setTextColor(102, 102, 102);
                    const hintLines = doc.splitTextToSize(item.hint, pageWidth - 80);
                    doc.text(hintLines, 35, yPos);
                    
                    yPos += Math.max(hintLines.length * 4, 8);
                    
                    if (item.notes && item.notes.trim()) {
                        doc.setFontSize(8);
                        doc.setFont(undefined, 'italic');
                        doc.setTextColor(75, 85, 99);
                        const notesLines = doc.splitTextToSize(`Notes: ${escapeHTML(item.notes)}`, pageWidth - 80);
                        doc.text(notesLines, 35, yPos);
                        yPos += Math.max(notesLines.length * 3, 6);
                    }
                    
                    yPos += 3;
                });
                
                yPos += 10;
            });
            
            // Page numbers
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
            this.exportAsHTML();
        }
    }

    exportAsHTML() {
        const progress = this.progressManager.getCompletionPercentage();
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
            <p>${this.progressManager.getCompletedItems()} of ${this.progressManager.getTotalItems()} items completed</p>
            <p>Generated: ${date}</p>
        </div>
    </div>
    
    ${this.originalData.map(section => `
        <div class="section">
            <div class="section-title">${section.title}</div>
            ${section.items.map(item => `
                <div class="item ${this.progressManager.completedItems.has(item.id) ? 'completed' : ''} ${item.priority}">
                    <span class="status">${this.progressManager.completedItems.has(item.id) ? '✓' : '☐'}</span>
                    <strong>${item.title}</strong>
                    <span class="priority ${item.priority}">${item.priority.toUpperCase()}</span>
                    <br>
                    <small>${item.hint}</small>
                    ${item.notes ? `<br><em>Notes: ${escapeHTML(item.notes)}</em>` : ''}
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
                    total: this.progressManager.getTotalItems(),
                    completed: this.progressManager.getCompletedItems(),
                    percentage: this.progressManager.getCompletionPercentage()
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
                        this.progressManager.completedItems.has(item.id) ? 'Completed' : 'Pending',
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

    showNotification(message, type = 'info') {
        document.dispatchEvent(new CustomEvent('showNotification', { 
            detail: { message, type } 
        }));
    }
}