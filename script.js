/* ===== MENU TOGGLE ===== */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

/* ===== NETLIFY CMS JSON DATA LOADER ===== */
const cmsPaths = {
  about: 'content/about.json',
  skills: 'content/skills.json',
  services: 'content/services.json',
  faqs: 'content/faqs.json',
  projects: 'content/projects.json',
  credentials: 'content/credentials.json'
};

let credentialsData = {
  certifications: [],
  recommendations: [],
  education: [],
  clearance: []
};

async function loadJson(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.warn('Failed to load JSON:', path, error);
    return null;
  }
}

function renderAbout(data) {
  if (!data) return;
  const aboutContent = document.querySelector('.about-content');
  if (!aboutContent) return;

  aboutContent.innerHTML = `
    <h2>About <span>Me</span></h2>
    ${data.intro ? `<p>${data.intro}</p>` : ''}
    ${data.description ? `<p>${data.description}</p>` : ''}
    ${data.resumeUrl ? `<a href="${data.resumeUrl}" target="_blank" rel="noopener noreferrer" class="btn">View Résumé</a>` : ''}
  `;
}

function renderSkills(items) {
  const container = document.querySelector('.skills-container');
  if (!items || !container) return;

  container.innerHTML = items.map(item => {
    const badges = Array.isArray(item.badges) ? item.badges : [];
    return `
      <div class="skill-card ${item.colorClass || 'green'}">
        <i class="bx ${item.iconClass || 'bx-mobile-alt'}"></i>
        <h4>${item.title || 'Skill Category'}</h4>
        <div class="skill-badges">
          ${badges.map(badge => `<span>${badge}</span>`).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function renderServices(items) {
  const container = document.querySelector('.services-container');
  if (!items || !container) return;

  container.innerHTML = items.map(item => `
    <div class="service-box ${item.colorClass || 'green'}">
      <div class="service-info">
        <i class="bx ${item.iconClass || 'bx-code-alt'}"></i>
        <h4>${item.title || 'Service Title'}</h4>
        <p>${item.description || 'Service description.'}</p>
      </div>
    </div>
  `).join('');
}

function renderFaqs(items) {
  const faqGrid = document.querySelector('.faq-grid');
  if (!items || !faqGrid) return;

  faqGrid.innerHTML = items.map(item => `
    <div class="faq-item">
      <button class="faq-question" type="button">
        ${item.question || 'FAQ question?'}
        <i class="bx bx-chevron-down"></i>
      </button>
      <div class="faq-answer">
        <p>${item.answer || 'FAQ answer content.'}</p>
      </div>
    </div>
  `).join('');

  setupFaqAccordion();
}

function renderProjects(items) {
  const container = document.querySelector('.projects-container');
  if (!items || !container) return;

  container.innerHTML = items.map(item => {
    const repoLink = item.repoUrl ? `<a href="${item.repoUrl}" target="_blank" class="btn">GitHub</a>` : '';
    const liveLink = item.liveUrl ? `<a href="${item.liveUrl}" target="_blank" class="btn">View Live</a>` : '';
    const downloadLink = item.downloadUrl ? `<a href="${item.downloadUrl}" target="_blank" class="btn">Download App</a>` : '';

    return `
      <div class="project-card">
        <div class="project-icon ${item.iconClass || 'tusome-icon'}">
          <i class="bx ${item.icon || 'bxs-code-block'}"></i>
        </div>
        <div class="project-info">
          <h3>${item.title || 'Project Title'}</h3>
          <p>${item.description || 'Project details.'}</p>
          <div class="project-links">
            ${repoLink}
            ${liveLink}
            ${downloadLink}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderCredentials(data) {
  if (!data || !Array.isArray(data)) return;

  credentialsData = {
    certifications: data.filter(item => item.type === 'certification'),
    recommendations: data.filter(item => item.type === 'recommendation'),
    education: data.filter(item => item.type === 'education'),
    clearance: data.filter(item => item.type === 'clearance')
  };
}

async function loadCMSContent() {
  const [aboutData, skillsData, servicesData, faqsData, projectsData, credentialsDataJson] = await Promise.all([
    loadJson(cmsPaths.about),
    loadJson(cmsPaths.skills),
    loadJson(cmsPaths.services),
    loadJson(cmsPaths.faqs),
    loadJson(cmsPaths.projects),
    loadJson(cmsPaths.credentials)
  ]);

  if (aboutData) renderAbout(aboutData);
  if (skillsData?.skills) renderSkills(skillsData.skills);
  if (servicesData?.services) renderServices(servicesData.services);
  if (faqsData?.faqs) renderFaqs(faqsData.faqs);
  if (projectsData?.projects) renderProjects(projectsData.projects);
  if (credentialsDataJson?.credentials) renderCredentials(credentialsDataJson.credentials);
}

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

/* ===== PROJECTS SLIDESHOW ===== */
document.addEventListener('DOMContentLoaded', async () => {
  await loadCMSContent();

  const slider = document.querySelector('.projects-slider');
  if (!slider) return;

  const track = slider.querySelector('.projects-container');
  const cards = Array.from(slider.querySelectorAll('.project-card'));
  const prevBtn = slider.querySelector('.project-slider-prev');
  const nextBtn = slider.querySelector('.project-slider-next');
  const dotsWrap = slider.querySelector('.project-slider-dots');

  if (!track || cards.length === 0 || !prevBtn || !nextBtn || !dotsWrap) return;

  let currentIndex = 0;
  let visibleCount = 1;
  let maxIndex = 0;
  let autoSlideId = null;

  function getGap() {
    return parseFloat(window.getComputedStyle(track).gap) || 0;
  }

  function calculateVisibleCount() {
    const viewportWidth = slider.querySelector('.projects-viewport')?.clientWidth || track.clientWidth;
    const cardWidth = cards[0].getBoundingClientRect().width;
    if (!cardWidth) return 1;
    return Math.max(1, Math.round((viewportWidth + getGap()) / (cardWidth + getGap())));
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'project-dot';
      dot.setAttribute('aria-label', `Show project slide ${i + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(i);
        restartAutoSlide();
      });
      dotsWrap.appendChild(dot);
    }
  }

  function updateSlider() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const offset = currentIndex * (cardWidth + getGap());
    track.style.transform = `translateX(-${offset}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === maxIndex;

    dotsWrap.querySelectorAll('.project-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
      dot.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
    });
  }

  function refreshSlider() {
    visibleCount = calculateVisibleCount();
    maxIndex = Math.max(0, cards.length - visibleCount);
    currentIndex = Math.min(currentIndex, maxIndex);
    buildDots();
    updateSlider();
  }

  function goToSlide(index) {
    currentIndex = Math.min(Math.max(index, 0), maxIndex);
    updateSlider();
  }

  function showNextSlide() {
    goToSlide(currentIndex === maxIndex ? 0 : currentIndex + 1);
  }

  function startAutoSlide() {
    stopAutoSlide();
    if (maxIndex > 0) {
      autoSlideId = window.setInterval(showNextSlide, 5500);
    }
  }

  function stopAutoSlide() {
    if (autoSlideId) {
      window.clearInterval(autoSlideId);
      autoSlideId = null;
    }
  }

  function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
    restartAutoSlide();
  });

  nextBtn.addEventListener('click', () => {
    showNextSlide();
    restartAutoSlide();
  });

  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);
  window.addEventListener('resize', () => {
    refreshSlider();
    restartAutoSlide();
  });

  refreshSlider();
  startAutoSlide();
});
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
const credentialsPin = '12345';
let pinModal = null;
let pinInput = null;
let pinToggleBtn = null;
let pinSubmitBtn = null;
let pinCancelBtn = null;
let pinCloseBtn = null;
let pendingPinResolve = null;

function ensurePinElements() {
  if (!pinModal) pinModal = document.getElementById('pin-modal');
  if (!pinInput) pinInput = document.getElementById('pin-input');
  if (!pinToggleBtn) pinToggleBtn = document.getElementById('pin-toggle');
  if (!pinSubmitBtn) pinSubmitBtn = document.getElementById('pin-submit');
  if (!pinCancelBtn) pinCancelBtn = document.getElementById('pin-cancel');
  if (!pinCloseBtn) pinCloseBtn = document.getElementById('pin-close');
}

function closePinModal() {
  ensurePinElements();
  if (pinModal) {
    pinModal.classList.remove('active');
    pinModal.setAttribute('aria-hidden', 'true');
  }
  if (pendingPinResolve) {
    pendingPinResolve(false);
    pendingPinResolve = null;
  }
}

function resolvePinModal(isValid) {
  if (pendingPinResolve) {
    pendingPinResolve(isValid);
    pendingPinResolve = null;
  }
  if (pinModal) {
    pinModal.classList.remove('active');
    pinModal.setAttribute('aria-hidden', 'true');
  }
}

function openPinModal() {
  ensurePinElements();
  if (!pinModal || !pinInput) {
    return Promise.resolve(false);
  }
  pinInput.value = '';
  pinInput.type = 'password';
  if (pinToggleBtn) {
    pinToggleBtn.setAttribute('aria-label', 'Show PIN');
    const icon = pinToggleBtn.querySelector('i');
    if (icon) icon.className = 'bx bx-hide';
  }
  pinModal.classList.add('active');
  pinModal.setAttribute('aria-hidden', 'false');
  pinInput.focus();
  return new Promise(resolve => {
    pendingPinResolve = resolve;
  });
}

function togglePinVisibility() {
  if (!pinInput || !pinToggleBtn) return;
  const showPin = pinInput.type === 'password';
  pinInput.type = showPin ? 'text' : 'password';
  const icon = pinToggleBtn.querySelector('i');
  if (icon) icon.className = showPin ? 'bx bx-show' : 'bx bx-hide';
  pinToggleBtn.setAttribute('aria-label', showPin ? 'Hide PIN' : 'Show PIN');
}

async function verifyCredentialsPin() {
  const allowed = await openPinModal();
  if (allowed && pinInput && pinInput.value === credentialsPin) {
    return true;
  }
  if (!allowed) {
    return false;
  }
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

function setupPinModalHandlers() {
  ensurePinElements();
  if (!pinModal) return;

  pinSubmitBtn?.addEventListener('click', (event) => {
    event.preventDefault();
    const valid = pinInput?.value === credentialsPin;
    resolvePinModal(valid);
  });

  pinCancelBtn?.addEventListener('click', (event) => {
    event.preventDefault();
    closePinModal();
  });

  pinCloseBtn?.addEventListener('click', () => {
    closePinModal();
  });

  pinToggleBtn?.addEventListener('click', (event) => {
    event.preventDefault();
    togglePinVisibility();
  });

  pinInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const valid = pinInput.value === credentialsPin;
      resolvePinModal(valid);
    }
  });

  document.addEventListener('click', (evt) => {
    if (evt.target === pinModal) {
      closePinModal();
    }
  });
}

