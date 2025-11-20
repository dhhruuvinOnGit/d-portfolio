// Mobile Navigation Toggle
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling and Active Navigation
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });

    // Replace the URL hash to match the currently visible section (no new history entry)
    if (current) {
        const newHash = `#${current}`;
        try {
            history.replaceState(null, '', newHash);
        } catch (err) {
            // Fallback
            // location.hash = newHash; // optional fallback if you want this behavior
        }
    }
}


// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        navbar.style.backgroundColor = 'rgba(255,255,255,0.95)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.backgroundColor = '#ffffff';
    }
}

// Scroll event listeners
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    handleNavbarScroll();
    animateOnScroll();
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.timeline-item, .hobby-card, .skill-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in-up');
        }
    });
}

// Skill bar animations
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = width;
                skillBar.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple form validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission (replace with actual form handling)
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // only handle in-page anchors
        const href = this.getAttribute('href');
        if (!href || href === '#' || href.indexOf('mailto:') === 0) return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Update address bar without causing a jump — add a history entry so Back works
            try {
                history.pushState(null, '', href);
            } catch (err) {
                // Fallback (very old browsers) — this may cause a jump in some browsers
                location.hash = href;
            }
        }
    });
});


// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
    updateActiveNavLink();
    
    // Add initial fade-in effect to hero section
    const heroElements = document.querySelectorAll('.about-section .fade-in-up');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Parallax effect for hero section (optional enhancement)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection && scrolled < window.innerHeight) {
        aboutSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger any load-dependent animations
    const elements = document.querySelectorAll('.section-badge, .main-title, .subtitle');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add CSS classes for initial hidden state
const style = document.createElement('style');
style.textContent = `
    .section-badge,
    .main-title,
    .subtitle {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    body:not(.loaded) .section-badge,
    body:not(.loaded) .main-title,
    body:not(.loaded) .subtitle {
        opacity: 0;
        transform: translateY(20px);
    }
`;
document.head.appendChild(style);