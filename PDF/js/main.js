// Stellar Voyage Manager PAT Documentation JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current nav item based on page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Initialize lightbox for screenshots if gallery exists
    const screenshotItems = document.querySelectorAll('.screenshot-item');
    if (screenshotItems.length > 0) {
        screenshotItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').getAttribute('src');
                const caption = this.querySelector('.screenshot-caption h3').textContent;
                
                // Create lightbox elements
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                
                const lightboxContent = document.createElement('div');
                lightboxContent.className = 'lightbox-content';
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = imgSrc;
                
                const lightboxCaption = document.createElement('div');
                lightboxCaption.className = 'lightbox-caption';
                lightboxCaption.textContent = caption;
                
                const closeBtn = document.createElement('span');
                closeBtn.className = 'lightbox-close';
                closeBtn.innerHTML = '&times;';
                closeBtn.addEventListener('click', function() {
                    document.body.removeChild(lightbox);
                });
                
                // Append elements
                lightboxContent.appendChild(lightboxImg);
                lightboxContent.appendChild(lightboxCaption);
                lightboxContent.appendChild(closeBtn);
                lightbox.appendChild(lightboxContent);
                
                // Add lightbox to body
                document.body.appendChild(lightbox);
                
                // Close lightbox when clicking outside the image
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                        document.body.removeChild(lightbox);
                    }
                });
            });
        });
    }
    
    // Add animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        featureCards.forEach(card => {
            observer.observe(card);
        });
    }
    
    // Add responsive navigation toggle for mobile
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('nav .container');
    nav.insertBefore(navToggle, nav.firstChild);
    
    navToggle.addEventListener('click', function() {
        const navList = document.querySelector('nav ul');
        navList.classList.toggle('show');
    });
});

// Add CSS for elements created by JavaScript
const style = document.createElement('style');
style.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 80vh;
        border: 3px solid var(--cosmic-purple);
        border-radius: 4px;
    }
    
    .lightbox-caption {
        color: white;
        text-align: center;
        padding: 10px;
        font-size: 1.2rem;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 30px;
        cursor: pointer;
    }
    
    .feature-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s, transform 0.5s;
    }
    
    .feature-card.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-toggle {
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    }
    
    @media (max-width: 768px) {
        .nav-toggle {
            display: block;
        }
        
        nav ul {
            display: none;
            flex-direction: column;
            width: 100%;
        }
        
        nav ul.show {
            display: flex;
        }
    }
`;

document.head.appendChild(style);
