// ===========================
// Scroll Effects
// ===========================
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScrollY = window.scrollY;
});

// ===========================
// Navigation Active State
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

function updateActiveNav() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
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

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// ===========================
// Smooth Scroll
// ===========================
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===========================
// Job Tabs - Removed (now showing all experiences)
// ===========================
// No longer needed as experiences are displayed simultaneously

// ===========================
// Scroll Reveal Animation
// ===========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// ===========================
// Fade In on Load
// ===========================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.3s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// ===========================
// Email Link Copy
// ===========================
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const email = link.getAttribute('href').replace('mailto:', '');
    
    // Try to copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        // Optional: Show a tooltip or notification
        console.log('Email copied to clipboard!');
      }).catch(err => {
        console.log('Could not copy email:', err);
      });
    }
  });
});

// ===========================
// Spotlight Cursor Effect
// ===========================
const spotlight = document.createElement('div');
spotlight.className = 'spotlight-cursor';
spotlight.style.cssText = `
  width: 800px;
  height: 800px;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  background: radial-gradient(circle, rgba(100, 255, 218, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
  opacity: 0;
`;
document.body.appendChild(spotlight);

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  spotlight.style.opacity = '1';
  spotlight.style.left = mouseX + 'px';
  spotlight.style.top = mouseY + 'px';
});

document.addEventListener('mouseleave', () => {
  spotlight.style.opacity = '0';
});

// Re-show spotlight when mouse enters
document.addEventListener('mouseenter', () => {
  spotlight.style.opacity = '1';
});

// ===========================
// Hover Effects for Experience and Projects
// ===========================
const hoverItems = document.querySelectorAll('.job-item, .project-item');

hoverItems.forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.backgroundColor = 'rgba(100, 255, 218, 0.05)';
    this.style.boxShadow = '0 4px 20px rgba(100, 255, 218, 0.1)';
    this.style.borderRadius = '8px';
    this.style.transform = 'translateY(-2px)';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.backgroundColor = 'transparent';
    this.style.boxShadow = 'none';
    this.style.transform = 'translateY(0)';
  });
});

// ===========================
// Preload Critical Content
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  // Preload any images or resources
  const images = document.querySelectorAll('img[data-src]');
  
  images.forEach(img => {
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
  });
});

// ===========================
// Performance Optimization
// ===========================
let ticking = false;

function requestTick(callback) {
  if (!ticking) {
    requestAnimationFrame(() => {
      callback();
      ticking = false;
    });
    ticking = true;
  }
}

// Throttle scroll events
window.addEventListener('scroll', () => {
  requestTick(() => {
    updateActiveNav();
  });
}, { passive: true });

// ===========================
// Accessibility Enhancements
// ===========================
// Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#content';
skipLink.className = 'skip-to-content';
skipLink.textContent = 'Skip to content';
skipLink.style.cssText = `
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--green);
  color: var(--dark-navy);
  padding: 8px;
  text-decoration: none;
  z-index: 100;
  transition: top 0.3s;
`;

skipLink.addEventListener('focus', () => {
  skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
  skipLink.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// ===========================
// Console Easter Egg
// ===========================
console.log('%c👋 Hello there!', 'color: #64ffda; font-size: 20px; font-weight: bold;');
console.log('%cLooking for something? Check out the source code on GitHub!', 'color: #8892b0; font-size: 14px;');
console.log('%chttps://github.com/bhuva2002', 'color: #64ffda; font-size: 14px;');

// Made with Bob
