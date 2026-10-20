(() => {
  // Fecha anunciada por Rockstar Games: 19 de noviembre de 2026.
  // El contador utiliza la zona horaria local del dispositivo del visitante.
  const release = new Date(2026, 10, 19, 0, 0, 0);
  const fields = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
  };
  const note = document.getElementById('countdown-note');
  const pad = n => String(n).padStart(2, '0');

  function updateCountdown() {
    const now = new Date();
    let remaining = release.getTime() - now.getTime();

    if (remaining <= 0) {
      fields.days.textContent = '00';
      fields.hours.textContent = '00';
      fields.minutes.textContent = '00';
      fields.seconds.textContent = '00';
      note.textContent = '¡Llegó el día del lanzamiento! Consulta los canales oficiales para conocer la disponibilidad.';
      return;
    }

    const days = Math.floor(remaining / 86400000);
    remaining %= 86400000;
    const hours = Math.floor(remaining / 3600000);
    remaining %= 3600000;
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    fields.days.textContent = String(days).padStart(3, '0');
    fields.hours.textContent = pad(hours);
    fields.minutes.textContent = pad(minutes);
    fields.seconds.textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();