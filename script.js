/* ===================================================
   VASUNDHARA MATHS COACHING — JAVASCRIPT
   =================================================== */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  if (navMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.4, rootMargin: '-80px 0px 0px 0px' });

sections.forEach(section => observer.observe(section));

// ---- Hero floating particles ----
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 3 + 1;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 12 + 8) + 's';
    p.style.animationDelay = (Math.random() * 12) + 's';
    p.style.opacity = Math.random() * 0.4 + 0.1;
    // Occasionally make them gold
    if (Math.random() > 0.7) {
      p.style.background = 'rgba(240, 165, 0, 0.4)';
    } else if (Math.random() > 0.5) {
      p.style.background = 'rgba(11, 143, 172, 0.5)';
    }
    container.appendChild(p);
  }
}
createParticles();

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navH = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Scroll-reveal animation ----
const revealElements = document.querySelectorAll(
  '.class-card, .review-card, .contact-info-card, .contact-form-card, .about-school-card, .highlight-item'
);
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = entry.target.style.transform
        ? entry.target.style.transform.replace('translateY(30px)', 'translateY(0)')
        : 'translateY(0)';
      entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transitionDelay = (i % 3) * 0.1 + 's';
  revealObserver.observe(el);
});

// ---- Counter animation for hero stats ----
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const suffix = el.dataset.suffix || '';
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + suffix;
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-number');
      nums.forEach(num => {
        const text = num.textContent;
        const numVal = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[\d]/g, '');
        num.dataset.suffix = suffix;
        animateCounter(num, numVal);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ---- Contact Form submit handler ----
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('contactSubmitBtn');
  const successMsg = document.getElementById('formSuccess');

  // Simple validation
  const name = document.getElementById('contactName').value.trim();
  const phone = document.getElementById('contactPhone').value.trim();
  const cls = document.getElementById('contactClass').value;
  const board = document.getElementById('contactBoard').value;

  if (!name || !phone || !cls || !board) return;

  // Animate button
  btn.innerHTML = '<span>Sending...</span>';
  btn.style.opacity = '0.7';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = `<span>Message Sent!</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>`;
    btn.style.opacity = '1';
    btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
    successMsg.style.display = 'block';

    // Reset after 5 seconds
    setTimeout(() => {
      e.target.reset();
      btn.innerHTML = `<span>Send Message</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>`;
      btn.style.background = '';
      btn.disabled = false;
      successMsg.style.display = 'none';
    }, 5000);
  }, 1200);
}

// ---- Highlight active class card on hover ----
document.querySelectorAll('.class-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    document.querySelectorAll('.class-card').forEach(c => {
      if (c !== card) c.style.opacity = '0.75';
    });
  });
  card.addEventListener('mouseleave', () => {
    document.querySelectorAll('.class-card').forEach(c => {
      c.style.opacity = '1';
    });
  });
});

// ---- Register button click ripple effect ----
document.querySelectorAll('.btn-primary, .btn-register').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height) * 2;
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px; height: ${size}px;
      left: ${e.clientX - rect.left - size/2}px;
      top: ${e.clientY - rect.top - size/2}px;
      background: rgba(255,255,255,0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: rippleAnim 0.6s linear;
      pointer-events: none;
    `;
    if (!this.style.position || this.style.position === 'static') {
      this.style.position = 'relative';
    }
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleAnim {
    to { transform: scale(1); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ---- Page load animation ----
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
