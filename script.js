document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        if (document.getElementById('element')) {
            var typed = new Typed('#element', {
                strings: [
                    'Full Stack Developer 💻',
                    'Frontend Developer 🎨',
                    'Web Developer 🌐',
                    'Backend Developer ⚙️',
                    'Tech Explorer 🚀'
                ],
                typeSpeed: 60,
                backSpeed: 40,
                backDelay: 1500,
                loop: true,
                cursorChar: '█',
                smartBackspace: true
            });
        }
    }, 2800); // Wait for loading screen to finish
});

// ===== LOADING SCREEN =====
window.addEventListener('load', function() {
    setTimeout(function() {
        var landing = document.getElementById('landing');
        var mainContent = document.getElementById('main-content');
        
        if (landing) {
            landing.classList.add('hide');
            setTimeout(function() {
                landing.style.display = 'none';
                if (mainContent) {
                    mainContent.classList.add('loaded');
                }
                // Trigger scroll animations
                revealSections();
            }, 800);
        }
    }, 2500); // Show loading screen for 2.5 seconds
});

// ===== SCROLL REVEAL ANIMATIONS =====
function revealSections() {
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.project-card');
    const elements = [...sections, ...cards];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger effect for project cards
                if (entry.target.classList.contains('project-card')) {
                    const allCards = document.querySelectorAll('.project-card');
                    allCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ===== NAVBAR ACTIVE LINK HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('.links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== NEON CURSOR TRAIL =====
const cursorTrail = document.createElement('div');
cursorTrail.classList.add('cursor-trail');
document.body.appendChild(cursorTrail);

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateTrail() {
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;
    
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';
    
    requestAnimationFrame(animateTrail);
}

animateTrail();

// ===== PARALLAX EFFECT ON HERO =====
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.firstsection');
    if (hero) {
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        hero.style.transform = `translate(${x}px, ${y}px)`;
    }
});

// ===== PROJECT CARD 3D TILT EFFECT =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * -10;
        const rotateY = (x - centerX) / centerX * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

console.log('🔥 Portfolio V2 - Cyberpunk Edition Loaded!');
