/* ===== MENU TOGGLE ===== */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

// Toggle navbar visibility and menu icon
menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');   // Switch menu icon to X
  navbar.classList.toggle('active');   // Show / hide navbar

  // when opening/closing menu, also collapse any open dropdowns
  document.querySelectorAll('.dropdown.active').forEach(d => {
    d.classList.remove('active');
    const t = d.querySelector('.dropdown-toggle');
    if (t) t.setAttribute('aria-expanded', 'false');
  });
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

        // Animate fade-in
        setTimeout(() => {
          span.classList.add('visible');
        }, 50);

        charIndex++;
        setTimeout(typeLine, 15); // typing speed per character
      } else {
        charIndex = 0;
        lineIndex++;
        splashText.appendChild(document.createElement('br')); // new line
        setTimeout(typeLine, 500); // delay between lines
      }
    } else {
      // All lines typed, fade out splash after 1.5s
      setTimeout(() => {
        splash.classList.add('hide');
      }, 1500);
    }
  }

  typeLine();

  // Skip on click
  splashSkip.addEventListener('click', () => {
    splash.classList.add('hide');
  });
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
 // ===== Dropdown Toggle =====
// simple toggle for each dropdown and global close-on-outside
// (protected by a PIN because these menus contain confidential credentials)

// change this value to your own secret key
const credentialsPin = '1234';

function verifyCredentialsPin() {
  const entry = prompt('Enter security key to view credentials:');
  if (entry === credentialsPin) {
    return true;
  }
  // wrong pin feedback
  Swal.fire({
    toast: true,
    position: 'top',
    icon: 'error',
    title: 'Incorrect key',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  });
  return false;
}

document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.dropdown');
  if (dropdowns.length === 0) return;

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const links = dropdown.querySelectorAll('.dropdown-menu a');

    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        // require pin before opening
        if (!verifyCredentialsPin()) {
          return; // abort open
        }

        console.log('dropdown toggle clicked', toggle.textContent.trim());
        // close others first
        dropdowns.forEach(d => {
          if (d !== dropdown) {
            d.classList.remove('active');
            const t = d.querySelector('.dropdown-toggle');
            if (t) t.setAttribute('aria-expanded', 'false');
          }
        });

        const isActive = dropdown.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isActive);
        console.log('dropdown classes:', dropdown.className);
        // log computed display for debugging
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) {
          console.log('computed display:', window.getComputedStyle(menu).display);
        }
        console.log('dropdown active state now', isActive);
      });
    }

    // closing when a link inside is clicked
    links.forEach(link => {
      link.addEventListener('click', () => {
        dropdown.classList.remove('active');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    });
  });

  // close any open dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (![...dropdowns].some(d => d.contains(e.target))) {
      dropdowns.forEach(d => {
        d.classList.remove('active');
        const t = d.querySelector('.dropdown-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Escape key support remains
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdowns.forEach(d => {
        d.classList.remove('active');
        const t = d.querySelector('.dropdown-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });
});

// ---------- CREDENTIALS DATA & MODAL HANDLER ----------
// Define items for each category
const credentialsData = {
  certifications: [
      // Add more certifications here:
    { name: 'Python Certification', path: 'assets/Python -Certification.pdf' },
     { name: 'Patent Certification', path: 'assets/PCT101E25-1-certification.pdf' },
     { name: 'Datastructures Certification', path: 'assets/Datastructures certification.pdf' },
    { name: 'KAFU Innovation  Certification', path: 'assets/KAFU Innovation  Certification.pdf' },
  ],
  recommendations: [
    // Add recommendations here:
    { name: 'Kipi Recommendation Letter', path: 'assets/Kipi Recommendation Letter.pdf' },
    // { name: 'Client Feedback', path: 'assets/client.pdf' },
  ],
  education: [
    // Add education certificates here:
    //{ name: 'Bachelor Degree', path: 'assets/bachelor.pdf' },
    { name: 'KCPE Certificate', path: 'assets/Primary Certificate.pdf' },
    { name: 'KCSE Certificate', path: 'assets/KCSE Certificate.pdf' },
    { name: 'Sec. Leaving Certificate', path: 'assets/Sec. Leaving Certificate.pdf' },

  ]
};

(function() {
  let modal = null;
  let modalTitle = null;
  let itemsList = null;
  let modalClose = null;
  let pdfViewer = null;
  let pdfFrame = null;
  let pdfCloseBtn = null;

  function ensureElements() {
    if (!modal) modal = document.getElementById('items-modal');
    if (!modalTitle) modalTitle = document.getElementById('modal-title');
    if (!itemsList) itemsList = document.getElementById('items-list');
    if (!modalClose) modalClose = document.querySelector('.modal-close');
    if (!pdfViewer) pdfViewer = document.getElementById('pdf-viewer');
    if (!pdfFrame) pdfFrame = document.getElementById('pdf-frame');
    if (!pdfCloseBtn) pdfCloseBtn = document.querySelector('.pdf-viewer .close-btn');
    console.log('Elements check - Modal:', modal ? '✓' : '✗', 'List:', itemsList ? '✓' : '✗');
  }

  function closeModal() {
    ensureElements();
    if (modal) modal.classList.remove('active');
  }

  function closePdf() {
    ensureElements();
    if (pdfViewer) pdfViewer.style.display = 'none';
    if (pdfFrame) pdfFrame.src = '';
  }

  function showModal(category) {
    ensureElements();
    const items = credentialsData[category] || [];
    console.log(`Opening modal for: ${category}`, items);

    if (!modal) {
      console.error('Modal still not found after lookup!');
      return;
    }

    const titleText = category.charAt(0).toUpperCase() + category.slice(1);
    if (modalTitle) modalTitle.textContent = titleText;

    if (itemsList) itemsList.innerHTML = '';

    if (itemsList) {
      items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${item.path}">${item.name}</a>`;
        li.addEventListener('click', (e) => {
          e.preventDefault();
          closePdf();
          closeModal();
          if (pdfFrame) pdfFrame.src = item.path;
          if (pdfViewer) pdfViewer.style.display = 'flex';
        });
        itemsList.appendChild(li);
      });
    }

    if (modal) {
      modal.classList.add('active');
      console.log('Modal displayed successfully');
    }
  }

  // Delegated handlers to avoid timing issues
  document.addEventListener('click', (evt) => {
    if (evt.target.classList && evt.target.classList.contains('modal-close')) {
      closeModal();
      return;
    }

    const modalElem = document.getElementById('items-modal');
    if (modalElem && evt.target === modalElem) {
      closeModal();
      return;
    }

    const pdfElem = document.getElementById('pdf-viewer');
    if (pdfElem && evt.target === pdfElem) {
      closePdf();
      return;
    }

    if (evt.target.classList && evt.target.classList.contains('close-btn')) {
      closePdf();
      return;
    }

    const link = evt.target.closest('.dropdown-menu a');
    if (!link) return;

    // require PIN again just before revealing the modal, in case someone bypassed
    if (!verifyCredentialsPin()) {
      // close dropdown if it was open
      const activeDropdown = link.closest('.dropdown');
      if (activeDropdown) {
        activeDropdown.classList.remove('active');
        const t = activeDropdown.querySelector('.dropdown-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      }
      return;
    }

    const text = link.textContent.toLowerCase();

    if (text.includes('certification')) {
      evt.preventDefault();
      showModal('certifications');
    } else if (text.includes('recommendation')) {
      evt.preventDefault();
      showModal('recommendations');
    } else if (text.includes('education')) {
      evt.preventDefault();
      showModal('education');
    }
  });
})();
