/* =========================================================
   Emmanuel Kimtai — Portfolio
   Handles: theme toggle, nav toggle, footer year, form validation
   ========================================================= */

(function () {
  'use strict';

  /* ---------- 1. Theme toggle (dark / light) ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = themeToggle ? themeToggle.querySelector('.theme-icon') : null;
  const root        = document.documentElement;

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    if (themeToggle) {
      themeToggle.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
  };

  const currentTheme = root.getAttribute('data-theme') || 'light';
  if (themeIcon) themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
  if (themeToggle) {
    themeToggle.setAttribute(
      'aria-label',
      currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  /* ---------- 2. Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 3. Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 4. Contact form validation ---------- */
  const form      = document.getElementById('contactForm');
  const errorText = document.getElementById('error');

  if (!form || !errorText) return;

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const showMessage = (msg, isSuccess = false) => {
    errorText.textContent = msg;
    errorText.classList.toggle('success', isSuccess);
  };

  const clearMessage = () => {
    errorText.textContent = '';
    errorText.classList.remove('success');
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearMessage();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      showMessage('⚠️ All fields are required.');
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      showMessage('⚠️ Please enter a valid email (e.g. emmanuel@gmail.com).');
      return;
    }

    if (message.length < 10) {
      showMessage('⚠️ Your message is a bit short — please add a few more words.');
      return;
    }

    showMessage(
      `✅ Thanks ${name}! Your message is validated. To actually reach me, email: emmanuelkimtai04@gmail.com`,
      true
    );

    form.reset();

    setTimeout(clearMessage, 6000);
  });

  form.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', clearMessage);
  });
})();