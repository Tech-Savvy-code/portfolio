
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

  const toggleBtn = document.getElementById('toggle-more');
  const moreIcons = document.querySelector('.more-icons');

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (moreIcons.style.display === 'none') {
      moreIcons.style.display = 'inline-flex';
    } else {
      moreIcons.style.display = 'none';
    }
  });