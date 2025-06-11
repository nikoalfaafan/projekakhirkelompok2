// Navbar toggle functionality
function toggleNavbar() {
  const user = localStorage.getItem('user');
  if (user) {
    navbar.classList.toggle('active');
  }
}

// Show section functionality
function showSection(sectionId, linkElement) {
  document.querySelectorAll('main .section').forEach(sec => sec.classList.remove('active'));
  const section = document.getElementById(sectionId);
  if (section) section.classList.add('active');

  document.querySelectorAll('.navbar a').forEach(a => a.classList.remove('active'));
  if (linkElement) linkElement.classList.add('active');
  navbar.classList.remove('active');
}

// Check login status
function checkLogin() {
  const user = localStorage.getItem('user');
  if (user) {
    registerFormSection.style.display = 'none';
    navbarToggle.classList.add('active');
    navbar.classList.remove('active');
    header.classList.add('active');
    main.classList.add('active');
    footer.classList.add('active');
    showSection('home');
  } else {
    registerFormSection.style.display = 'flex';
  }
}

// DOM elements
const navbarToggle = document.getElementById('navbarToggle');
const navbar = document.getElementById('main-navbar');
const registerFormSection = document.getElementById('registerFormSection');
const registerForm = document.getElementById('registerForm');
const logoutBtn = document.getElementById('logoutBtn');
const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

// Slideshow variables
let currentImages = [];
let currentIndex = 0;

// Event listeners
registerForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  if (!name || !email) {
    alert('Harap isi semua data!');
    return;
  }

  localStorage.setItem('user', JSON.stringify({ name, email }));

  // Play music after registration
  const bgMusic = document.getElementById('bgMusic');
  bgMusic.play().then(() => {
    console.log("Musik diputar otomatis setelah pendaftaran.");
  }).catch((err) => {
    console.warn("Autoplay diblokir oleh browser:", err);
  });

  checkLogin();
});

logoutBtn.addEventListener('click', function(e) {
  e.preventDefault();
  localStorage.removeItem('user');
  location.reload();
});

// Slideshow functions
function showGallery(event, images) {
  event.preventDefault();
  currentImages = images;
  currentIndex = 0;

  const imgElement = document.getElementById('slideshowImage');
  imgElement.classList.remove('fade-in');
  imgElement.src = currentImages[currentIndex];

  setTimeout(() => {
    imgElement.classList.add('fade-in');
  }, 50);

  document.getElementById('slideshowModal').style.display = 'flex';
  navbar.classList.remove('active');
}

function changeSlide(step) {
  currentIndex += step;
  if (currentIndex < 0) currentIndex = currentImages.length - 1;
  if (currentIndex >= currentImages.length) currentIndex = 0;

  const imgElement = document.getElementById('slideshowImage');
  imgElement.classList.remove('fade-in');
  imgElement.src = currentImages[currentIndex];

  setTimeout(() => {
    imgElement.classList.add('fade-in');
  }, 50);
}

function closeSlideshow() {
  document.getElementById('slideshowModal').style.display = 'none';
  document.getElementById('slideshowImage').src = '';

  if (localStorage.getItem('user')) {
    navbarToggle.classList.add('active');
  }
}

// Click outside modal to close
window.addEventListener('click', function(e) {
  const modal = document.getElementById('slideshowModal');
  const content = document.querySelector('.slideshow-content');
  if (e.target === modal) {
    closeSlideshow();
  }
});

// Try to autoplay music when page loads
window.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById('bgMusic');
  bgMusic.play().catch(() => {
    console.log("Autoplay gagal, menunggu user klik tombol.");
  });
  
  // Check login status on page load
  checkLogin();
});