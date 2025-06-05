// Custom Cursor Implementation
document.addEventListener('DOMContentLoaded', () => {
    // Create cursor elements
    const cursorOuter = document.createElement('div');
    const cursorInner = document.createElement('div');
    
    cursorOuter.classList.add('cursor-outer');
    cursorInner.classList.add('cursor-inner');
    
    document.body.appendChild(cursorOuter);
    document.body.appendChild(cursorInner);
    
    // Variables for cursor position
    let mouseX = 0;
    let mouseY = 0;
    let outerX = 0;
    let outerY = 0;
    let innerX = 0;
    let innerY = 0;
    
    // Update cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animate cursor with requestAnimationFrame for smooth movement
    const animateCursor = () => {
        // Calculate smooth movement with easing
        outerX += (mouseX - outerX) * 0.2;
        outerY += (mouseY - outerY) * 0.2;
        innerX += (mouseX - innerX) * 0.4;
        innerY += (mouseY - innerY) * 0.4;
        
        // Apply positions
        cursorOuter.style.transform = `translate(${outerX}px, ${outerY}px)`;
        cursorInner.style.transform = `translate(${innerX}px, ${innerY}px)`;
        
        requestAnimationFrame(animateCursor);
    };
    
    animateCursor();
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .tech-item, input, textarea, .nav-link, .nav-logo, .nav-toggle');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOuter.classList.add('cursor-hover');
            cursorInner.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorOuter.classList.remove('cursor-hover');
            cursorInner.classList.remove('cursor-hover');
        });
    });
    
    // Add click effect
    document.addEventListener('mousedown', () => {
        cursorOuter.classList.add('cursor-click');
        cursorInner.classList.add('cursor-click');
    });
    
    document.addEventListener('mouseup', () => {
        cursorOuter.classList.remove('cursor-click');
        cursorInner.classList.remove('cursor-click');
    });
    
    // Show default cursor
    document.documentElement.style.cursor = 'auto';
    
    // Handle cursor for touch devices
    const isTouchDevice = () => {
        return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
    };
    
    if (isTouchDevice()) {
        cursorOuter.style.display = 'none';
        cursorInner.style.display = 'none';
        document.documentElement.style.cursor = 'auto';
    }
    
    // Add special effects for specific elements
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            cursorOuter.classList.add('cursor-view');
            const viewText = document.createElement('div');
            viewText.classList.add('cursor-text');
            viewText.textContent = 'View';
            cursorOuter.appendChild(viewText);
        });
        
        card.addEventListener('mouseleave', () => {
            cursorOuter.classList.remove('cursor-view');
            const viewText = cursorOuter.querySelector('.cursor-text');
            if (viewText) {
                cursorOuter.removeChild(viewText);
            }
        });
    });
    
    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const btnX = rect.left + rect.width / 2;
            const btnY = rect.top + rect.height / 2;
            
            const strength = 15;
            const distance = Math.sqrt(Math.pow(mouseX - btnX, 2) + Math.pow(mouseY - btnY, 2));
            const magnetism = Math.min(strength, strength * 100 / distance);
            
            if (distance < 100) {
                cursorOuter.style.transform = `translate(${btnX}px, ${btnY}px) scale(1.5)`;
                cursorInner.style.transform = `translate(${btnX}px, ${btnY}px) scale(0.5)`;
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            // Reset to normal cursor behavior
            animateCursor();
        });
    });
});