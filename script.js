/* ===== MENU TOGGLE ===== */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

// Toggle navbar visibility and menu icon
menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');   // Switch menu icon to X
  navbar.classList.toggle('active');   // Show / hide navbar
};


/* ===== SOCIAL ICONS "MORE / LESS" TOGGLE (REUSABLE) ===== */
// Works for Home, Footer, or any section with .social-icons
document.querySelectorAll('.toggle-social').forEach(toggleBtn => {
  toggleBtn.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent page jump

    // Get the closest social-icons container
    const socialContainer = toggleBtn.closest('.social-icons');
    const moreIcons = socialContainer.querySelector('.more-icons');

    // Check current state
    const isHidden =
      moreIcons.style.display === 'none' || moreIcons.style.display === '';

    if (isHidden) {
      moreIcons.style.display = 'flex';                 // Show icons
      toggleBtn.setAttribute('data-tooltip', 'Less Accounts');
    } else {
      moreIcons.style.display = 'none';                 // Hide icons
      toggleBtn.setAttribute('data-tooltip', 'More Accounts');
    }
  });
});


/* ===== CONTACT FORM SUBMISSION ===== */
const form = document.getElementById('contact-form');

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Stop default submit

    const formData = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => {
      form.reset();

      // Success toast
      Swal.fire({
        toast: true,
        position: 'top',
        icon: 'success',
        title: 'Message sent successfully!',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
    })
    .catch(() => {
      // Error toast
      Swal.fire({
        toast: true,
        position: 'top',
        icon: 'error',
        title: 'Submission failed. Please try again!',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
    });
  });
}
/* ===== JUMP UP / DOWN BUTTON (FULL FIX) ===== */
document.addEventListener('DOMContentLoaded', () => {

  const jumpBtn = document.getElementById('jump-btn');
  if (!jumpBtn) return; // safety check

  function getScrollableHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    ) - window.innerHeight;
  }
function updateJumpButton() {
  const scrollTop = window.scrollY;
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  jumpBtn.classList.remove('up', 'down');

  if (scrollableHeight <= 50 || scrollTop < scrollableHeight / 2) {
    // Jump DOWN
    jumpBtn.innerHTML = '<i class="bx bx-down-arrow-alt"></i>';
    jumpBtn.setAttribute('data-tooltip', 'Jump Down');
    jumpBtn.classList.add('down');
  } else {
    // Jump UP
    jumpBtn.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
    jumpBtn.setAttribute('data-tooltip', 'Jump Up');
    jumpBtn.classList.add('up');
  }
}

  jumpBtn.addEventListener('click', () => {
    const scrollTop = window.scrollY;
    const scrollableHeight = getScrollableHeight();

    if (scrollTop < scrollableHeight / 2) {
      // Jump DOWN
      window.scrollTo({
        top: scrollableHeight,
        behavior: 'smooth'
      });
    } else {
      // Jump UP
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });

  // Run on load & scroll
  updateJumpButton();
  window.addEventListener('scroll', updateJumpButton);
});
/* ===== Splash Screen with Typewriter & Multiple Lines ===== */
// ===== Splash Screen Typewriter with Bold Animation =====
window.addEventListener('load', () => {
  const splash = document.getElementById('splash-screen');
  const splashText = document.getElementById('splash-text');
  const splashSkip = document.getElementById('splash-skip');

  const messages = [
    'Welcome to',
    'My Coding World',
    'Explore My Work & Skills'
  ];

  let lineIndex = 0;
  let charIndex = 0;

  function typeLine() {
    if (lineIndex < messages.length) {
      if (charIndex < messages[lineIndex].length) {
        const span = document.createElement('span');
        span.textContent = messages[lineIndex][charIndex];
        splashText.appendChild(span);

        // Animate fade-in and grow
        setTimeout(() => span.classList.add('visible'), 50);

        charIndex++;
        setTimeout(typeLine, 50); // Faster typing speed
      } else {
        charIndex = 0;
        lineIndex++;
        splashText.appendChild(document.createElement('br')); // new line
        setTimeout(typeLine, 200); // Shorter delay between lines
      }
    } else {
      // All lines typed, fade out splash after 1.5s
      setTimeout(() => splash.classList.add('hide'), 1500);
    }
  }

  typeLine();

  // Skip splash screen immediately
  splashSkip.addEventListener('click', () => splash.classList.add('hide'));
});


/* ===== Splash Background Particles ===== */
const canvas = document.getElementById('splash-particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Symbols to represent coding/developer
const symbols = ['{','}','(',')',';','<>','</>','=','+','*','const','let','var','//','[]','=>'];

const particles = [];
const particleCount = 100;

// Initialize particles
for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speedX: (Math.random() - 0.5) * 1.5,
    speedY: (Math.random() - 0.5) * 1.5,
    size: Math.random() * 14 + 8,
    alpha: Math.random() * 0.8 + 0.2,
    symbol: symbols[Math.floor(Math.random() * symbols.length)]
  });
}

// Draw and animate particles
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.font = `${p.size}px monospace`;
    ctx.fillStyle = `rgba(0, 255, 81, ${p.alpha})`; // coding glow
    ctx.shadowColor = '#00ff51';
    ctx.shadowBlur = 8;
    ctx.fillText(p.symbol, p.x, p.y);

    // Move particle
    p.x += p.speedX;
    p.y += p.speedY;

    // Wrap around edges
    if (p.x > canvas.width) p.x = 0;
    if (p.x < 0) p.x = canvas.width;
    if (p.y > canvas.height) p.y = 0;
    if (p.y < 0) p.y = canvas.height;
  });

  requestAnimationFrame(drawParticles);
}

drawParticles();

// Handle responsive resizing
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
 