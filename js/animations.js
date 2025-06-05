// Section Animations
function initializeSectionAnimations() {
    // About Section
    gsap.from(".about-text", {
        scrollTrigger: {
            trigger: ".about-text",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    });

    gsap.from(".about-image", {
        scrollTrigger: {
            trigger: ".about-image",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    });

    // Timeline Items
    gsap.from(".timeline-item", {
        scrollTrigger: {
            trigger: ".timeline",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power4.out"
    });

    // Tech Stack Items
    gsap.from(".tech-item", {
        scrollTrigger: {
            trigger: ".tech-grid",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power4.out"
    });

    // Project Cards
    gsap.from(".project-card", {
        scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power4.out"
    });

    // Journey Items
    gsap.from(".journey-dot", {
        scrollTrigger: {
            trigger: ".journey-timeline",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        scale: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: "back.out(1.7)"
    });

    gsap.from(".journey-content", {
        scrollTrigger: {
            trigger: ".journey-timeline",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        x: function(i) {
            // Alternate left and right animations
            return i % 2 === 0 ? 100 : -100;
        },
        duration: 0.8,
        stagger: 0.2,
        ease: "power4.out"
    });

    // Contact Section
    gsap.from(".contact-info", {
        scrollTrigger: {
            trigger: ".contact-content",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    });

    gsap.from(".contact-form", {
        scrollTrigger: {
            trigger: ".contact-content",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    });

    // Form Elements Animation
    gsap.from(".form-group", {
        scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power4.out"
    });
}

// Magnetic Button Effect
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            gsap.to(btn, {
                x: deltaX * 10,
                y: deltaY * 10,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
});

// Parallax Effect for Project Cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            gsap.to(card, {
                rotationY: deltaX * 5,
                rotationX: -deltaY * 5,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });
});

// Text Scramble Effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/*&^%$#@[]{}=+?~';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-text">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Initialize Text Scramble on Scroll
document.addEventListener('DOMContentLoaded', () => {
    const phrases = [
        'Front-End Developer',
        'UI/UX Designer',
        'Web Developer',
        'Creative Coder',
        'IT Student',
        'Entrepreneur'
    ];
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.innerText;
        const fx = new TextScramble(heroSubtitle);
        
        let counter = 0;
        const next = () => {
            // First time, use the original text
            if (counter === 0) {
                fx.setText(originalText).then(() => {
                    setTimeout(next, 3000);
                });
            } else {
                fx.setText(phrases[counter % phrases.length]).then(() => {
                    setTimeout(next, 2000);
                });
            }
            counter = (counter + 1) % (phrases.length + 1);
        };
        
        // Start the effect after the hero animation completes
        setTimeout(next, 4000);
    }
});