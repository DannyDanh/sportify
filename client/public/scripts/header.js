// scripts/header.js
window.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if (!header) return; // safety guard

  const headerContainer = document.createElement('div');
  headerContainer.className = 'header-container';

  const headerLeft = document.createElement('div');
  headerLeft.className = 'header-left';

  const headerLogo = document.createElement('img');
  headerLogo.src = '/public/logo.png';
  headerLogo.alt = 'Sportify Logo';
  headerLogo.style.cursor = 'pointer';
  headerLogo.addEventListener('click', () => (window.location = '/'));

  const headerTitle = document.createElement('h1');
  headerTitle.textContent = 'Sportify';

  headerLeft.appendChild(headerLogo);
  headerLeft.appendChild(headerTitle);

  const headerRight = document.createElement('div');
  headerRight.className = 'header-right';

  // Home button (unchanged)
  const homeBtn = document.createElement('button');
  homeBtn.textContent = 'Home';
  homeBtn.addEventListener('click', () => {
    window.location = '/';
  });
  headerRight.appendChild(homeBtn);

  // NEW: Surprise Me button
  const surpriseBtn = document.createElement('button');
  surpriseBtn.id = 'surprise-btn';
  surpriseBtn.textContent = 'SURPRISE ME !!!';
  surpriseBtn.addEventListener('click', async () => {
    try {
      surpriseBtn.disabled = true;
      const resp = await fetch('/events', { headers: { Accept: 'application/json' } });
      if (!resp.ok) throw new Error('Failed to load events');
      const events = await resp.json();
      if (!Array.isArray(events) || events.length === 0) {
        alert('No events available right now.');
        return;
      }
      const r = events[Math.floor(Math.random() * events.length)];
      // Navigate to your detail page (works in Vite dev)
      window.location.href = `/events/${encodeURIComponent(r.id)}`;
      // If your server handles /events/:id paths instead, use:
      // window.location.href = `/events/${encodeURIComponent(r.id)}`;
    } catch (e) {
      console.error(e);
      alert('Could not pick a random event.');
    } finally {
      surpriseBtn.disabled = false;
    }
  });
  headerRight.appendChild(surpriseBtn);

  headerContainer.appendChild(headerLeft);
  headerContainer.appendChild(headerRight);
  header.appendChild(headerContainer);
});
