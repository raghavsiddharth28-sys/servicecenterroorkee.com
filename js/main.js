/**
 * Service Center Roorkee - Main JavaScript
 * Handles responsive mobile navigation, FAQ accordion toggles,
 * client-side booking inquiry form feedback, and scroll-to-top button.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer') || document.getElementById('mobileDrawer');

  if (mobileMenuBtn && mobileNavDrawer) {
    const closeDrawer = () => {
      mobileNavDrawer.classList.remove('active');
      mobileMenuBtn.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    const openDrawer = () => {
      mobileNavDrawer.classList.add('active');
      mobileMenuBtn.classList.add('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileNavDrawer.classList.contains('active');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    // Close mobile drawer when clicking any link inside it
    const drawerLinks = mobileNavDrawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    // Close drawer when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNavDrawer.classList.contains('active')) {
        closeDrawer();
      }
    });

    // Close drawer when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileNavDrawer.classList.contains('active') && 
          !mobileNavDrawer.contains(e.target) && 
          !mobileMenuBtn.contains(e.target)) {
        closeDrawer();
      }
    });
  }

  // 2. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Optional: close other items for single-open behavior
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        item.classList.toggle('active');
        questionBtn.setAttribute('aria-expanded', !isActive);
      });
    }
  });

  // 3. Scroll to Top Button
  let backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) {
    // If not present in HTML, dynamically inject it for seamless site-wide support
    backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTopBtn';
    backToTopBtn.className = 'back-to-top-btn';
    backToTopBtn.setAttribute('aria-label', 'Scroll back to top');
    backToTopBtn.innerHTML = `
      <svg viewBox="0 0 24 24"><path d="M12 4l-8 8h5v8h6v-8h5z"/></svg>
    `;
    document.body.appendChild(backToTopBtn);
  }

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. Booking Enquiry Form UI
  const bookingForms = document.querySelectorAll('.booking-form');
  bookingForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('[name="customer_name"]');
      const phoneInput = form.querySelector('[name="customer_phone"]');
      const areaInput = form.querySelector('[name="customer_area"]');
      const applianceSelect = form.querySelector('[name="appliance_type"]');
      const problemInput = form.querySelector('[name="problem_desc"]');
      const alertBox = form.querySelector('.form-alert');

      const name = nameInput ? nameInput.value.trim() : 'Customer';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const area = areaInput ? areaInput.value.trim() : 'Roorkee';
      const appliance = applianceSelect ? applianceSelect.options[applianceSelect.selectedIndex].text : 'Appliance';

      if (!phone || phone.length < 10) {
        alert('Please enter a valid 10-digit mobile number so the local technician team can reach you.');
        return;
      }

      // Display clean, friendly, realistic response
      if (alertBox) {
        alertBox.className = 'form-alert success';
        alertBox.innerHTML = `
          <strong>Thank you, ${name}!</strong><br>
          We have received your service request for <strong>${appliance}</strong> in <strong>${area}</strong>.<br>
          A local technician will call you on <strong>${phone}</strong> shortly to confirm availability and schedule the inspection visit.
        `;
        alertBox.style.display = 'block';

        // Reset inputs
        form.reset();

        // Scroll to alert smoothly
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
});

