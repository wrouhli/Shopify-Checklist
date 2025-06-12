// Animation and Visual Effects Module
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.addConfettiStyles();
    }

    addConfettiStyles() {
        // Add confetti animation CSS if not already present
        if (!document.getElementById('confetti-styles')) {
            const confettiStyle = document.createElement('style');
            confettiStyle.id = 'confetti-styles';
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
        }
    }

    // Slide in animation for elements
    slideIn(element, delay = 0) {
        if (element) {
            setTimeout(() => {
                element.classList.add('slide-in');
            }, delay);
        }
    }

    // Celebration animation for completed items
    celebrate(element) {
        if (element) {
            element.classList.add('celebration');
            setTimeout(() => {
                element.classList.remove('celebration');
            }, 600);
        }
    }

    // Smooth scroll to element
    scrollToElement(selector, offset = 0) {
        const element = document.querySelector(selector);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
    }

    // Fade in animation
    fadeIn(element, duration = 300) {
        if (element) {
            element.style.opacity = '0';
            element.style.transition = `opacity ${duration}ms ease-in-out`;
            
            requestAnimationFrame(() => {
                element.style.opacity = '1';
            });
        }
    }

    // Fade out animation
    fadeOut(element, duration = 300) {
        return new Promise((resolve) => {
            if (element) {
                element.style.transition = `opacity ${duration}ms ease-in-out`;
                element.style.opacity = '0';
                
                setTimeout(() => {
                    resolve();
                }, duration);
            } else {
                resolve();
            }
        });
    }

    // Pulse animation for notifications
    pulse(element, duration = 600) {
        if (element) {
            element.style.animation = `pulse ${duration}ms ease-in-out`;
            setTimeout(() => {
                element.style.animation = '';
            }, duration);
        }
    }

    // Scale animation
    scale(element, scale = 1.05, duration = 200) {
        if (element) {
            element.style.transition = `transform ${duration}ms ease-in-out`;
            element.style.transform = `scale(${scale})`;
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, duration);
        }
    }

    // Shake animation for errors
    shake(element, duration = 600) {
        if (element) {
            element.style.animation = `shake ${duration}ms ease-in-out`;
            setTimeout(() => {
                element.style.animation = '';
            }, duration);
        }
    }

    // Progress ring animation
    animateProgressRing(element, percentage, duration = 500) {
        if (element) {
            const circumference = 2 * Math.PI * 15.9155;
            const offset = circumference - (percentage / 100) * circumference;
            
            element.style.transition = `stroke-dashoffset ${duration}ms ease-in-out`;
            element.style.strokeDasharray = `${circumference} ${circumference}`;
            element.style.strokeDashoffset = offset;
        }
    }

    // Stagger animation for multiple elements
    staggerAnimation(elements, animationClass, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add(animationClass);
            }, index * delay);
        });
    }

    // Bounce animation
    bounce(element, duration = 600) {
        if (element) {
            element.style.animation = `bounce ${duration}ms ease-in-out`;
            setTimeout(() => {
                element.style.animation = '';
            }, duration);
        }
    }

    // Slide down animation for collapsible content
    slideDown(element, duration = 300) {
        if (element) {
            element.style.height = '0';
            element.style.overflow = 'hidden';
            element.style.transition = `height ${duration}ms ease-in-out`;
            
            const fullHeight = element.scrollHeight;
            requestAnimationFrame(() => {
                element.style.height = fullHeight + 'px';
            });
            
            setTimeout(() => {
                element.style.height = '';
                element.style.overflow = '';
            }, duration);
        }
    }

    // Slide up animation for collapsible content
    slideUp(element, duration = 300) {
        if (element) {
            element.style.height = element.scrollHeight + 'px';
            element.style.overflow = 'hidden';
            element.style.transition = `height ${duration}ms ease-in-out`;
            
            requestAnimationFrame(() => {
                element.style.height = '0';
            });
            
            setTimeout(() => {
                element.style.display = 'none';
                element.style.height = '';
                element.style.overflow = '';
            }, duration);
        }
    }
}

// CSS keyframes for animations (to be added to a style tag)
const animationCSS = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
        20%, 40%, 60%, 80% { transform: translateX(2px); }
    }
    
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
        40%, 43% { transform: translateY(-10px); }
        70% { transform: translateY(-5px); }
        90% { transform: translateY(-2px); }
    }
    
    @keyframes slideInUp {
        from { 
            opacity: 0; 
            transform: translateY(20px); 
        }
        to { 
            opacity: 1; 
            transform: translateY(0); 
        }
    }
    
    @keyframes slideInDown {
        from { 
            opacity: 0; 
            transform: translateY(-20px); 
        }
        to { 
            opacity: 1; 
            transform: translateY(0); 
        }
    }
    
    @keyframes slideInLeft {
        from { 
            opacity: 0; 
            transform: translateX(-20px); 
        }
        to { 
            opacity: 1; 
            transform: translateX(0); 
        }
    }
    
    @keyframes slideInRight {
        from { 
            opacity: 0; 
            transform: translateX(20px); 
        }
        to { 
            opacity: 1; 
            transform: translateX(0); 
        }
    }
    
    .animate-slide-in-up {
        animation: slideInUp 0.3s ease-out;
    }
    
    .animate-slide-in-down {
        animation: slideInDown 0.3s ease-out;
    }
    
    .animate-slide-in-left {
        animation: slideInLeft 0.3s ease-out;
    }
    
    .animate-slide-in-right {
        animation: slideInRight 0.3s ease-out;
    }
`;