const body = document.body;
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const themeButton = document.getElementById('theme-button');

function closeMenu(){
  navMenu.classList.remove('show');
  navToggle.setAttribute('aria-expanded','false');
}
navToggle?.addEventListener('click',()=>{
  navMenu.classList.add('show');
  navToggle.setAttribute('aria-expanded','true');
});
navClose?.addEventListener('click',closeMenu);
document.querySelectorAll('.nav__link').forEach(link=>link.addEventListener('click',closeMenu));

themeButton?.addEventListener('click',()=>{
  body.classList.toggle('dark');
  const dark = body.classList.contains('dark');
  themeButton.querySelector('span').textContent = dark ? 'Light mode' : 'Dark mode';
  themeButton.querySelector('i').className = dark ? 'ri-sun-line' : 'ri-moon-line';
  localStorage.setItem('waves-theme', dark ? 'dark' : 'light');
});
if(localStorage.getItem('waves-theme') === 'dark'){
  body.classList.add('dark');
  themeButton?.querySelector('span')?.replaceChildren(document.createTextNode('Light mode'));
  const icon = themeButton?.querySelector('i'); if(icon) icon.className='ri-sun-line';
}

const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.nav__link')];
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      links.forEach(l=>l.classList.toggle('active-link',l.getAttribute('href') === `#${entry.target.id}`));
    }
  });
},{rootMargin:'-30% 0px -55% 0px',threshold:0});
sections.forEach(section=>observer.observe(section));

const scrollUp = document.getElementById('scroll-up');
window.addEventListener('scroll',()=>scrollUp.classList.toggle('show',window.scrollY > 500),{passive:true});

const track = document.getElementById('discover-track');
let slideIndex = 0;
function visibleSlides(){
  if(window.innerWidth <= 520) return 1;
  if(window.innerWidth <= 800) return 2;
  if(window.innerWidth <= 1050) return 3;
  return 4;
}
function updateCarousel(){
  const visible = visibleSlides();
  const max = Math.max(0,track.children.length-visible);
  slideIndex = Math.min(slideIndex,max);
  const gap = 20;
  const width = track.parentElement.clientWidth;
  const cardWidth = (width - gap*(visible-1))/visible;
  track.style.transform = `translateX(-${slideIndex*(cardWidth+gap)}px)`;
}
document.getElementById('discover-next')?.addEventListener('click',()=>{slideIndex++;updateCarousel()});
document.getElementById('discover-prev')?.addEventListener('click',()=>{slideIndex--;updateCarousel()});
window.addEventListener('resize',updateCarousel);
updateCarousel();

const video = document.getElementById('video-file');
const videoButton = document.getElementById('video-button');
const videoIcon = document.getElementById('video-icon');
function toggleVideo(){
  if(video.paused){video.play().catch(()=>{});}else{video.pause();}
}
videoButton?.addEventListener('click',toggleVideo);
video?.addEventListener('play',()=>{videoIcon.className='ri-pause-fill';videoButton.setAttribute('aria-label','Pause video')});
video?.addEventListener('pause',()=>{videoIcon.className='ri-play-fill';videoButton.setAttribute('aria-label','Play video')});
video?.addEventListener('ended',()=>{video.currentTime=0});

const modal = document.getElementById('place-modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const placeInfo = {
  Bali:'A relaxing Indonesian escape known for tropical beaches, vibrant culture and unforgettable sunsets. Use the newsletter form below to request more travel information.',
  'Bora Bora':'A dream Polynesian getaway with crystal-clear lagoons, overwater views and peaceful island experiences.',
  Hawaii:'A diverse island adventure combining beaches, volcanic landscapes, outdoor activities and local culture.',
  Whitehaven:'An Australian coastal highlight famous for its bright white sand and clear turquoise water.',
  Hvar:'A beautiful Croatian island offering sunny coves, historic streets and a relaxed Mediterranean atmosphere.'
};
function openModal(place){
  modalTitle.textContent=place;
  modalText.textContent=placeInfo[place] || 'Discover this beautiful destination with Travelling with Waves.';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelectorAll('.place__card').forEach(card=>card.addEventListener('click',e=>{
  if(e.target.closest('.place__button')) openModal(card.dataset.place);
}));
document.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeModal()});

const form = document.getElementById('subscribe-form');
const message = document.getElementById('form-message');
form?.addEventListener('submit',e=>{
  e.preventDefault();
  const email = new FormData(form).get('email')?.toString().trim() || '';
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    message.textContent='Please enter a valid email address.';
    return;
  }
  message.textContent='Thanks! Your travel inspiration subscription is confirmed.';
  form.reset();
});
