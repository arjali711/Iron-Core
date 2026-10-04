/**
 * IRONCORE FITNESS — Interactive Logic
 * Pure Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. DOM Elements ---
  const header = document.querySelector('.site-header');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTopBtn');
  
  // Modals
  const programModal = document.getElementById('programModal');
  const programModalClose = document.getElementById('programModalClose');
  const programModalBackdrop = document.getElementById('programModal');
  const modalIcon = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalBody = document.getElementById('modalBody');
  const modalHighlightsList = document.getElementById('modalHighlightsList');
  const modalActionBtn = document.getElementById('modalActionBtn');

  // Success Modal
  const successModal = document.getElementById('successModal');
  const successModalClose = document.getElementById('successModalClose');
  const successModalOkBtn = document.getElementById('successModalOkBtn');
  const successDetailsText = document.getElementById('successDetailsText');

  // Pricing Toggle
  const pricingToggleBtn = document.getElementById('pricingToggleBtn');
  const labelMonthly = document.getElementById('labelMonthly');
  const labelAnnual = document.getElementById('labelAnnual');
  const priceBasic = document.getElementById('priceBasic');
  const pricePro = document.getElementById('pricePro');
  const priceElite = document.getElementById('priceElite');
  const periodBasic = document.getElementById('periodBasic');
  const periodPro = document.getElementById('periodPro');
  const periodElite = document.getElementById('periodElite');

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  const inputFullName = document.getElementById('fullName');
  const inputEmail = document.getElementById('email');
  const inputPhone = document.getElementById('phone');
  const selectProgram = document.getElementById('programSelect');
  const inputMessage = document.getElementById('message');
  const submitBtn = document.getElementById('contactSubmitBtn');

  // --- 2. Program Details Data ---
  const programData = {
    'strength-conditioning': {
      title: 'Strength & Conditioning',
      tagline: 'Athletic Performance · 4-5 Days / Week',
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 5v14M18 5v14M2 9v6M22 9v6M10 12h4M6 12h2M16 12h2"/></svg>`,
      description: 'Our flagship athletic program integrates multi-joint barbell compounds, explosive Olympic lifting progressions, and energy system conditioning. Designed to develop raw strength while preserving cardiovascular endurance and resilience.',
      highlights: [
        'Barbell squat, bench press, deadlift & overhead press progression',
        'HIIT & lactic threshold conditioning circuits',
        'Individualized load testing and 1RM auto-regulation',
        'Functional movement screening to eliminate weak links'
      ],
      formValue: 'strength-conditioning'
    },
    'muscle-building': {
      title: 'Muscle Building & Hypertrophy',
      tagline: 'Hypertrophy & Aesthetics · 4-6 Days / Week',
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
      description: 'Structured resistance training focused strictly on mechanical tension, metabolic stress, and progressive overload. We utilize scientifically validated split routines (Upper/Lower or Push/Pull/Legs) to maximize lean muscle gain.',
      highlights: [
        'Optimal volume distribution per muscle group (12-20 weekly sets)',
        'Machine, cable, and dumbbell biomechanics specialization',
        'Custom progressive overload logging and tempo training',
        'Comprehensive muscle recovery & nutritional nutrient timing guidelines'
      ],
      formValue: 'muscle-building'
    },
    'fat-loss': {
      title: 'Fat Loss & Fitness',
      tagline: 'Metabolic Conditioning · 3-5 Days / Week',
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
      description: 'High-density metabolic resistance training paired with aerobic capacity conditioning. Keep heart rates elevated while preserving lean muscle mass, shedding excess fat, and supercharging everyday vitality.',
      highlights: [
        'Compound giant sets & kettlebell conditioning complexes',
        'Heart-rate targeted interval zones (Zone 2 and VO2 max)',
        'Macro-nutrient planning tailored to caloric deficits',
        'Joint-friendly low impact high-output conditioning options'
      ],
      formValue: 'fat-loss'
    },
    'beginner-program': {
      title: 'Beginner Foundations',
      tagline: 'Technique & Confidence · 3 Days / Week',
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m10 15 5-3-5-3v6z"/></svg>`,
      description: 'The definitive on-ramp for anyone new to fitness or returning after a prolonged layoff. Learn proper lifting mechanics, build foundational core stability, and establish sustainable gym habits without feeling overwhelmed.',
      highlights: [
        '1-on-1 coach orientation on gym etiquette and equipment setup',
        'Fundamental movement patterns: hinge, squat, push, pull, carry',
        'Gradual progressive volume with zero fear of injury',
        'Personal coach check-ins every 2 weeks to ensure consistent confidence'
      ],
      formValue: 'beginner-program'
    }
  };

  // --- 3. Sticky Navigation & Scroll Spy ---
  let isScrolled = false;
  const sections = document.querySelectorAll('section[id]');

  function handleScroll() {
    const scrollY = window.pageYOffset;

    // Header background change
    if (scrollY > 40 && !isScrolled) {
      header.classList.add('scrolled');
      isScrolled = true;
    } else if (scrollY <= 40 && isScrolled) {
      header.classList.remove('scrolled');
      isScrolled = false;
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Scroll spy
    const navHeight = header.offsetHeight + 40;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - navHeight;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // --- 4. Mobile Hamburger Drawer ---
  function openMobileMenu() {
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('active');
    mobileBackdrop.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeMobileMenu() {
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('active');
    mobileBackdrop.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = hamburgerBtn.classList.contains('active');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // --- 5. Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();
        const headerOffset = header.offsetHeight + 10;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Back to top button click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 6. Program Learn More Modal ---
  let selectedProgramKey = null;

  function openProgramModal(programKey) {
    const data = programData[programKey];
    if (!data) return;

    selectedProgramKey = programKey;
    modalIcon.innerHTML = data.icon;
    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.tagline;
    modalBody.textContent = data.description;

    // Render highlights
    modalHighlightsList.innerHTML = '';
    data.highlights.forEach(item => {
      const li = document.createElement('div');
      li.className = 'modal-highlight-item';
      li.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-primary); flex-shrink: 0;"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${item}</span>
      `;
      modalHighlightsList.appendChild(li);
    });

    programModal.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeProgramModal() {
    programModal.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  document.querySelectorAll('.program-learn-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const programKey = btn.getAttribute('data-program');
      openProgramModal(programKey);
    });
  });

  if (programModalClose) {
    programModalClose.addEventListener('click', closeProgramModal);
  }

  if (programModal) {
    programModal.addEventListener('click', (e) => {
      if (e.target === programModal) {
        closeProgramModal();
      }
    });
  }

  if (modalActionBtn) {
    modalActionBtn.addEventListener('click', () => {
      closeProgramModal();
      if (selectedProgramKey && programData[selectedProgramKey]) {
        selectProgram.value = programData[selectedProgramKey].formValue;
      }
      // Scroll to contact form
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const offset = header.offsetHeight + 10;
        const targetPos = contactSection.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
        setTimeout(() => {
          inputFullName.focus();
        }, 500);
      }
    });
  }

  // --- 7. Pricing Toggle & Plan Selection ---
  let isAnnual = false;
  const prices = {
    monthly: { basic: '29', pro: '49', elite: '79', period: '/month' },
    annual: { basic: '24', pro: '39', elite: '63', period: '/mo (billed annually)' }
  };

  function updatePricing(annual) {
    isAnnual = annual;
    if (isAnnual) {
      pricingToggleBtn.classList.add('annual');
      pricingToggleBtn.setAttribute('aria-checked', 'true');
      labelAnnual.classList.add('active');
      labelMonthly.classList.remove('active');

      priceBasic.textContent = prices.annual.basic;
      pricePro.textContent = prices.annual.pro;
      priceElite.textContent = prices.annual.elite;

      periodBasic.textContent = prices.annual.period;
      periodPro.textContent = prices.annual.period;
      periodElite.textContent = prices.annual.period;
    } else {
      pricingToggleBtn.classList.remove('annual');
      pricingToggleBtn.setAttribute('aria-checked', 'false');
      labelMonthly.classList.add('active');
      labelAnnual.classList.remove('active');

      priceBasic.textContent = prices.monthly.basic;
      pricePro.textContent = prices.monthly.pro;
      priceElite.textContent = prices.monthly.elite;

      periodBasic.textContent = prices.monthly.period;
      periodPro.textContent = prices.monthly.period;
      periodElite.textContent = prices.monthly.period;
    }
  }

  if (pricingToggleBtn) {
    pricingToggleBtn.addEventListener('click', () => {
      updatePricing(!isAnnual);
    });
  }

  // Pricing buttons connect directly to contact form
  document.querySelectorAll('.pricing-select-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const planName = this.getAttribute('data-plan') || 'Pro';
      const billingCycle = isAnnual ? 'Annual (20% off)' : 'Monthly';
      
      // Auto-fill message or select
      if (inputMessage) {
        inputMessage.value = `Hi, I am interested in joining the ${planName} membership plan (${billingCycle}). Please confirm my free trial pass.`;
      }
      
      // Scroll to contact form
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const offset = header.offsetHeight + 10;
        const targetPos = contactSection.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
        setTimeout(() => {
          inputFullName.focus();
        }, 500);
      }
    });
  });

  // --- 8. Contact Form Validation & Submission ---
  function showError(input, errorElementId, message) {
    input.classList.add('invalid');
    const errEl = document.getElementById(errorElementId);
    if (errEl) {
      errEl.textContent = message;
      errEl.classList.add('visible');
    }
  }

  function clearError(input, errorElementId) {
    input.classList.remove('invalid');
    const errEl = document.getElementById(errorElementId);
    if (errEl) {
      errEl.textContent = '';
      errEl.classList.remove('visible');
    }
  }

  // Real-time input listeners to clear errors
  if (inputFullName) {
    inputFullName.addEventListener('input', () => clearError(inputFullName, 'fullNameError'));
  }
  if (inputEmail) {
    inputEmail.addEventListener('input', () => clearError(inputEmail, 'emailError'));
  }
  if (inputPhone) {
    inputPhone.addEventListener('input', () => clearError(inputPhone, 'phoneError'));
  }
  if (selectProgram) {
    selectProgram.addEventListener('change', () => clearError(selectProgram, 'programError'));
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePhone(phone) {
    // Allows international formats, min 7 digits
    const cleaned = phone.replace(/[^\d+]/g, '');
    return cleaned.length >= 7;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Full Name
      const nameVal = inputFullName.value.trim();
      if (!nameVal || nameVal.length < 2) {
        showError(inputFullName, 'fullNameError', 'Please enter your full name (minimum 2 characters).');
        isValid = false;
      } else {
        clearError(inputFullName, 'fullNameError');
      }

      // Validate Email
      const emailVal = inputEmail.value.trim();
      if (!emailVal || !validateEmail(emailVal)) {
        showError(inputEmail, 'emailError', 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearError(inputEmail, 'emailError');
      }

      // Validate Phone
      const phoneVal = inputPhone.value.trim();
      if (!phoneVal || !validatePhone(phoneVal)) {
        showError(inputPhone, 'phoneError', 'Please enter a valid phone number (at least 7 digits).');
        isValid = false;
      } else {
        clearError(inputPhone, 'phoneError');
      }

      // Validate Program Selection
      const programVal = selectProgram.value;
      if (!programVal) {
        showError(selectProgram, 'programError', 'Please select a training program.');
        isValid = false;
      } else {
        clearError(selectProgram, 'programError');
      }

      if (!isValid) {
        return;
      }

      // Submit state animation
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        <span>Reserving Your Pass...</span>
      `;

      // Simulate network request
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        const programLabel = selectProgram.options[selectProgram.selectedIndex].text;

        // Show Success Confirmation Modal
        successDetailsText.innerHTML = `
          Thank you, <strong>${nameVal}</strong>! Your complimentary 1-Day Trial for <strong>${programLabel}</strong> has been reserved.
          <br><br>
          A confirmation with your entry pass has been sent to <strong>${emailVal}</strong>. Our head coach will connect via WhatsApp/call at <strong>${phoneVal}</strong> to confirm your arrival slot.
        `;

        successModal.classList.add('active');
        document.body.classList.add('menu-open');

        // Reset form
        contactForm.reset();
      }, 700);
    });
  }

  // Success Modal handlers
  function closeSuccessModal() {
    successModal.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  if (successModalClose) {
    successModalClose.addEventListener('click', closeSuccessModal);
  }
  if (successModalOkBtn) {
    successModalOkBtn.addEventListener('click', closeSuccessModal);
  }
  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        closeSuccessModal();
      }
    });
  }

  // --- 9. Global Escape Key Listener for Modals & Drawer ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (programModal && programModal.classList.contains('active')) {
        closeProgramModal();
      }
      if (successModal && successModal.classList.contains('active')) {
        closeSuccessModal();
      }
      if (videoModal && videoModal.classList.contains('active')) {
        closeVideoModal();
      }
      if (mobileDrawer && mobileDrawer.classList.contains('active')) {
        closeMobileMenu();
      }
    }
  });

  // --- 10. Video Reel Showcase Modal & Video Engine ---
  const watchReelBtn = document.getElementById('watchReelBtn');
  const videoModal = document.getElementById('videoModal');
  const videoModalClose = document.getElementById('videoModalClose');
  const reelVideoPlayer = document.getElementById('reelVideoPlayer');
  const videoReelSubtitle = document.getElementById('videoReelSubtitle');
  const reelTabs = document.querySelectorAll('.video-reel-tab');
  const heroVideo = document.getElementById('heroVideo');

  // Ensure hero video autoplays smoothly
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.play().catch(() => {
      // If browser blocked immediate autoplay, play on first user interaction
      const playOnUserGesture = () => {
        heroVideo.play().catch(() => {});
        window.removeEventListener('click', playOnUserGesture);
        window.removeEventListener('scroll', playOnUserGesture);
        window.removeEventListener('touchstart', playOnUserGesture);
      };
      window.addEventListener('click', playOnUserGesture, { once: true });
      window.addEventListener('scroll', playOnUserGesture, { once: true });
      window.addEventListener('touchstart', playOnUserGesture, { once: true });
    });
  }

  function openVideoModal() {
    if (!videoModal) return;
    videoModal.classList.add('active');
    document.body.classList.add('menu-open');
    if (reelVideoPlayer) {
      reelVideoPlayer.currentTime = 0;
      reelVideoPlayer.play().catch(() => {});
    }
  }

  function closeVideoModal() {
    if (!videoModal) return;
    videoModal.classList.remove('active');
    document.body.classList.remove('menu-open');
    if (reelVideoPlayer) {
      reelVideoPlayer.pause();
    }
  }

  if (watchReelBtn) {
    watchReelBtn.addEventListener('click', openVideoModal);
  }
  if (videoModalClose) {
    videoModalClose.addEventListener('click', closeVideoModal);
  }
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });
  }

  reelTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      reelTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const src = tab.getAttribute('data-src');
      const sub = tab.getAttribute('data-subtitle');
      if (videoReelSubtitle && sub) {
        videoReelSubtitle.textContent = sub;
      }
      if (reelVideoPlayer && src) {
        reelVideoPlayer.pause();
        reelVideoPlayer.src = src;
        reelVideoPlayer.load();
        reelVideoPlayer.play().catch(() => {});
      }
    });
  });

  // --- Ambient Kinetic Energy Canvas Overlay in Hero ---
  const canvas = document.getElementById('heroParticlesCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = 42;

    function resizeCanvas() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    class Particle {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.x = Math.random() * (width || window.innerWidth);
        this.y = initial ? Math.random() * (height || window.innerHeight) : (height || window.innerHeight) + 10;
        this.size = Math.random() * 2.2 + 0.8;
        this.speedY = -(Math.random() * 0.8 + 0.3);
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.alpha = Math.random() * 0.6 + 0.2;
        this.fade = Math.random() * 0.003 + 0.001;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.alpha -= this.fade;
        if (this.y < -10 || this.alpha <= 0) {
          this.reset(false);
        }
      }
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 87, 34, ${Math.max(0, this.alpha)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ff5722';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
          p.update();
          p.draw();
        });
      }
      requestAnimationFrame(animateParticles);
    }
    requestAnimationFrame(animateParticles);
  }

  // --- 11. Custom Animated Cursor System ---
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  // Check if device supports fine hover pointer and not reduced motion
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isFinePointer && !prefersReducedMotion && cursorDot && cursorRing) {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;

    // Direct tracking for dot, lerp for ring
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
        ringX = mouseX;
        ringY = mouseY;
      }

      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }, { passive: true });

    // Smooth RAF loop for the follower ring
    function renderCursorRing() {
      if (isVisible) {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      requestAnimationFrame(renderCursorRing);
    }
    requestAnimationFrame(renderCursorRing);

    // Click active reaction
    window.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-active');
    });
    window.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-active');
    });

    // Window exit/enter
    document.addEventListener('mouseleave', () => {
      document.body.classList.add('custom-cursor-hidden');
    });
    document.addEventListener('mouseenter', () => {
      document.body.classList.remove('custom-cursor-hidden');
    });

    // Element hover effects
    const interactiveElements = document.querySelectorAll(
      'a, button, .btn, .program-learn-more, .social-icon-btn, .hotspot-pin, .pricing-toggle-btn'
    );
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    const cardElements = document.querySelectorAll(
      '.program-card, .trainer-card, .why-card, .pricing-card, .testimonial-card'
    );
    cardElements.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-card'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-card'));
    });

    const textInputElements = document.querySelectorAll('input, textarea, select');
    textInputElements.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-text'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-text'));
    });
  }

  // --- 12. Scroll Reveal Animations (IntersectionObserver) ---
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(el => el.classList.add('revealed'));
  }
});
