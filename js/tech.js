// Tech Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tech cards filtering
    initTechFilter();
    
    // Initialize tech universe animation
    initTechUniverse();
});

// Function to handle tech card filtering
function initTechFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const techCards = document.querySelectorAll('.tech-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter tech cards
            techCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else if (card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Function to enhance tech universe animation
function initTechUniverse() {
    const techUniverse = document.querySelector('.tech-universe');
    const orbitIcons = document.querySelectorAll('.orbit-icon');
    
    // Add hover effect to tech universe
    if (techUniverse) {
        techUniverse.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        techUniverse.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
    
    // Add pulse animation to orbit icons
    orbitIcons.forEach((icon, index) => {
        // Add staggered pulse animation
        setTimeout(() => {
            icon.classList.add('pulse');
            setTimeout(() => {
                icon.classList.remove('pulse');
            }, 1000);
        }, index * 300);
        
        // Add click event to orbit icons
        icon.addEventListener('click', function() {
            // Get the tech name from the icon
            const techName = this.querySelector('i').className.split('-').pop();
            
            // Find the corresponding tech card
            const techCards = document.querySelectorAll('.tech-card');
            techCards.forEach(card => {
                const cardName = card.querySelector('.tech-name').textContent.toLowerCase();
                if (cardName.includes(techName)) {
                    // Scroll to the tech card
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Highlight the tech card
                    card.classList.add('highlight');
                    setTimeout(() => {
                        card.classList.remove('highlight');
                    }, 2000);
                }
            });
        });
    });
    
    // Add parallax effect to tech universe
    document.addEventListener('mousemove', function(e) {
        if (techUniverse) {
            const x = (window.innerWidth / 2 - e.clientX) / 50;
            const y = (window.innerHeight / 2 - e.clientY) / 50;
            
            techUniverse.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }
    });
}

// Add animation to tech level bars on scroll
window.addEventListener('scroll', function() {
    const levelBars = document.querySelectorAll('.level-fill');
    
    levelBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (barPosition < screenPosition) {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }
    });
});

// Add CSS class for highlight animation
const style = document.createElement('style');
style.textContent = `
    .tech-card.highlight .tech-card-inner {
        animation: highlight-pulse 0.5s ease-in-out 3;
    }
    
    .orbit-icon.pulse {
        animation: pulse 1s ease-in-out;
    }
    
    @keyframes highlight-pulse {
        0% { box-shadow: 0 10px 30px rgba(var(--accent-rgb), 0.3); }
        50% { box-shadow: 0 10px 50px rgba(var(--accent-rgb), 0.8); }
        100% { box-shadow: 0 10px 30px rgba(var(--accent-rgb), 0.3); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);