// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Add animation to sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section:not(#hero)');
  
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
});

// Enhanced counter animation for stats and funding amounts
function animateCounter(element, targetValue, duration = 2000, isDecimal = false, prefix = '', suffix = '') {
  const startTime = performance.now();
  const startValue = 0;
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Use easeOutExpo for smooth deceleration
    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const currentValue = startValue + (targetValue * easeProgress);
    
    if (isDecimal) {
      element.textContent = prefix + currentValue.toFixed(1) + suffix;
    } else {
      element.textContent = prefix + Math.floor(currentValue).toLocaleString() + suffix;
    }
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      // Ensure final exact value
      if (isDecimal) {
        element.textContent = prefix + targetValue.toFixed(1) + suffix;
      } else {
        element.textContent = prefix + targetValue.toLocaleString() + suffix;
      }
    }
  }
  
  requestAnimationFrame(updateCounter);
}

// Counter animation for crisis stats
function animateCrisisStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(element => {
    const originalText = element.textContent.trim();
    let targetValue, prefix = '', suffix = '';
    
    if (originalText === '60M') {
      targetValue = 60;
      suffix = 'M';
    } else if (originalText === '49,500') {
      targetValue = 49500;
    } else if (originalText === '41%') {
      targetValue = 41;
      suffix = '%';
    } else if (originalText === '76%') {
      targetValue = 76;
      suffix = '%';
    } else if (originalText === '↓23%') {
      targetValue = 23;
      prefix = '↓';
      suffix = '%';
    }
    
    // Reset to 0 and start animation
    element.textContent = prefix + '0' + suffix;
    animateCounter(element, targetValue, 2500, false, prefix, suffix);
  });
}

// Counter animation for funding amounts
function animateFundingAmounts() {
  const fundingNumbers = document.querySelectorAll('.allocation-amount');
  
  fundingNumbers.forEach(element => {
    const originalText = element.textContent.trim();
    let targetValue;
    
    if (originalText === '$800K') {
      targetValue = 800;
      animateCounter(element, targetValue, 2000, false, '$', 'K');
    } else if (originalText === '$400K') {
      targetValue = 400;
      animateCounter(element, targetValue, 2000, false, '$', 'K');
    } else if (originalText === '$300K') {
      targetValue = 300;
      animateCounter(element, targetValue, 2000, false, '$', 'K');
    } else if (originalText === '$500K') {
      targetValue = 500;
      animateCounter(element, targetValue, 2000, false, '$', 'K');
    }
  });
  
  // Animate the main campaign goal
  const campaignGoal = document.querySelector('.campaign-goal h3');
  if (campaignGoal) {
    campaignGoal.textContent = 'Campaign Goal: $0 Million (2025–2026)';
    animateCounter({
      textContent: '',
      set textContent(value) {
        campaignGoal.textContent = `Campaign Goal: ${value} Million (2025–2026)`;
      }
    }, 2.5, 2500, true, '$', '');
  }
}

// Trigger counter animations when sections are visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('crisis')) {
        animateCrisisStats();
      } else if (entry.target.classList.contains('funding')) {
        animateFundingAmounts();
      }
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

// Observe the crisis and funding sections
document.addEventListener('DOMContentLoaded', () => {
  const crisisSection = document.querySelector('.crisis');
  const fundingSection = document.querySelector('.funding');
  
  if (crisisSection) statsObserver.observe(crisisSection);
  if (fundingSection) statsObserver.observe(fundingSection);
});

// Add hover effects to step items
document.querySelectorAll('.step-item').forEach((item, index) => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateY(0) scale(1)';
  });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-background');
  const rate = scrolled * -0.5;
  
  if (hero) {
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Form validation (if forms are added later)
function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
  });
  
  return isValid;
}

// Add loading states to buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Only add loading state for actual form submissions or external links
    if (this.href && !this.href.startsWith('#')) {
      this.style.opacity = '0.7';
      this.style.pointerEvents = 'none';
      
      // Reset after 2 seconds (in case of navigation issues)
      setTimeout(() => {
        this.style.opacity = '1';
        this.style.pointerEvents = 'auto';
      }, 2000);
    }
  });
});

// Enhanced neural pattern animation
function createNeuralNodes() {
  const pattern = document.querySelector('.neural-pattern');
  if (!pattern) return;
  
  // Create floating nodes for enhanced visual effect
  for (let i = 0; i < 5; i++) {
    const node = document.createElement('div');
    node.className = 'neural-node';
    node.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(229, 192, 123, 0.6);
      border-radius: 50%;
      animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
    `;
    pattern.appendChild(node);
  }
}

// Add CSS for neural nodes animation
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
    50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
  }
`;
document.head.appendChild(style);

// Initialize neural nodes
document.addEventListener('DOMContentLoaded', createNeuralNodes);