// Loading Screen Animation
window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 500);
    }, 1500);
});

// Custom Cursor
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    setTimeout(() => {
        cursorFollower.style.left = e.clientX - 20 + 'px';
        cursorFollower.style.top = e.clientY - 20 + 'px';
    }, 100);
});

document.querySelectorAll('a, button, .card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Particle System
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = Math.random() * 15 + 10 + 's';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particlesContainer.appendChild(particle);
    }
}
createParticles();

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Smooth Scrolling with Enhanced Animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('btn-ripple');
            ripple.style.left = e.offsetX + 'px';
            ripple.style.top = e.offsetY + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
            // Scroll to section minus navbar height
            const navbar = document.getElementById('navbar');
            const navHeight = navbar.offsetHeight;
            const targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}
window.addEventListener('scroll', updateActiveNav);

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        } else {
            entry.target.classList.remove('animate');
        }
    });
}, observerOptions);
document.querySelectorAll('.section, .section-title, .about-intro, .about-card, .service-card, .resource-card').forEach((el, i) => {
    observer.observe(el);
    // Stagger animation for cards
    if (el.classList.contains('about-card') || el.classList.contains('service-card') || el.classList.contains('resource-card')) {
        el.style.transitionDelay = `${(i%6)*0.12 + 0.1}s`;
    }
});

// Enhanced Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    // Validate form
    const requiredFields = this.querySelectorAll('[required]');
    let isValid = true;
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#ff6b6b';
            setTimeout(() => {
                field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }, 3000);
        }
    });
    if (!isValid) {
        // Add shake animation
        this.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
        return;
    }
    // Simulate submission
    submitBtn.innerHTML = '⏳ Processing...';
    submitBtn.disabled = true;
    submitBtn.style.background = 'rgba(255, 255, 255, 0.1)';
    setTimeout(() => {
        submitBtn.innerHTML = '✅ Welcome to Wellness Hub!';
        submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.innerHTML = `
            <div style="background: rgba(76, 175, 80, 0.1); border: 1px solid rgba(76, 175, 80, 0.3); 
                        color: #4CAF50; padding: 1rem; border-radius: 10px; margin-top: 1rem; text-align: center;
                        animation: slideInUp 0.5s ease;">
                🎉 Thank you for joining us! Check your email for your personalized wellness plan.
            </div>
        `;
        this.appendChild(successMsg);
        // Reset form
        setTimeout(() => {
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = 'rgba(255, 255, 255, 0.2)';
            successMsg.remove();
        }, 4000);
    }, 2000);
});

// Add input focus animations
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Parallax Effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    // Hero parallax
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    // Floating shapes parallax
    document.querySelectorAll('.shape').forEach((shape, index) => {
        const speed = 0.2 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Add hover effects to cards
document.querySelectorAll('.about-card, .service-card, .resource-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Add shake animation keyframes
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(shakeStyle);

// Add mobile touch effects
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, false);
}

// Performance optimization - Throttle scroll events
let ticking = false;
function throttleScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateActiveNav();
            ticking = false;
        });
        ticking = true;
    }
}
window.addEventListener('scroll', throttleScroll);

// Add entrance animations with stagger
setTimeout(() => {
    document.querySelectorAll('.about-card').forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}, 1000);

// Initialize all animations on load
document.addEventListener('DOMContentLoaded', function() {
    // Add initial states for animations
    document.querySelectorAll('.section-title, .about-intro').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
    });
});
