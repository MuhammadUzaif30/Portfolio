// ============================================================
// Split hero name into words/letters for the load-in animation
// ============================================================
const heroName = document.getElementById('heroName');
const rawText = heroName.textContent.trim();
heroName.textContent = '';

rawText.split(' ').forEach((word, wi) => {
  const wordWrap = document.createElement('span');
  wordWrap.className = 'word';
  const inner = document.createElement('span');
  inner.textContent = word;
  inner.style.animationDelay = `${0.15 + wi * 0.12}s`;
  wordWrap.appendChild(inner);
  heroName.appendChild(wordWrap);
  if (wi < rawText.split(' ').length - 1) {
    heroName.appendChild(document.createTextNode('\u00A0'));
  }
});

// ============================================================
// Mobile menu toggle
// ============================================================
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================================
// Scroll-triggered reveal animations
// ============================================================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach((el) => revealObserver.observe(el));

// also mark exp-row and project-row wrappers for their own transitions
document.querySelectorAll('.exp-row, .project-row').forEach((el) => {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  obs.observe(el);
});

// ============================================================
// Scroll progress bar
// ============================================================
const progressBar = document.getElementById('progressBar');

function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${pct}%`;
}

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// ============================================================
// Project accordion
// ============================================================
document.querySelectorAll('.project-summary').forEach((btn) => {
  btn.addEventListener('click', () => {
    const row = btn.closest('.project-row');
    const isOpen = row.getAttribute('data-open') === 'true';

    // close any other open row
    document.querySelectorAll('.project-row[data-open="true"]').forEach((openRow) => {
      if (openRow !== row) {
        openRow.setAttribute('data-open', 'false');
        openRow.querySelector('.project-summary').setAttribute('aria-expanded', 'false');
      }
    });

    row.setAttribute('data-open', String(!isOpen));
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});

// ============================================================
// Copy email to clipboard
// ============================================================
const copyBtn = document.getElementById('copyEmailBtn');

copyBtn.addEventListener('click', async () => {
  const email = copyBtn.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    const original = copyBtn.textContent;
    copyBtn.textContent = 'Copied ✓';
    setTimeout(() => { copyBtn.textContent = original; }, 1800);
  } catch (err) {
    console.error('Copy failed:', err);
  }
});

// ============================================================
// Footer year
// ============================================================
document.getElementById('year').textContent = new Date().getFullYear();