// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Preloader Animation
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    const mainContent = document.querySelector('.main-content');
    const loaderText = document.querySelector('.loader-text');

    // Animate loader text
    gsap.to(loaderText, {
        opacity: 1,
        duration: 0.4, // Reduced from 1 to 0.4
        ease: "power2.out"
    });

    // After text animation, fade out preloader and show content
    setTimeout(() => {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.4, // Reduced from 1 to 0.4
            ease: "power2.inOut",
            onComplete: () => {
                preloader.style.display = 'none';
                mainContent.classList.remove('hidden');
                initializeHeroAnimations();
                initializeSectionAnimations();
                
                // Dispatch event for navbar to know preloader is done
                window.preloaderDone = true;
                document.dispatchEvent(new Event('preloaderDone'));
            }
        });
    }, 800); // Reduced from 2500 to 800 milliseconds
});

// Hero Section Animations
function initializeHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const ctaButtons = document.querySelector('.cta-buttons');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    const heroTimeline = gsap.timeline();

    heroTimeline
        .from(heroTitle, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        })
        .from(heroSubtitle, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power4.out"
        }, "-=0.4")
        .from(ctaButtons.children, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power4.out"
        }, "-=0.4")
        .from(scrollIndicator, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power4.out"
        }, "-=0.2");

    // Initialize Vanta.js background
    const heroBackground = document.querySelector('.hero-background');
    if (typeof VANTA !== 'undefined' && heroBackground) {
        VANTA.NET({
            el: heroBackground,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x9b5de5,
            backgroundColor: 0x0e0f1c,
            points: 10.00,
            maxDistance: 25.00,
            spacing: 20.00
        });
    }
}

// Project Filtering
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        ease: "power2.out",
                        clearProps: "all"
                    });
                    card.style.display = 'block';
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.4,
                        ease: "power2.out",
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
});

// Form Submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just log it and show a success message
            console.log('Form submitted:', { name, email, message });
            
            // Show success animation
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<span>Message Sent!</span>';
            submitBtn.classList.add('success');
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = '<span>Send Message</span><div class="send-icon"></div>';
                submitBtn.classList.remove('success');
            }, 3000);
        });
    }
});

// Smooth Scrolling for Anchor Links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (window.scrollY > 500) {
        backToTopBtn.style.opacity = '1';
    } else {
        backToTopBtn.style.opacity = '0';
    }
});