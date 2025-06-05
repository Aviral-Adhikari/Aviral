document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize all immersive section components
    initParticlesBackground();
    initAboutAnimations();
    initContactAnimations();
    initCounters();
    initFormHandling();
    initParallaxEffects();
    initProgressBars();
});

function initParticlesBackground() {
    const particlesContainers = document.querySelectorAll('.particles-container');
    
    if (particlesContainers.length > 0 && window.VANTA) {
        particlesContainers.forEach(container => {
            VANTA.NET({
                el: container,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x3f51ff,
                backgroundColor: 0x0,
                points: 10.00,
                maxDistance: 20.00,
                spacing: 16.00
            });
        });
    }
}

function initAboutAnimations() {
    // Animate about section elements when they come into view
    const aboutSection = document.querySelector('.about-immersive');
    
    if (aboutSection) {
        // Create animations for about section elements
        gsap.from('.about-content h2', {
            scrollTrigger: {
                trigger: '.about-content',
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        gsap.from('.about-content p', {
            scrollTrigger: {
                trigger: '.about-content',
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out'
        });
    }
}

function initContactAnimations() {
    // Animate contact section elements when they come into view
    const contactSection = document.querySelector('.contact-immersive');
    
    if (contactSection) {
        // Create animations for contact section elements
        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: '.contact-form',
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }
}

function initCounters() {
    // Animate counters when they come into view
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            
            ScrollTrigger.create({
                trigger: counter,
                start: 'top 80%',
                onEnter: () => {
                    let count = 0;
                    const updateCounter = () => {
                        const increment = target / 100;
                        if (count < target) {
                            count += increment;
                            counter.textContent = Math.ceil(count);
                            setTimeout(updateCounter, 10);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    updateCounter();
                },
                once: true
            });
        });
    }
}

function initFormHandling() {
    // Handle form submissions
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                this.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
}

function initParallaxEffects() {
    // Create parallax scrolling effects
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length > 0) {
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.1;
            
            gsap.to(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                y: (i, target) => -ScrollTrigger.maxScroll(window) * speed,
                ease: 'none'
            });
        });
    }
}

function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        // Store the target width as a CSS variable
        const targetWidth = bar.style.width;
        bar.style.setProperty('--fill-width', targetWidth);
        
        // Reset width to 0 initially
        bar.style.width = '0';
    });
    
    // Create a ScrollTrigger for each timeline item
    gsap.utils.toArray('.timeline-item-immersive').forEach(item => {
        ScrollTrigger.create({
            trigger: item,
            start: 'top 80%',
            onEnter: () => {
                item.classList.add('animate-in');
                const progressFill = item.querySelector('.progress-fill');
                if (progressFill) {
                    // Animate to the stored target width
                    setTimeout(() => {
                        progressFill.style.width = progressFill.style.getPropertyValue('--fill-width');
                    }, 300); // Small delay for better visual effect
                }
            },
            once: true
        });
    });
}