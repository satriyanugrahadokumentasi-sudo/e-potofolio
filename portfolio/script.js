// ── PRELOADER / INTRO ANIMATION ────────────────
(function () {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Prevent scrolling while loading
  document.body.style.overflow = 'hidden';

  // After 2.6s (progress bar finishes), trigger exit animation
  const exitDelay = 2700;
  setTimeout(() => {
    preloader.classList.add('preloader-exit');

    // After exit animation completes (700ms), fully hide it
    setTimeout(() => {
      preloader.classList.add('preloader-hidden');
      document.body.style.overflow = '';
    }, 750);
  }, exitDelay);
})();

document.addEventListener("DOMContentLoaded", () => {
  // ── REVEAL ON SCROLL ───────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    reveals.forEach(reveal => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('visible');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger on load

  // ── HERO PHOTO PARALLAX ────────────────────────
  const heroPhoto = document.getElementById('hero-photo');
  if (heroPhoto) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroPhoto.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // ── BACK TO TOP BUTTON ─────────────────────────
  const backTopBtn = document.getElementById('back-top');
  if (backTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backTopBtn.classList.add('visible');
      } else {
        backTopBtn.classList.remove('visible');
      }
    });
    backTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── NAVBAR SCROLL EFFECT ───────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        navbar.style.background = 'var(--glass-bg)';
        navbar.style.boxShadow = 'var(--shadow-sm)';
      } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
      }
    });
  }

  // ── MOBILE MENU ────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // ── PROFILE TABS ───────────────────────────────
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
        
        // Retrigger reveal animations inside the activated panel
        const newReveals = targetPanel.querySelectorAll('.reveal');
        newReveals.forEach(r => r.classList.add('visible'));
      }
    });
  });

  // ── HOBI INTERACTIVE TABS ────────────────────────
  const hobiBtns = document.querySelectorAll('.hobi-nav-btn');
  const hobiItems = document.querySelectorAll('.hobi-display-item');

  function switchHobi(targetBtn) {
    // Remove active from all
    hobiBtns.forEach(b => b.classList.remove('active'));
    hobiItems.forEach(i => i.classList.remove('active'));
    
    // Add active to current
    targetBtn.classList.add('active');
    const targetId = targetBtn.getAttribute('data-hobi-target');
    const targetItem = document.getElementById(targetId);
    if (targetItem) {
      targetItem.classList.add('active');
    }
  }

  hobiBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => switchHobi(btn));
    btn.addEventListener('click', () => switchHobi(btn));
  });

  // ── PAGE TRANSITION LOGIC ───────────────────────
  const transitionLayer = document.getElementById('pageTransition');
  
  // Reveal page on load (Zoom out from glass)
  if (transitionLayer) {
    transitionLayer.style.left = '50%';
    transitionLayer.style.top = '50%';
    setTimeout(() => {
      transitionLayer.classList.add('reveal');
    }, 100);
  }

  // Intercept Artifact Cards
  const artifactCards = document.querySelectorAll('.artefak-card');
  artifactCards.forEach(card => {
    card.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      const icon = this.querySelector('.artefak-icon');
      
      if (href && href !== '#' && !href.startsWith('javascript')) {
        e.preventDefault();
        
        if (transitionLayer && icon) {
          // Get icon position for zoom origin
          const rect = icon.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;
          
          transitionLayer.classList.remove('reveal');
          transitionLayer.style.left = x + 'px';
          transitionLayer.style.top = y + 'px';
          
          // Force layout for transition
          transitionLayer.offsetHeight;
          
          transitionLayer.classList.add('active');
          
          // Navigate after animation (800ms)
          setTimeout(() => {
            window.location.href = href;
          }, 800);
        } else {
          window.location.href = href;
        }
      }
    });
  });
});

