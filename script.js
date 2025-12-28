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
    const scrollableHeight = getScrollableHeight();

    // If page is not scrollable, keep "Jump Down"
    if (scrollableHeight <= 50) {
      jumpBtn.innerHTML = '<i class="bx bx-down-arrow-alt"></i>';
      jumpBtn.setAttribute('data-tooltip', 'Jump Down');
      return;
    }

    if (scrollTop < scrollableHeight / 2) {
      // At top → show Jump Down
      jumpBtn.innerHTML = '<i class="bx bx-down-arrow-alt"></i>';
      jumpBtn.setAttribute('data-tooltip', 'Jump Down');
    } else {
      // Scrolled → show Jump Up
      jumpBtn.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
      jumpBtn.setAttribute('data-tooltip', 'Jump Up');
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
