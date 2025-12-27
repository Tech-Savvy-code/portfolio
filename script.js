
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}
const toggleMoreBtn = document.getElementById('toggle-more');
const moreIcons = document.querySelector('.more-icons');

toggleMoreBtn.addEventListener('click', (e) => {
  e.preventDefault();

  // Toggle visibility
  if (moreIcons.style.display === 'none' || moreIcons.style.display === '') {
    moreIcons.style.display = 'flex';
    toggleMoreBtn.setAttribute('data-tooltip', 'Less Accounts');
  } else {
    moreIcons.style.display = 'none';
    toggleMoreBtn.setAttribute('data-tooltip', 'More Accounts');
  }
});