function showInvalidPinMessage() {
  Swal.fire({
    toast: true,
    position: 'top',
    icon: 'error',
    title: 'Incorrect key',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  });
}

function openPinAndVerify() {
  return new Promise(async resolve => {
    const allowed = await openPinModal();
    if (!allowed) {
      resolve(false);
      return;
    }
    resolve(pinInput?.value === credentialsPin);
  });
}

function validatePinInput() {
  return pinInput?.value === credentialsPin;
}

function verifyCredentialsPinSync() {
  return pinInput?.value === credentialsPin;
}

function showPinError() {
  Swal.fire({
    toast: true,
    position: 'top',
    icon: 'error',
    title: 'Incorrect key',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  });
}

function setupFaqAccordion() {
  const faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = answer.classList.contains('open');

      document.querySelectorAll('.faq-answer.open').forEach(openAnswer => {
        openAnswer.classList.remove('open');
        openAnswer.closest('.faq-item')?.classList.remove('active');
      });

      if (!isOpen) {
        answer.classList.add('open');
        item.classList.add('active');
      }
    });
  });
}

function clearPinInput() {
  if (pinInput) pinInput.value = '';
}

function openPinDialog() {
  return openPinModal();
}

function pinDialogResult() {
  return pinInput?.value === credentialsPin;
}

