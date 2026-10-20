// Cuenta atrás: fecha de lanzamiento anunciada por Rockstar (19 nov 2026).
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
  menuToggle.textContent = open ? '✕' : '☰';
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

// Contadores compartidos. Servicio externo gratuito; puede tener límites o interrupciones.
const API = 'https://api.counterapi.dev/v1/gta6-counter-community';
const visitCount = document.querySelector('#visit-count');
const likeCount = document.querySelector('#like-count');
const visitStatus = document.querySelector('#visit-status');
const likeStatus = document.querySelector('#like-status');
const likeButton = document.querySelector('#like-button');

async function counterRequest(key, action) {
  const response = await fetch(`${API}/${key}/${action}`, { cache: 'no-store' });
  if (!response.ok) throw new Error('Counter service unavailable');
  return response.json();
}
function formatCount(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n.toLocaleString('es-CL') : '—';
}
async function loadCounters() {
  try {
    const [visits, likes] = await Promise.all([
      counterRequest('visits', 'up'),
      counterRequest('likes', 'get')
    ]);
    visitCount.textContent = formatCount(visits.count ?? visits.value);
    likeCount.textContent = formatCount(likes.count ?? likes.value);
    visitStatus.textContent = 'Actualizado';
    likeStatus.textContent = 'Contador compartido';
  } catch (e) {
    visitCount.textContent = '—';
    likeCount.textContent = '—';
    visitStatus.textContent = 'No disponible ahora';
    likeStatus.textContent = 'No se pudo conectar';
  }
}
likeButton.addEventListener('click', async () => {
  likeButton.disabled = true;
  likeStatus.textContent = 'Guardando like…';
  try {
    const result = await counterRequest('likes', 'up');
    likeCount.textContent = formatCount(result.count ?? result.value);
    likeStatus.textContent = '¡Gracias por el apoyo!';
  } catch (e) {
    likeStatus.textContent = 'No se pudo guardar. Inténtalo otra vez.';
  } finally {
    likeButton.disabled = false;
  }
});
loadCounters();
