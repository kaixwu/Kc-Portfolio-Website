// ===== ACCORDION FUNCTIONALITY (FAQ & TECH STACK) =====
const accordions = document.querySelectorAll('.tech-accordion, .faq-accordion');
accordions.forEach(accordion => {
    const header = accordion.querySelector('.tech-header, .faq-header');
    
    if (header) {
        header.addEventListener('click', () => {
            const container = accordion.closest('.project-info-box, .faq-container');
            
            if (container) {
                // Close all other accordions in the same container
                container.querySelectorAll('.tech-accordion, .faq-accordion').forEach(otherAcc => {
                    if (otherAcc !== accordion) {
                        otherAcc.classList.remove('active');
                        const otherContent = otherAcc.querySelector('.tech-content, .faq-content');
                        if (otherContent) otherContent.style.maxHeight = '0px';
                    }
                });
            }

            // Toggle current accordion
            accordion.classList.toggle('active');
            const content = accordion.querySelector('.tech-content, .faq-content');
            
            if (content) {
                content.style.maxHeight = accordion.classList.contains('active') 
                    ? content.scrollHeight + 'px' 
                    : '0px';
            }
        });
    }
});

// ===== PROJECT PAGES: FADE-IN & SIDEBAR OBSERVERS =====
const projectSections = document.querySelectorAll('.project-hero, .project-details, .project-nav');
const sidebarLinks = document.querySelectorAll('.project-sidebar a');

if (projectSections.length > 0) {
    // Fade-in effect observer
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
    }, { threshold: 0.1 });

    // Sidebar active link observer
    const sidebarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && sidebarLinks.length > 0) {
                sidebarLinks.forEach(link => {
                    link.classList.toggle('active-link', 
                        link.getAttribute('href') === `#${entry.target.id}`
                    );
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    // Observe all project sections
    projectSections.forEach(section => {
        // Assign IDs if missing
        if (!section.id) {
            if (section.classList.contains('project-details')) section.id = 'project-details';
            else if (section.classList.contains('key-features')) section.id = 'key-features';
            else if (section.classList.contains('project-hero')) section.id = 'project-hero';
        }
        
        fadeInObserver.observe(section);
        sidebarObserver.observe(section);
    });

    // Ensure key-features section has ID
    const keyFeaturesSection = document.querySelector('.key-features');
    if (keyFeaturesSection && !keyFeaturesSection.id) {
        keyFeaturesSection.id = 'key-features';
    }
}

// ===== PARALLAX EFFECT FOR BACKGROUNDS =====
function applyParallax() {
    const parallaxSections = [
        { section: '.key-features', bg: '.key-features .parallax-bg' },
        { section: '.services', bg: '#services-parallax-bg' },
        { section: '.faq-interview', bg: '#faq-parallax-bg' }
    ];

    parallaxSections.forEach(({ section, bg }) => {
        const sectionEl = document.querySelector(section);
        const parallaxBg = document.querySelector(bg);
        
        if (!sectionEl || !parallaxBg) return;

        const speed = 0.3;
        let ticking = false;

        function updateParallax() {
            const rect = sectionEl.getBoundingClientRect();
            const offsetTop = rect.top + window.scrollY;
            const scrollPosition = window.scrollY - offsetTop;
            
            parallaxBg.style.backgroundPositionY = -(scrollPosition * speed) + "px";
            ticking = false;
        }

        window.addEventListener("scroll", () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
        
        updateParallax();
    });
}

// Check viewport and apply parallax
function checkViewport() {
    if (window.matchMedia("(min-width: 480px)").matches) {
        applyParallax();
    }
}

checkViewport();
window.addEventListener("resize", checkViewport);

// ===== MOBILE MENU TOGGLE =====
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });
}

// ===== SLIDER FUNCTIONALITY =====
const sliderItems = document.querySelectorAll('.slider .list .item');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

if (sliderItems.length > 0 && prevBtn && nextBtn) {
    let active = 0;
    const lastPosition = sliderItems.length - 1;

    const setSlider = () => {
        const oldActive = document.querySelector('.slider .list .item.active');
        if (oldActive) oldActive.classList.remove('active');
        
        sliderItems[active].classList.add('active');
        
        // Show/hide navigation buttons
        prevBtn.classList.toggle('d-none', active === 0);
        nextBtn.classList.toggle('d-none', active === lastPosition);
    };

    nextBtn.addEventListener('click', () => {
        if (active < lastPosition) {
            active++;
            setSlider();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (active > 0) {
            active--;
            setSlider();
        }
    });

    setSlider(); // Initialize
}

// ===== SLIDER DIAMETER CALCULATION =====
function setDiameter() {
    const slider = document.querySelector('.slider');
    if (slider) {
        const width = slider.offsetWidth;
        const height = slider.offsetHeight;
        const diameter = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
        document.documentElement.style.setProperty('--diameter', diameter + 'px');
    }
}

setDiameter();
window.addEventListener('resize', setDiameter);

// ===== CONTACT FORM MAILTO =====
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const phone = document.getElementById('contact-phone').value;
        const subject = document.getElementById('contact-subject').value;
        const message = document.getElementById('contact-message').value;

        const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
        const mailtoLink = `mailto:${encodeURIComponent('Kc Casipit')}%20<casipitkylechristian@gmail.com>?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;
    });
}