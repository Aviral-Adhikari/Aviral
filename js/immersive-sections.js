document.addEventListener("DOMContentLoaded", function () {
  // Initialize GSAP ScrollTrigger
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Initialize all immersive section components
  initParticlesBackground();
  initAboutAnimations();
  initContactAnimations();
  initCounters();
  initFormHandling();
  initParallaxEffects();
  initProgressBars();
});

window.portfolioVantaInstances = window.portfolioVantaInstances || [];
let portfolioVantaResizeTimer = null;

function initParticlesBackground() {
  const particlesContainers = document.querySelectorAll(".particles-container");
  const backgroundHost = getPortfolioVantaHost();

  destroyPortfolioVantaInstances();

  particlesContainers.forEach((container) => {
    container.classList.add("particles-placeholder");
    container.style.backgroundColor = "transparent";
    container.style.pointerEvents = "none";
  });

  if (!backgroundHost || !window.VANTA || !window.VANTA.NET) {
    return;
  }

  try {
    const instance = VANTA.NET({
      el: backgroundHost,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,

      minHeight: Math.max(window.innerHeight, 240),
      minWidth: Math.max(window.innerWidth, 240),

      scale: 1.0,
      scaleMobile: 1.0,

      color: 0x7c3aed,
      backgroundColor: 0x0b0b0f,

      points: 8.0,
      maxDistance: 22.0,
      spacing: 22.0,

      showDots: true,
    });

    window.portfolioVantaInstances.push(instance);
    refreshPortfolioVantaInstances();
    bindPortfolioCanvasRecovery(backgroundHost);
  } catch (error) {
    backgroundHost.classList.add("vanta-fallback");
    console.warn("VANTA background failed to initialize:", error);
  }
}

function bindPortfolioCanvasRecovery(host) {
  window.requestAnimationFrame(() => {
    const canvas = host.querySelector("canvas");

    if (!canvas || canvas.dataset.recoveryBound === "true") {
      return;
    }

    canvas.dataset.recoveryBound = "true";
    canvas.addEventListener("webglcontextlost", function (event) {
      event.preventDefault();
      host.style.backgroundColor = "#0b0b0f";
      window.setTimeout(initParticlesBackground, 300);
    }, false);
  });
}

function getPortfolioVantaHost() {
  let host = document.querySelector(".portfolio-vanta-background");

  if (!host) {
    host = document.createElement("div");
    host.className = "portfolio-vanta-background";
    host.setAttribute("aria-hidden", "true");
    document.body.prepend(host);
  }

  host.style.backgroundColor = "#0b0b0f";
  return host;
}

function destroyPortfolioVantaInstances() {
  if (!Array.isArray(window.portfolioVantaInstances)) {
    window.portfolioVantaInstances = [];
    return;
  }

  window.portfolioVantaInstances.forEach((instance) => {
    if (instance && typeof instance.destroy === "function") {
      try {
        instance.destroy();
      } catch (error) {
        console.warn("VANTA background cleanup failed:", error);
      }
    }
  });

  window.portfolioVantaInstances = [];
}

function refreshPortfolioVantaInstances() {
  clearTimeout(portfolioVantaResizeTimer);
  portfolioVantaResizeTimer = setTimeout(() => {
    const containers = document.querySelectorAll(".portfolio-vanta-background");

    containers.forEach((container) => {
      const canvas = container.querySelector("canvas");
      if (canvas) {
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.backgroundColor = "#0b0b0f";
      }
    });

    window.portfolioVantaInstances.forEach((instance) => {
      if (instance && typeof instance.resize === "function") {
        instance.resize();
      }
    });
  }, 160);
}

window.addEventListener("resize", refreshPortfolioVantaInstances, { passive: true });
window.addEventListener("orientationchange", refreshPortfolioVantaInstances, { passive: true });
window.addEventListener("beforeunload", destroyPortfolioVantaInstances);
document.addEventListener("visibilitychange", function () {
  if (!document.hidden) {
    refreshPortfolioVantaInstances();
  }
});

function initAboutAnimations() {
  // Animate about section elements when they come into view
  const aboutSection = document.querySelector(".about-immersive");

  if (aboutSection) {
    // Create animations for about section elements
    gsap.from(".about-content h2", {
      scrollTrigger: {
        trigger: ".about-content",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".about-content p", {
      scrollTrigger: {
        trigger: ".about-content",
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });
  }
}

function initContactAnimations() {
  // Animate contact section elements when they come into view
  const contactSection = document.querySelector(".contact-immersive");

  if (contactSection) {
    // Create animations for contact section elements
    gsap.from(".contact-form", {
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }
}

function initCounters() {
  // Animate counters when they come into view
  const counters = document.querySelectorAll(".counter");

  if (counters.length > 0) {
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));

      ScrollTrigger.create({
        trigger: counter,
        start: "top 80%",
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
        once: true,
      });
    });
  }
}

function initFormHandling() {
  // Handle form submissions
  const contactForm = document.querySelector(".contact-form form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      // Simulate API call
      setTimeout(() => {
        submitBtn.textContent = "Message Sent!";
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
  const parallaxElements = document.querySelectorAll(".parallax");

  if (parallaxElements.length > 0) {
    parallaxElements.forEach((element) => {
      const speed = element.getAttribute("data-speed") || 0.1;

      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: (i, target) => -ScrollTrigger.maxScroll(window) * speed,
        ease: "none",
      });
    });
  }
}

function initProgressBars() {
  const progressBars = document.querySelectorAll(".progress-fill");

  progressBars.forEach((bar) => {
    // Store the target width as a CSS variable
    const targetWidth = bar.style.width;
    bar.style.setProperty("--fill-width", targetWidth);

    // Reset width to 0 initially
    bar.style.width = "0";
  });

  // Create a ScrollTrigger for each timeline item
  gsap.utils.toArray(".timeline-item-immersive").forEach((item) => {
    ScrollTrigger.create({
      trigger: item,
      start: "top 80%",
      onEnter: () => {
        item.classList.add("animate-in");
        const progressFill = item.querySelector(".progress-fill");
        if (progressFill) {
          // Animate to the stored target width
          setTimeout(() => {
            progressFill.style.width =
              progressFill.style.getPropertyValue("--fill-width");
          }, 300); // Small delay for better visual effect
        }
      },
      once: true,
    });
  });
}
