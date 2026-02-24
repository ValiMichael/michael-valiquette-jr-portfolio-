// ===== NAVIGATION SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE NAVIGATION =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SKILL BARS ANIMATION =====
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

// ===== FADE IN ANIMATION ON SCROLL =====
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.portfolio-item, .patent-card, .timeline-item, .award-card').forEach(item => {
    fadeObserver.observe(item);
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Create mailto link
    const subject = encodeURIComponent(data.subject);
    const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );
    const mailtoLink = `mailto:valimichael84@gmail.com?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    // Optional: Show success message
    alert('Opening your email client. If it doesn\'t open automatically, please email me directly at valimichael84@gmail.com');

    // Reset form
    contactForm.reset();
});

// ===== DYNAMIC STATS COUNTER =====
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const finalValue = stat.textContent;
                animateValue(stat, finalValue);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

function animateValue(element, finalValue) {
    const isPercentage = finalValue.includes('%');
    const isPlus = finalValue.includes('+');
    const isDollar = finalValue.includes('$');
    const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));

    let currentValue = 0;
    const increment = numericValue / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(timer);
        }

        let displayValue = Math.floor(currentValue);
        if (isDollar) displayValue = '$' + displayValue.toLocaleString();
        if (isPlus) displayValue += '+';
        if (isPercentage) displayValue += '%';

        element.textContent = displayValue;
    }, stepTime);
}

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
});

// ===== PORTFOLIO ITEM FILTER (Optional Enhancement) =====
// You can add filter buttons if needed
const portfolioItems = document.querySelectorAll('.portfolio-item');

function filterPortfolio(category) {
    portfolioItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== ACTIVE NAVIGATION HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===== COPY EMAIL ON CLICK =====
document.querySelectorAll('.contact-details a[href^="mailto"]').forEach(emailLink => {
    emailLink.addEventListener('click', (e) => {
        const email = e.target.textContent;
        navigator.clipboard.writeText(email).then(() => {
            // Optional: Show copied notification
            const originalText = e.target.textContent;
            e.target.textContent = 'Copied!';
            setTimeout(() => {
                e.target.textContent = originalText;
            }, 2000);
        });
    });
});

// ===== PORTFOLIO IMAGE LAZY LOADING =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== CURSOR TRAIL EFFECT (Optional Enhancement) =====
// Uncomment if you want an interactive cursor effect
/*
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

circles.forEach(function (circle) {
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener("mousemove", function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";
        circle.style.scale = (circles.length - index) / circles.length;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
}

animateCircles();
*/

console.log('Portfolio website loaded successfully! 🚀');
