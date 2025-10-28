// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setThemeIcon() {
  const isDark = document.documentElement.classList.contains('dark');
  themeToggle.textContent = isDark ? '🌙' : '☀️';
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  const useDark = saved ? saved === 'dark' : prefersDark;
  document.documentElement.classList.toggle('dark', useDark);
  setThemeIcon();
}

themeToggle.addEventListener('click', () => {
  const willBeDark = !document.documentElement.classList.contains('dark');
  document.documentElement.classList.toggle('dark', willBeDark);
  localStorage.setItem('theme', willBeDark ? 'dark' : 'light');
  setThemeIcon();
});

// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navList.classList.toggle('open');
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();


