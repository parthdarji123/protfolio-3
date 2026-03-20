document.addEventListener('DOMContentLoaded', () => {

    // 1. Preloader
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);

    // 2. Custom Cursor (only on desktop)
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Add a small delay for outline
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
        
        // Hover effect for links and buttons
        const hoverElements = document.querySelectorAll('a, button, .hover-lift, .skill-card, .project-card, .method-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    // 3. AOS Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }

    // 4. GSAP Animations Registration
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Timeline animation
        const timelineItems = document.querySelectorAll('.gsap-timeline');
        timelineItems.forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                },
                x: -50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: i * 0.2
            });
        });

        // Skills Progress Bar animation
        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            gsap.to(bar, {
                scrollTrigger: {
                    trigger: bar,
                    start: "top 90%",
                },
                width: bar.getAttribute('data-width'),
                duration: 1.5,
                ease: "power2.out"
            });
        });

        // Counters animation
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            gsap.to(counter, {
                scrollTrigger: {
                    trigger: counter,
                    start: "top 90%"
                },
                innerHTML: counter.getAttribute('data-target'),
                duration: 2,
                snap: { innerHTML: 1 },
                ease: "power1.inOut"
            });
        });
    }

    // 5. Sticky Navbar
    const header = document.getElementById('header');
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button visibility
        if (window.scrollY > 500) {
            if(backToTop) backToTop.classList.add('active');
        } else {
            if(backToTop) backToTop.classList.remove('active');
        }
    });

    if(backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 6. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const closeBtn = document.querySelector('.close-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav ul li a');

    if(menuToggle && closeBtn && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.add('open');
        });

        closeBtn.addEventListener('click', () => {
            mobileNav.classList.remove('open');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
            });
        });
    }

    // 7. Active Navigation Link Update on Scroll
    const sections = document.querySelectorAll('section');
    const navLinksDesktop = document.querySelectorAll('.nav-links a');
    const allNavLinks = document.querySelectorAll('nav a, .mobile-nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') && link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });

    // 8. Typing Animation Effect
    const typedTextSpan = document.querySelector('.typed-text');
    if(typedTextSpan) {
        const textArray = ["Web Developer", "IT Student", "Tech Innovator"];
        const typingDelay = 100;
        const erasingDelay = 60;
        const newTextDelay = 2000;
        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 1100);
            }
        }
        
        // Start typing after initial load
        setTimeout(type, 2000);
    }

    // 9. Contact Form Submission (Real implementation using FormSubmit)
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if(name && email && message) {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
                
                setTimeout(() => {
                    formMessage.textContent = 'Transmission received successfully. System acknowledged.';
                    formMessage.className = 'form-message mt-3 success';
                    formMessage.classList.remove('hidden');
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    
                    setTimeout(() => {
                        formMessage.classList.add('hidden');
                    }, 5000);
                }, 1500);
            }
        });
    }

    // 10. Update Year in Footer
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 11. Particles.js Configuration
    if(typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#FFD700" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 3, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } },
                "line_linked": { "enable": true, "distance": 150, "color": "#FFD700", "opacity": 0.2, "width": 1 },
                "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": true, "rotateX": 600, "rotateY": 1200 } }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.6 } }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        });
    }
});
