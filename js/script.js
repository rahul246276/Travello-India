// Mobile Menu Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

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
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

function changeSlide(n) {
    currentSlide += n;
    showSlide(currentSlide);
}

function currentSlide(n) {
    currentSlide = n - 1;
    showSlide(currentSlide);
}

// Auto slide
if (slides.length > 0) {
    setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
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
const contactForm = document.querySelector('.contact-form form');
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

