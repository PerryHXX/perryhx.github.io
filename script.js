// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 2000);
    }
});

// Custom Cursor - removed trailing effect

// Optimized Particle System
const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isVisible = true;
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resizeCanvas();
    
    const particles = [];
    const particleCount = 25; // Reduced from 50
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = Math.random() * 0.3 - 0.15;
            this.speedY = Math.random() * 0.3 - 0.15;
            this.opacity = Math.random() * 0.3 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        if (!isVisible) {
            animationFrameId = requestAnimationFrame(animate);
            return;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        animationFrameId = requestAnimationFrame(animate);
    }
    
    // Only animate when page is visible
    document.addEventListener('visibilitychange', () => {
        isVisible = !document.hidden;
    });
    
    animate();
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 250);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close footer overlay
const closeBtn = document.querySelector('.close-btn');
const footerOverlay = document.querySelector('.footer-overlay');

if (closeBtn && footerOverlay) {
    closeBtn.addEventListener('click', () => {
        footerOverlay.style.display = 'none';
    });
}

// Enhanced Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Random glitch effect occasionally
            if (Math.random() > 0.7) {
                entry.target.classList.add('glitch');
                setTimeout(() => {
                    entry.target.classList.remove('glitch');
                }, 300);
            }
        }
    });
}, observerOptions);

// Add scroll animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for page to load
    setTimeout(() => {
        const scrollElements = document.querySelectorAll('.project-item, .work-card, .education-card, .upcoming-project-item');
        scrollElements.forEach((el, index) => {
            // Set initial opacity to 1 so they're visible
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            
            if (index % 2 === 0) {
                el.classList.add('fade-in-left');
            } else {
                el.classList.add('fade-in-right');
            }
            observer.observe(el);
        });
        
        // Ensure contact section is visible
        const contactSection = document.querySelector('.contact');
        if (contactSection) {
            contactSection.style.opacity = '1';
            contactSection.style.transform = 'translateY(0)';
            contactSection.style.visibility = 'visible';
            contactSection.style.display = 'block';
        }
        
        // Add 3D effect to cards
        const cards = document.querySelectorAll('.work-card, .project-item, .education-card');
        cards.forEach(card => {
            card.classList.add('card-3d', 'transform-3d');
        });
    }, 100);
});

// Observe elements for animation (excluding project-items which are handled separately)
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.work-card, .skills-visualization, .contact');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Animate tool icons with delay
    const toolIcons = document.querySelectorAll('.tool-icon');
    toolIcons.forEach((icon, index) => {
        icon.style.opacity = '0';
        icon.style.transform = 'scale(0)';
        icon.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            icon.style.opacity = '1';
            icon.style.transform = 'scale(1)';
        }, 500 + (index * 100));
    });
});

// Typing effect removed

// Optimized Parallax effect with throttling
let lastScrollTime = 0;
let scrollRafId = null;
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroCenter = document.querySelector('.hero-center');
            const backgroundVideo = document.querySelector('.background-video');
            // Optimize video playback
            if (backgroundVideo) {
                // Reduce video quality by lowering playback rate slightly
                backgroundVideo.playbackRate = 0.95; // Slightly slower = less CPU
                // Disable video quality features
                backgroundVideo.setAttribute('playsinline', '');
                backgroundVideo.setAttribute('webkit-playsinline', '');
            }
            
            if (heroCenter && scrolled < window.innerHeight) {
                heroCenter.style.transform = `translate3d(0, ${scrolled * 0.15}px, 0)`;
                heroCenter.style.opacity = 1 - (scrolled / window.innerHeight) * 0.4;
            }
            
            // Keep background video fixed and visible
            if (backgroundVideo) {
                backgroundVideo.style.transform = 'translate3d(0, 0, 0)';
                backgroundVideo.style.position = 'fixed';
            }
            
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// Tool icon hover effects with connection lines (visual effect)
const toolIcons = document.querySelectorAll('.tool-icon');
const sigmaCenter = document.querySelector('.sigma-center');

toolIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.2)';
        icon.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.8)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1)';
        icon.style.boxShadow = 'none';
    });
});

// Work card hover effects
const workCards = document.querySelectorAll('.work-card');
workCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.work-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.work-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Enhanced Header background on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 255, 255, 0.3)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Optimized random glitch effects (less frequent)
setInterval(() => {
    const elements = document.querySelectorAll('.hero-name, .section-title');
    if (elements.length > 0 && Math.random() > 0.98) { // Less frequent (was 0.95)
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        randomElement.classList.add('glitch');
        setTimeout(() => {
            randomElement.classList.remove('glitch');
        }, 200);
    }
}, 8000); // Less frequent (was 5000)

// Add glow effect to sigma center on hover
if (sigmaCenter) {
    sigmaCenter.addEventListener('mouseenter', () => {
        sigmaCenter.style.textShadow = '0 0 60px var(--purple-glow), 0 0 120px var(--purple-glow)';
    });
    
    sigmaCenter.addEventListener('mouseleave', () => {
        sigmaCenter.style.textShadow = '0 0 40px var(--purple-glow), 0 0 80px var(--purple-glow)';
    });
}

