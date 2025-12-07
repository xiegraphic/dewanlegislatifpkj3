document.querySelectorAll('.has-dropdown > a').forEach(item => {
  item.addEventListener('click', function(e) {
    if (window.innerWidth <= 700) {
      e.preventDefault();
      const dropdown = this.nextElementSibling;
      if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
      } else {
        dropdown.style.display = 'block';
      }
    }
  });
});

// Carousel logic
const carousel = document.getElementById('carousel');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

let currentIndex = 0;
const totalSlides = slides.length;

// Generate dots
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}
const dots = document.querySelectorAll('.dot');

function updateCarousel() {
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}
function goToSlide(idx) {
  currentIndex = idx;
  updateCarousel();
}
function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
}
function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Swipe (touch) support
let startX = 0;
let isDragging = false;

carousel.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
});
carousel.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const diff = e.touches[0].clientX - startX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) prevSlide();
    else nextSlide();
    isDragging = false;
  }
});
carousel.addEventListener('touchend', () => { isDragging = false; });

// Optional: auto-slide (hapus jika tidak ingin)
let autoSlide = setInterval(nextSlide, 5000);
carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
carousel.addEventListener('mouseleave', () => autoSlide = setInterval(nextSlide, 5000));

// Inisialisasi posisi awal
updateCarousel();

document.addEventListener("DOMContentLoaded", function() {
  const boxes = document.querySelectorAll('.visi-misi-box, .popup-on-scroll');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  boxes.forEach(box => observer.observe(box));
});