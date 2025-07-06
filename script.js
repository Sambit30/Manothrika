// Theme Management
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

// Get saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
  
  // Prevent body scroll when menu is open on mobile
  if (navMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Optional: Hide navbar on scroll down, show on scroll up
  if (window.innerWidth > 768) {
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
  }
  lastScrollTop = scrollTop;
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) {
        navLink.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', highlightNavLink);

// Project filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    
    const filterValue = button.getAttribute('data-filter');
    
    projectCards.forEach((card, index) => {
      if (filterValue === 'all') {
        card.classList.remove('hidden');
        // Stagger animation for better visual effect
        setTimeout(() => {
          card.style.animation = 'fadeInUp 0.6s ease-out';
        }, index * 100);
      } else {
        const cardCategory = card.getAttribute('data-category');
        if (cardCategory === filterValue) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.animation = 'fadeInUp 0.6s ease-out';
          }, index * 100);
        } else {
          card.classList.add('hidden');
        }
      }
    });
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Contact form handling with enhanced UX
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const submitText = submitButton.querySelector('.submit-text');
  const originalText = submitText.textContent;
  
  // Form validation
  const requiredFields = contactForm.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      isValid = false;
      field.style.borderColor = 'var(--terracotta)';
      field.focus();
    } else {
      field.style.borderColor = 'var(--border-color)';
    }
  });
  
  if (!isValid) {
    submitText.textContent = '⚠️ Please fill all required fields';
    setTimeout(() => {
      submitText.textContent = originalText;
    }, 3000);
    return;
  }
  
  // Email validation
  const emailField = contactForm.querySelector('#email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailField.value)) {
    emailField.style.borderColor = 'var(--terracotta)';
    submitText.textContent = '⚠️ Please enter a valid email';
    emailField.focus();
    setTimeout(() => {
      submitText.textContent = originalText;
    }, 3000);
    return;
  }
  
  submitText.innerHTML = '<div class="spinner"></div> Sending...';
  submitButton.disabled = true;
  
  // Simulate API call delay
  setTimeout(() => {
    submitText.textContent = '✅ Message Sent Successfully!';
    submitButton.style.background = 'linear-gradient(135deg, var(--sustainability-green), var(--forest-green))';
    
    // Reset form
    contactForm.reset();
    
    // Reset button after 4 seconds
    setTimeout(() => {
      submitText.textContent = originalText;
      submitButton.disabled = false;
      submitButton.style.background = '';
    }, 4000);
    
    // Show success message
    showNotification('Thank you for your inquiry! We will get back to you within 24 hours.', 'success');
  }, 2000);
});

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? 'var(--sustainability-green)' : 'var(--infrastructure-blue)'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 9999;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 300px;
    font-size: 0.9rem;
    line-height: 1.4;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Slide in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Slide out and remove
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      // Unobserve after animation to improve performance
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.stat-card, .project-card, .testimonial-card').forEach(el => {
  observer.observe(el);
});

// Counter animation for stats
let countersAnimated = false;

function animateCounters() {
  if (countersAnimated) return;
  countersAnimated = true;
  
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = counter.textContent;
    const isPercentage = target.includes('%');
    const isRating = target.includes('/');
    const isPlus = target.includes('+');
    
    let numericTarget;
    if (isPercentage) {
      numericTarget = parseInt(target.replace('%', ''));
    } else if (isRating) {
      numericTarget = parseFloat(target.split('/')[0]);
    } else if (isPlus) {
      numericTarget = parseInt(target.replace('+', ''));
    } else {
      numericTarget = parseInt(target);
    }
    
    let current = 0;
    const increment = numericTarget / 60; // 60 frames for 1 second animation
    
    const updateCounter = () => {
      if (current < numericTarget) {
        current += increment;
        if (isPercentage) {
          counter.textContent = Math.ceil(current) + '%';
        } else if (isRating) {
          counter.textContent = current.toFixed(1) + '/5';
        } else if (isPlus) {
          counter.textContent = Math.ceil(current) + '+';
        } else {
          counter.textContent = Math.ceil(current);
        }
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.highlights');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
    }
  });
}, { threshold: 0.5 });

if (statsSection) {
  statsObserver.observe(statsSection);
}

// Handle window resize for responsive behavior
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    // Reset navbar transform on resize
    navbar.style.transform = 'translateY(0)';
  }, 250);
});

// Handle touch events for better mobile experience
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchStartY - touchEndY;
  const minSwipeDistance = 50;
  
  // Close mobile menu on swipe up
  if (swipeDistance > minSwipeDistance && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      const src = img.getAttribute('data-src');
      if (src) {
        img.src = src;
        img.onload = () => {
          img.style.opacity = '1';
        };
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    }
  });
});

lazyImages.forEach(img => {
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.3s ease';
  imageObserver.observe(img);
});

images.forEach(img => {
  imageObserver.observe(img);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Set initial active nav link
  highlightNavLink();
  
  // Add smooth reveal animations
  const revealElements = document.querySelectorAll('.section-header, .intro-content, .contact-info');
  revealElements.forEach(el => {
    observer.observe(el);
  });
  
  // Preload critical images
  const criticalImages = [
    'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
  
  console.log('Manothrika Infra website loaded successfully! 🏗️');
});

// Service Worker registration for better performance (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful');
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed');
      });
  });
}












