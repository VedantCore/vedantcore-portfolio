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

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(15, 23, 42, 0.98)';
        nav.style.borderBottom = '1px solid rgba(71, 85, 105, 0.8)';
    } else {
        nav.style.background = 'rgba(15, 23, 42, 0.95)';
        nav.style.borderBottom = '1px solid var(--border-color)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.textContent;
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 150);
    }, 1000);
});

// Add parallax effect to particles
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        const speed = 0.5 + (index * 0.2);
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add mobile menu functionality (for future enhancement)
function createMobileMenu() {
    const nav = document.querySelector('nav');
    const navContainer = document.querySelector('.nav-container');
    
    // Create hamburger button
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    hamburger.style.display = 'none';
    hamburger.style.fontSize = '1.5rem';
    hamburger.style.cursor = 'pointer';
    hamburger.style.color = 'var(--primary-text)';
    
    // Add hamburger to nav
    navContainer.appendChild(hamburger);
    
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('mobile-active');
    });
    
    // Show/hide hamburger based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'block';
        } else {
            hamburger.style.display = 'none';
            document.querySelector('.nav-links').classList.remove('mobile-active');
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

// Initialize mobile menu
createMobileMenu();

// Add CSS for mobile menu via JavaScript
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 70px;
            right: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: var(--secondary-bg);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: right 0.3s ease;
            border-left: 2px solid var(--border-color);
        }
        
        .nav-links.mobile-active {
            right: 0;
        }
        
        .nav-links li {
            margin: 1rem 0;
        }
        
        .nav-links a {
            font-size: 1.2rem;
        }
    }
`;

// Inject mobile menu styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

// Add smooth reveal animation for skills
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((skill, index) => {
        skill.style.opacity = '0';
        skill.style.transform = 'translateY(20px)';
        skill.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    });
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skills = entry.target.querySelectorAll('.skill-item');
                skills.forEach(skill => {
                    skill.style.opacity = '1';
                    skill.style.transform = 'translateY(0)';
                });
            }
        });
    }, { threshold: 0.3 });
    
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        skillsObserver.observe(skillsGrid);
    }
}

// Initialize skill animations
animateSkills();

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add some performance optimizations
// Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(15, 23, 42, 0.98)';
        nav.style.borderBottom = '1px solid rgba(71, 85, 105, 0.8)';
    } else {
        nav.style.background = 'rgba(15, 23, 42, 0.95)';
        nav.style.borderBottom = '1px solid var(--border-color)';
    }
    
    // Parallax effect for particles
    const scrolled = window.pageYOffset;
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        const speed = 0.5 + (index * 0.2);
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 16); // ~60fps

// Replace the original scroll event listener
window.removeEventListener('scroll', window.addEventListener('scroll', throttledScrollHandler));