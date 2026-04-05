// assets/js/script.js
// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) setTimeout(() => { preloader.style.opacity = '0'; setTimeout(() => preloader.style.display = 'none', 500); }, 500);
});

// Burger Menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); navLinks?.classList.remove('active'); }
    });
});

// Scroll Reveal
const revealElements = document.querySelectorAll('.scroll-reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('revealed'); });
}, { threshold: 0.1 });
revealElements.forEach(el => revealObserver.observe(el));

// Sticky Navbar
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) navbar.style.top = '0';
        else navbar.style.top = '20px';
        lastScroll = currentScroll;
    }
});

// Close modal on outside click
window.addEventListener('click', (e) => { const modal = document.getElementById('infoModal'); if (e.target === modal) modal.style.display = 'none'; });