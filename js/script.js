// Mobile Menu Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    // Ensure button is clickable - set highest priority
    navToggle.style.pointerEvents = 'auto';
    navToggle.style.zIndex = '1003';
    navToggle.style.cursor = 'pointer';
    navToggle.style.position = 'relative';
    navToggle.setAttribute('tabindex', '0');
    
    // Use both click and touchstart for better mobile support
    const toggleMenu = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };
    
    // Add appropriate pointer/touch/click listener depending on browser capability
    if (window.PointerEvent) {
        // pointer events unify mouse/touch/pen
        navToggle.addEventListener('pointerup', (e) => {
            // only respond to primary button
            if (e.pointerType === 'mouse' && e.button !== 0) return;
            toggleMenu(e);
        }, { passive: false });
    } else {
        // fallback: support click and touchend
        navToggle.addEventListener('click', toggleMenu, { passive: false });
        navToggle.addEventListener('touchend', toggleMenu, { passive: false });
    }
    
    // Also handle keyboard for accessibility
    navToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu(e);
        }
    });

    // Close menu when clicking on a link - Enhanced for mobile
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        // Ensure links are clickable
        link.style.pointerEvents = 'auto';
        link.style.cursor = 'pointer';
        link.style.zIndex = '1001';
        
        const closeMenu = (e) => {
            // Allow the link to navigate
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        };
        
        // Support multiple event types for maximum compatibility
        if (window.PointerEvent) {
            link.addEventListener('pointerup', (e) => {
                if (e.pointerType === 'mouse' && e.button !== 0) return;
                closeMenu(e);
            }, { passive: false });
            // Also add click as fallback
            link.addEventListener('click', closeMenu);
        } else {
            // Fallback for browsers without PointerEvent
            link.addEventListener('click', closeMenu, { passive: false });
            link.addEventListener('touchend', closeMenu, { passive: false });
        }
    });

    // Close menu when clicking outside - Enhanced for mobile
    const handleOutsideClick = (e) => {
        if (navMenu.classList.contains('active')) {
            const target = e.target;
            // Don't close if clicking on menu, toggle button, or their children
            if (!navMenu.contains(target) && !navToggle.contains(target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    };
    
    // Support both click and touch events
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('touchend', handleOutsideClick);

    // Close menu on window resize if it's open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Hero Slider
let heroIndex = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    if (slides.length === 0) return;
    if (n >= slides.length) heroIndex = 0;
    if (n < 0) heroIndex = slides.length - 1;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[heroIndex].classList.add('active');
    if (dots[heroIndex]) {
        dots[heroIndex].classList.add('active');
    }
}

function changeSlide(n) {
    heroIndex += n;
    showSlide(heroIndex);
}

function setHeroSlide(n) {
    heroIndex = n - 1;
    showSlide(heroIndex);
}

// Auto slide
if (slides.length > 0) {
    setInterval(() => {
        heroIndex++;
        showSlide(heroIndex);
    }, 5000);
}

// Search Form Handler
const searchForm = document.querySelector('.search-form');
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const destination = document.getElementById('destination').value;
        const checkin = document.getElementById('checkin').value;
        const checkout = document.getElementById('checkout').value;
        const guests = document.getElementById('guests').value;
        
        if (destination || checkin || checkout) {
            alert(`Searching for: ${destination || 'Any destination'} from ${checkin || 'any date'} to ${checkout || 'any date'} for ${guests} guests`);
            // In a real application, this would redirect to search results
        }
    });
}

// Smooth Scroll
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

// Contact Form Handler
// select any <form> element that has the class `contact-form` (works when form has the class directly)
const contactForm = document.querySelector('form.contact-form') || document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Newsletter Form Handler
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with ${email}! You'll receive our latest travel deals and updates.`);
        newsletterForm.reset();
    });
}

// Set minimum date for check-in and check-out
const today = new Date().toISOString().split('T')[0];
const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');

if (checkinInput) {
    checkinInput.setAttribute('min', today);
    checkinInput.addEventListener('change', () => {
        if (checkoutInput) {
            checkoutInput.setAttribute('min', checkinInput.value);
        }
    });
}

if (checkoutInput) {
    checkoutInput.setAttribute('min', today);
}

// Add animation on scroll
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.package-card, .feature-card, .testimonial-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Initialize Testimonial Slider
    initTestimonialSlider();
});

// Testimonial Slider
let currentTestimonial = 0;
let testimonialCards = [];
let testimonialDots = [];

function initTestimonialSlider() {
    const slider = document.getElementById('testimonialsSlider');
    const dotsContainer = document.getElementById('testimonialDots');
    
    if (!slider || !dotsContainer) return;
    
    testimonialCards = Array.from(slider.querySelectorAll('.testimonial-card'));
    
    if (testimonialCards.length === 0) return;
    
    // Clear existing dots
    dotsContainer.innerHTML = '';
    
    // Create dots
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'testimonial-dot' + (index === 0 ? ' active' : '');
        dot.onclick = () => goToTestimonial(index);
        dotsContainer.appendChild(dot);
    });
    
    testimonialDots = Array.from(dotsContainer.querySelectorAll('.testimonial-dot'));
    
    // Set initial scroll position
    slider.scrollLeft = 0;
    
    // Auto slide testimonials
    let autoSlideInterval = setInterval(() => {
        if (testimonialCards.length > 0) {
            changeTestimonial(1);
        }
    }, 5000);
    
    // Pause auto-slide on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            if (testimonialCards.length > 0) {
                changeTestimonial(1);
            }
        }, 5000);
    });
}

function changeTestimonial(direction) {
    if (testimonialCards.length === 0) return;
    
    currentTestimonial += direction;
    
    if (currentTestimonial >= testimonialCards.length) {
        currentTestimonial = 0;
    } else if (currentTestimonial < 0) {
        currentTestimonial = testimonialCards.length - 1;
    }
    
    goToTestimonial(currentTestimonial);
}

function goToTestimonial(index) {
    if (testimonialCards.length === 0) return;
    
    currentTestimonial = index;
    const slider = document.getElementById('testimonialsSlider');
    
    if (slider && testimonialCards[index]) {
        const card = testimonialCards[index];
        const cardLeft = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        const sliderWidth = slider.offsetWidth;
        
        // Calculate scroll position to center the card
        const scrollPosition = cardLeft - (sliderWidth / 2) + (cardWidth / 2);
        
        slider.scrollTo({
            left: Math.max(0, scrollPosition),
            behavior: 'smooth'
        });
    }
    
    // Update dots
    if (testimonialDots.length > 0) {
        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
}

// Handle scroll events to update active dot
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('testimonialsSlider');
    if (slider) {
        slider.addEventListener('scroll', () => {
            const scrollLeft = slider.scrollLeft;
            const cardWidth = slider.querySelector('.testimonial-card')?.offsetWidth || 0;
            const gap = 32; // 2rem gap
            const currentIndex = Math.round(scrollLeft / (cardWidth + gap));
            
            if (currentIndex >= 0 && currentIndex < testimonialCards.length) {
                currentTestimonial = currentIndex;
                testimonialDots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
            }
        });
    }
});

