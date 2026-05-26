(function () {
  'use strict';

  // Elements
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const typingText = document.getElementById('typingText');
  const galleryFilters = document.getElementById('galleryFilters');
  const galleryGrid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  const backTop = document.getElementById('backTop');
  const yearEl = document.getElementById('year');
  const cursorGlow = document.querySelector('.cursor-glow');
  const reveals = document.querySelectorAll('.reveal');
  const skillCards = document.querySelectorAll('.skill-card');

  // Footer year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Typing effect
  const roles = [
    'BSIT Student',
    'Aspiring IT Professional',
    'Lifelong Learner',
    'Movie Enthusiast'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const current = roles[roleIndex];
    if (isDeleting) {
      charIndex--;
      typingText.textContent = current.substring(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 400);
        return;
      }
      setTimeout(typeEffect, 40);
    } else {
      charIndex++;
      typingText.textContent = current.substring(0, charIndex);
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2200);
        return;
      }
      setTimeout(typeEffect, 80);
    }
  }

  if (typingText) typeEffect();

  // Header scroll
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    backTop.classList.toggle('visible', y > 500);

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (y >= top && y < top + height) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll reveal
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => revealObserver.observe(el));

  // Skill bar animation
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.5 }
  );

  skillCards.forEach((card) => skillObserver.observe(card));

  // Cursor glow (desktop only)
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  } else if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }

  // Gallery filter
  if (galleryFilters) {
    galleryFilters.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      galleryFilters.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const items = galleryGrid.querySelectorAll('.gallery-item');

      items.forEach((item) => {
        const cat = item.dataset.category;
        const show = filter === 'all' || cat === filter;
        item.classList.toggle('hidden', !show);
      });
    });
  }

  // Lightbox
  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = caption;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  galleryGrid.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('figcaption span')?.textContent || '';
      openLightbox(img.src.replace('w=600', 'w=1200').replace('w=800', 'w=1200'), caption);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Contact form (demo — opens mailto)
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const subject = encodeURIComponent('Portfolio Contact from ' + name);
    const body = encodeURIComponent(
      'Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message
    );

    formNote.textContent = 'Opening your email client...';
    window.location.href =
      'mailto:natashalagunay1@gmail.com?subject=' + subject + '&body=' + body;

    setTimeout(() => {
      formNote.textContent = 'Thank you! Your message is ready to send.';
      contactForm.reset();
    }, 800);
  });

  // Back to top
  backTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
