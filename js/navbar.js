// Navbar Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const navbar = document.querySelector('.navbar');
    const navLogo = document.querySelector('.nav-logo');
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.nav-links');
    const scrollProgress = document.querySelector('.scroll-progress');
    const sections = document.querySelectorAll('section[id]');
    
    // Animate navbar elements on load
    function animateNavbar() {
        // Logo animation
        gsap.from(navLogo, {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
        
        // Links animation with stagger
        gsap.from(navLinks, {
            y: -20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out"
        });
    }
    
    // Call animation after preloader is done
    if (window.preloaderDone) {
        animateNavbar();
    } else {
        // If preloader is still running, wait for it
        document.addEventListener('preloaderDone', animateNavbar);
    }
    
    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Disable body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Scroll events
    window.addEventListener('scroll', () => {
        // Add scrolled class to navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update scroll progress indicator
        const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = `${scrollPercentage}%`;
        
        // Update active link based on scroll position
        updateActiveLink();
    });
    
    // Update active link based on scroll position
    function updateActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Initialize active link on page load
    updateActiveLink();
});