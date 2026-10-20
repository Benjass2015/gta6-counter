// Cuenta atrás configurada para el 19 de noviembre de 2026.
// Si Rockstar anuncia otra fecha, cambia launchDate aquí.
const launchDate = new Date('2026-11-19T00:00:00-03:00').getTime();
const pad = n => String(n).padStart(2, '0');
function updateCountdown() {
  let diff = Math.max(0, launchDate - Date.now());
  const days = Math.floor(diff / 86400000); diff %= 86400000;
  const hours = Math.floor(diff / 3600000); diff %= 3600000;
  const minutes = Math.floor(diff / 60000); diff %= 60000;
  const seconds = Math.floor(diff / 1000);
  document.querySelector('#days').textContent = days;
  document.querySelector('#hours').textContent = pad(hours);
  document.querySelector('#minutes').textContent = pad(minutes);
  document.querySelector('#seconds').textContent = pad(seconds);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Menú móvil.
const menuToggle = document.querySelector('#menu-toggle');
const nav = document.querySelector('#nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  menuToggle.textContent = open ? '✕' : '☰';
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú');
  menuToggle.textContent = '☰';
}));