function maybeClosePinModal() {
  closePinModal();
}

function resolvePinValidation() {
  if (!pinInput) return false;
  return pinInput.value === credentialsPin;
}

document.addEventListener('DOMContentLoaded', () => {
  setupPinModalHandlers();
  const dropdowns = document.querySelectorAll('.dropdown');
  if (dropdowns.length === 0) return;

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const links = dropdown.querySelectorAll('.dropdown-menu a');

    if (toggle) {
      toggle.addEventListener('click', async (e) => {
        e.preventDefault();
        // require pin before opening
        if (!(await verifyCredentialsPin())) {
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

  setupFaqAccordion();
});

// ---------- CREDENTIALS DATA & MODAL HANDLER ----------
// Define items for each category
const credentialsData = {
  certifications: [
      // Add more certifications here:
    { name: 'Python Certification', path: 'assets/Python -Certification.pdf' },
     { name: 'Patent Certification', path: 'assets/PCT101E25-1-certification.pdf' },
     { name: 'Datastructures Certification', path: 'assets/Datastructures certification.pdf' },
    { name: 'KAFU Innovation  Certification', path: 'assets/KAFU Innovation  Cert.pdf' },
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

  ],
  clearance: [
    { name: 'Certificate of Good Conduct', path: 'assets/Certificate of Good Conduct.pdf' },
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
  document.addEventListener('click', async (evt) => {
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
    if (!(await verifyCredentialsPin())) {
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
    } else if (text.includes('clearance')) {
      evt.preventDefault();
      showModal('clearance');
    }
  });
})();
