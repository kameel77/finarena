// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.firstName || !data.lastName || !data.email || !data.service || !data.message) {
                alert('Proszę wypełnić wszystkie wymagane pola.');
                return;
            }
            
            if (!data.privacy) {
                alert('Proszę zaakceptować politykę prywatności.');
                return;
            }
            
            // Simulate form submission
            alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą w ciągu 24 godzin.');
            contactForm.reset();
        });
    }
    
    // Program tabs functionality
    const programItems = document.querySelectorAll('.program-item');
    if (programItems.length > 0) {
        programItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                programItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');
                
                // Here you would typically update the program-detail content
                // For now, we'll just log which program was selected
                console.log('Selected program:', this.querySelector('h4').textContent);
            });
        });
    }
    
    // Add scroll animation for elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .benefit-card, .testimonial-card, .pricing-card').forEach(el => {
        observer.observe(el);
    });
});

// Add CSS for mobile menu when active
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background-color: var(--bg-primary);
            flex-direction: column;
            padding: 24px;
            gap: 16px;
            border-bottom: 1px solid var(--border-color);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
