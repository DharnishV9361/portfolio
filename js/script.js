/* ==========================================================================
   SCRIPT.JS - Main website logic and interactive behaviors
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Page Loader ---
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('fade-out');
            }, 800); // Small delay for premium feel
        });
        
        // Backup in case load event already fired
        if (document.readyState === 'complete') {
            setTimeout(() => {
                loader.classList.add('fade-out');
            }, 800);
        }
    }

    // --- Interactive Mouse Glow Coordinates ---
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }

    // --- Scroll Progress Bar ---
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / height) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = `${scrolled}%`;
        }
        
        // Toggle Back-To-Top visibility
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    });

    // --- Back To Top Action ---
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Responsive Mobile Sidebar Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarClose = document.getElementById('sidebar-close');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    const toggleMenu = () => {
        document.body.classList.toggle('menu-active');
    };

    if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
    if (sidebarClose) sidebarClose.addEventListener('click', toggleMenu);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleMenu);

    // --- Sidebar Link Navigation & Smooth Scroll Toggles ---
    const navLinks = document.querySelectorAll('.nav-btn, .mobile-nav-btn');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Close mobile menu if open
            if (document.body.classList.contains('menu-active')) {
                document.body.classList.remove('menu-active');
            }

            if (targetSection) {
                // Account for mobile header height
                const isMobile = window.innerWidth <= 1024;
                const offset = isMobile ? 70 : 0;
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Active Nav Highlight on Scroll (ScrollSpy) ---
    const sections = document.querySelectorAll('section');
    const navButtons = document.querySelectorAll('.nav-btn');
    
    const scrollSpy = () => {
        let currentSectionId = '';
        const isMobile = window.innerWidth <= 1024;
        const offset = isMobile ? 80 : 50;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - offset;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = `#${section.getAttribute('id')}`;
            }
        });

        navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('href') === currentSectionId) {
                btn.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);
    window.addEventListener('resize', scrollSpy);

    // --- Skill Bars Animation (Triggered when scrolled into view) ---
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.skill-progress-bar');
    
    let animatedSkills = false;
    
    const animateSkills = () => {
        if (!skillsSection) return;
        const sectionPos = skillsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.15;
        
        if (sectionPos < screenPos && !animatedSkills) {
            progressBars.forEach(bar => {
                const targetProgress = bar.getAttribute('data-progress');
                bar.style.width = `${targetProgress}%`;
            });
            animatedSkills = true;
        }
    };
    
    window.addEventListener('scroll', animateSkills);
    // Trigger on load if already in view
    setTimeout(animateSkills, 1000);

    // --- Scroll Reveal Animations ---
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = 100;
            
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    setTimeout(revealOnScroll, 1200);

    // --- Contact Form Submission Handler ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Set loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span>`;
            
            // Simulate API request
            setTimeout(() => {
                // Success message handling
                submitBtn.innerHTML = `<span>Message Sent!</span>`;
                submitBtn.style.background = '#00BCD4';
                submitBtn.style.color = '#050B13';
                submitBtn.style.boxShadow = '0 0 20px rgba(0, 188, 212, 0.6)';
                
                // Clear fields
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                    submitBtn.style.boxShadow = '';
                }, 3000);
            }, 1500);
        });
    }
});
