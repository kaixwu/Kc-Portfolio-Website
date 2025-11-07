// functionality for accordion in tech stack in projects 
const accordions = document.querySelectorAll('.tech-accordion');
accordions.forEach(accordion => {
    const header = accordion.querySelector('.tech-header');
    
    header.addEventListener('click', () => {
        
        accordions.forEach(otherAcc => {
            if (otherAcc !== accordion) {
                otherAcc.classList.remove('active');
                otherAcc.querySelector('.tech-content').style.maxHeight = '0px';
            }
        });

        
        accordion.classList.toggle('active');
        
        const content = accordion.querySelector('.tech-content');
        if (accordion.classList.contains('active')) {
            
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            
            content.style.maxHeight = '0px';
        }
    });
});

// this enables the fade-in effect in pages
const sections = document.querySelectorAll('.project-hero, .project-details, .project-nav');
const sidebarLinks = document.querySelectorAll('.project-sidebar a');


const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        } else {
           
            entry.target.classList.remove('is-visible');
        }
    });
}, { threshold: 0.1 }); 

// sidebar in projects functionality
const sidebarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            sidebarLinks.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === `#${entry.target.id}`) {
                    link.classList.add('active-link');
                }
            });
        }
    });
}, { 
    rootMargin: '-50% 0px -50% 0px'
});


sections.forEach(section => {
    
    if (!section.id) {
        if (section.classList.contains('project-details')) section.id = 'project-details';
        if (section.classList.contains('key-features')) section.id = 'key-features';
        if (section.classList.contains('project-hero')) section.id = 'project-hero';
    }
    
    fadeInObserver.observe(section);
    
    if (section.id === 'project-hero' || section.id === 'project-details') {
        sidebarObserver.observe(section);
    }
});

            
const keyFeaturesSection = document.querySelector('.key-features');
if (keyFeaturesSection) {
    keyFeaturesSection.id = 'key-features';
    sidebarObserver.observe(keyFeaturesSection);
}


// parallax effect for background images
function applyParallax() {
    let section = document.querySelector('.key-features');
    let parallaxBg = document.querySelector('.parallax-bg');
    
    if (!section || !parallaxBg) return;

    let speed = 0.3; 

    function updateParallax() {
        let rect = section.getBoundingClientRect();
        let offsetTop = rect.top + window.scrollY;
        let scrollPosition = window.scrollY - offsetTop;

       
        parallaxBg.style.backgroundPositionY = -(scrollPosition * speed) + "px";
    }

    window.addEventListener("scroll", function() {
        requestAnimationFrame(updateParallax);
    });
    
    updateParallax();
}


function checkViewport() {
    if (window.matchMedia("(min-width: 480px)").matches) {
        applyParallax();
    }
}
checkViewport();
window.addEventListener("resize", checkViewport);


// for clicking the toggle of menu in mobile and tablet devices
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');


menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x')
    navbar.classList.toggle('active');
}


// for slider functionality
let items = document.querySelectorAll('.slider .list .item');
let prevBtn = document.getElementById('prev');
let nextBtn = document.getElementById('next');
let lastPosition = items.length - 1;
let firstPosition = 0;
let active = 0;

nextBtn.onclick = () => {
    active = active + 1;
    setSlider();
}
prevBtn.onclick = () => {
    active = active - 1;
    setSlider();
}
const setSlider = () => {
    let oldActive = document.querySelector('.slider .list .item.active');
    if(oldActive) oldActive.classList.remove('active');
    items[active].classList.add('active');
    // 
    nextBtn.classList.remove('d-none');
    prevBtn.classList.remove('d-none');
    if(active == lastPosition) nextBtn.classList.add('d-none');
    if(active == firstPosition) prevBtn.classList.add('d-none');
}
setSlider();


const setDiameter = () => {
    let slider = document.querySelector('.slider');
    let widthSlider = slider.offsetWidth;
    let heightSlider = slider.offsetHeight;
    let diameter = Math.sqrt(Math.pow(widthSlider, 2) + Math.pow(heightSlider, 2));
    document.documentElement.style.setProperty('--diameter', diameter+'px');
}
setDiameter();
window.addEventListener('resize', () => {
    setDiameter();
})

// for frequently asked questions' toggle functionality
const toggles = document.querySelectorAll(".faq-toggle");

toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
        toggle.parentNode.classList.toggle("active");
    })
})


// working mailto: 'my personal gmail' and then the filled content are automatically there in the email
const contactForm = document.getElementById('contact-form');


if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        
        
        e.preventDefault();
        
        
        const recipientEmail = 'casipitkylechristian@gmail.com';
        const recipientName = encodeURIComponent('Kc Casipit');
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const phone = document.getElementById('contact-phone').value;
        const subject = document.getElementById('contact-subject').value;
        const message = document.getElementById('contact-message').value;

        const body = `
Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
        `;

        
        const mailtoLink = `mailto:${recipientName}%20<${recipientEmail}>?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        
        window.location.href = mailtoLink;
    });
}