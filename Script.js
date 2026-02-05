
modern_js = '''/**
 * Phone Repairs Tulsa - Modern JavaScript (2025)
 * Features: Performance optimized, accessibility first, ES6+ modules pattern
 */

// Use strict mode for better error catching
'use strict';

// Configuration object
const CONFIG = {
  businessEmail: 'phonerepairstulsa@gmail.com',
  phoneNumber: '+19183760093',
  estimatePricing: {
    "Screen Replacement": { 
      iPhone: [119, 249], 
      Samsung: [129, 279], 
      "Google Pixel": [129, 269], 
      "Other Android": [99, 229] 
    },
    "Battery Replacement": { 
      iPhone: [59, 129], 
      Samsung: [69, 139], 
      "Google Pixel": [69, 149], 
      "Other Android": [49, 129] 
    },
    "Charging Port Repair": { 
      iPhone: [69, 159], 
      Samsung: [79, 169], 
      "Google Pixel": [79, 169], 
      "Other Android": [59, 149] 
    },
    "Water Damage Diagnostic": { 
      iPhone: [39, 89], 
      Samsung: [39, 89], 
      "Google Pixel": [39, 89], 
      "Other Android": [39, 89] 
    },
    "Camera / Mic / Speaker": { 
      iPhone: [69, 199], 
      Samsung: [79, 219], 
      "Google Pixel": [79, 219], 
      "Other Android": [59, 189] 
    }
  }
};

// Utility functions
const utils = {
  // Debounce function for performance
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Format phone number for display
  formatPhone: (phone) => {
    const cleaned = phone.replace(/\\D/g, '');
    const match = cleaned.match(/^(\\d{3})(\\d{3})(\\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
  },

  // Smooth scroll polyfill for Safari
  smoothScroll: (target, offset = 80) => {
    const element = document.querySelector(target);
    if (!element) return;
    
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Navigation Module
const Navigation = {
  init() {
    this.toggle = document.getElementById('menuToggle');
    this.menu = document.getElementById('menu');
    this.header = document.querySelector('.header');
    
    if (!this.toggle || !this.menu) return;
    
    this.bindEvents();
    this.setupScrollEffect();
  },

  bindEvents() {
    // Toggle menu
    this.toggle.addEventListener('click', () => this.toggleMenu());
    
    // Close menu when clicking links
    this.menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.menu.contains(e.target) && !this.toggle.contains(e.target)) {
        this.closeMenu();
      }
    });
    
    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.closeMenu();
      }
    });
  },

  toggleMenu() {
    const isOpen = this.menu.classList.toggle('open');
    this.toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  },

  closeMenu() {
    this.menu.classList.remove('open');
    this.toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  },

  isOpen() {
    return this.menu.classList.contains('open');
  },

  setupScrollEffect() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', utils.debounce(() => {
      const currentScroll = window.pageYOffset;
      
      // Add/remove scrolled class for styling
      if (currentScroll > 50) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    }, 16)); // ~60fps
  }
};

// Estimate Calculator Module
const EstimateCalculator = {
  init() {
    this.form = document.getElementById('estimateForm');
    this.result = document.getElementById('estimateResult');
    this.deviceSelect = document.getElementById('device');
    this.issueSelect = document.getElementById('issue');
    
    if (!this.form) return;
    
    this.bindEvents();
  },

  bindEvents() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Real-time updates on change
    [this.deviceSelect, this.issueSelect].forEach(select => {
      select.addEventListener('change', () => {
        if (this.deviceSelect.value && this.issueSelect.value) {
          this.calculate();
        }
      });
    });
  },

  handleSubmit(e) {
    e.preventDefault();
    this.calculate();
  },

  calculate() {
    const device = this.deviceSelect.value;
    const issue = this.issueSelect.value;
    
    if (!device || !issue) {
      this.showError('Please select both device and issue type');
      return;
    }
    
    const pricing = CONFIG.estimatePricing[issue]?.[device];
    
    if (!pricing) {
      this.showContactForm();
      return;
    }
    
    const [low, high] = pricing;
    this.displayEstimate(low, high, device, issue);
  },

  displayEstimate(low, high, device, issue) {
    const avg = Math.round((low + high) / 2);
    
    this.result.classList.add('has-value');
    this.result.innerHTML = `
      <div class="estimate-main">
        <div class="estimate-price">$${low}–$${high}</div>
        <div class="estimate-device">${device} - ${issue}</div>
      </div>
      <div class="estimate-note">
        Final pricing confirmed after inspection. Most ${issue.toLowerCase()} repairs take 15-30 minutes.
        <br>
        <a href="#contact" class="link-arrow" style="margin-top: 12px; display: inline-block;">
          Book this repair →
        </a>
      </div>
    `;
    
    // Smooth scroll to result
    this.result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  },

  showContactForm() {
    this.result.classList.add('has-value');
    this.result.innerHTML = `
      <div class="estimate-main">
        <div style="font-size: 1.25rem; font-weight: 600; margin-bottom: 8px;">Custom Quote Needed</div>
        <div class="estimate-note">
          This device/repair combination requires a custom quote. Contact us for fast pricing!
          <br>
          <a href="tel:${CONFIG.phoneNumber}" class="btn btn-primary" style="margin-top: 16px;">
            Call (918) 376-0093
          </a>
        </div>
      </div>
    `;
  },

  showError(message) {
    this.result.classList.add('has-value');
    this.result.innerHTML = `
      <div style="color: #ef4444; text-align: center;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom: 8px;">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <br>${message}
      </div>
    `;
  }
};

// Contact Form Module
const ContactForm = {
  init() {
    this.form = document.getElementById('contactForm');
    if (!this.form) return;
    
    this.bindEvents();
  },

  bindEvents() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Auto-format phone number
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\\D/g, '');
        if (value.length >= 6) {
          value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6,10)}`;
        } else if (value.length >= 3) {
          value = `(${value.slice(0,3)}) ${value.slice(3)}`;
        }
        e.target.value = value;
      });
    }
  },

  handleSubmit(e) {
    e.preventDefault();
    
    const formData = this.collectData();
    
    if (!this.validate(formData)) {
      return;
    }
    
    this.sendEmail(formData);
  },

  collectData() {
    return {
      name: document.getElementById('name').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      email: document.getElementById('email').value.trim(),
      device: document.getElementById('deviceField').value.trim(),
      issue: document.getElementById('issueField').value.trim(),
      message: document.getElementById('message').value.trim()
    };
  },

  validate(data) {
    const required = ['name', 'phone', 'device', 'issue'];
    const missing = required.filter(field => !data[field]);
    
    if (missing.length > 0) {
      this.showNotification('Please fill in all required fields', 'error');
      return false;
    }
    
    // Phone validation
    const phoneDigits = data.phone.replace(/\\D/g, '');
    if (phoneDigits.length !== 10) {
      this.showNotification('Please enter a valid 10-digit phone number', 'error');
      return false;
    }
    
    return true;
  },

  sendEmail(data) {
    const subject = encodeURIComponent(`Repair Request - ${data.device} (${data.issue})`);
    const body = encodeURIComponent(
`Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email || 'Not provided'}
Device: ${data.device}
Issue: ${data.issue}

Message:
${data.message || 'No additional details provided'}

---
Submitted: ${new Date().toLocaleString()}`
    );
    
    // Open email client
    window.location.href = `mailto:${CONFIG.businessEmail}?subject=${subject}&body=${body}`;
    
    // Show success message
    this.showNotification('Opening your email app... Please send the message to complete your request.', 'success');
    
    // Reset form
    this.form.reset();
  },

  showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.form-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      padding: 16px 20px;
      border-radius: 8px;
      margin-bottom: 16px;
      font-weight: 500;
      animation: slideDown 0.3s ease-out;
      ${type === 'error' ? 'background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3);' : 
        type === 'success' ? 'background: rgba(34, 197, 94, 0.1); color: #22c55e; border: 1px solid rgba(34, 197, 94, 0.3);' :
        'background: rgba(45, 212, 191, 0.1); color: #2dd4bf; border: 1px solid rgba(45, 212, 191, 0.3);'}
    `;
    
    this.form.insertBefore(notification, this.form.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideUp 0.3s ease-out forwards';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }
};

// FAQ Accordion Module (Enhanced)
const FAQ = {
  init() {
    this.items = document.querySelectorAll('.faq-item');
    this.bindEvents();
  },

  bindEvents() {
    this.items.forEach(item => {
      const summary = item.querySelector('summary');
      
      summary.addEventListener('click', (e) => {
        e.preventDefault();
        
        const isOpen = item.open;
        
        // Close all others (optional accordion behavior)
        // this.items.forEach(other => {
        //   if (other !== item && other.open) {
        //     other.open = false;
        //   }
        // });
        
        item.open = !isOpen;
      });
    });
  }
};

// Intersection Observer for animations
const ScrollAnimations = {
  init() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.service-card, .pricing-card, .review-card, .trust-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
    
    // Add CSS for animate-in
    const style = document.createElement('style');
    style.textContent = `
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      @keyframes slideUp {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
      }
    `;
    document.head.appendChild(style);
  }
};

// Year updater
const YearUpdater = {
  init() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }
};

// Smooth scroll for anchor links
const SmoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href !== '#') {
          e.preventDefault();
          utils.smoothScroll(href);
          
          // Update URL without jump
          history.pushState(null, null, href);
        }
      });
    });
  }
};

// Performance monitoring
const Performance = {
  init() {
    // Report Web Vitals
    if ('web-vitals' in window) {
      // Would use web-vitals library if loaded
    }
    
    // Lazy load images
    if ('loading' in HTMLImageElement.prototype) {
      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        img.src = img.dataset.src;
      });
    }
  }
};

// Initialize everything when DOM is ready
const App = {
  init() {
    Navigation.init();
    EstimateCalculator.init();
    ContactForm.init();
    FAQ.init();
    ScrollAnimations.init();
    YearUpdater.init();
    SmoothScroll.init();
    Performance.init();
    
    console.log('📱 Phone Repairs Tulsa - App initialized');
  }
};

// Start the app
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}

// Handle visibility change (pause expensive operations when tab hidden)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations or expensive operations
  } else {
    // Resume
  }
});

// Register service worker for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Silently fail - SW not critical for functionality
    });
  });
}
'''

print("JavaScript length:", len(modern_js))
print("Generated modernized JavaScript with ES6+ features")
