// ================= Image Slider =================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;
    slides[currentSlide].classList.add('active');
}
function changeSlide(dir) { showSlide(currentSlide + dir); }
setInterval(() => changeSlide(1), 5000);

// ================= AOS =================
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({ duration: 900, once: true, offset: 80, easing: 'ease-out-cubic' });
});

// ================= Typed.js =================
if (document.getElementById('typed-text')) {
    new Typed('#typed-text', {
        strings: ['UX/UI Designer'],
        typeSpeed: 80,
        loop: false,
        showCursor: true,
        cursorChar: '_'
    });
}

// ================= Scroll Progress Bar =================
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.body.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrolled / total * 100) + '%';
});

// ================= Cursor Glow (desktop) =================
const cursorGlow = document.createElement('div');
cursorGlow.id = 'cursor-glow';
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top  = e.clientY + 'px';
});

// ================= Floating Particles Canvas =================
(function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');

    let W, H, particles = [];
    const COUNT = window.innerWidth < 768 ? 30 : 70;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function randomColor() {
        const palette = [
            'rgba(128,0,0,',
            'rgba(255,215,0,',
            'rgba(163,21,38,',
            'rgba(200,160,80,'
        ];
        return palette[Math.floor(Math.random() * palette.length)];
    }

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x     = Math.random() * W;
            this.y     = Math.random() * H;
            this.r     = Math.random() * 2 + 0.5;
            this.alpha = Math.random() * 0.5 + 0.1;
            this.vx    = (Math.random() - 0.5) * 0.4;
            this.vy    = (Math.random() - 0.5) * 0.4;
            this.color = randomColor();
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.alpha + ')';
            ctx.fill();
        }
    }

    for (let i = 0; i < COUNT; i++) particles.push(new Particle());

    // draw connecting lines between close particles
    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(128,0,0,${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
    }

    function loop() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        drawLines();
        requestAnimationFrame(loop);
    }
    loop();
})();

// ================= Active Nav Highlight on Scroll =================
(function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.top-nav a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(a => a.classList.remove('active'));
                const active = document.querySelector(`.top-nav a[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
})();

// ================= Magnetic Button Effect =================
document.querySelectorAll('.btn-gold').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width  / 2;
        const y = e.clientY - rect.top  - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px) scale(1.04)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// ================= Stagger card entrance =================
(function staggerCards() {
    const cards = document.querySelectorAll('.project-card, .contact-card, .skill-group, .info-card');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = (i % 4) * 0.08 + 's';
                entry.target.classList.add('card-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    cards.forEach(c => obs.observe(c));
})();
