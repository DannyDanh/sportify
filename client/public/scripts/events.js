// simple, close to original, plus 404 check for invalid /events/:id

const renderEvents = async () => {
  const response = await fetch('/events');
  const data = await response.json();

  const mainContent = document.getElementById('main-content');

  if (data && data.length) {
    data.map(event => {
      const card = document.createElement('div');
      card.classList.add('card');

      const topContainer = document.createElement('div');
      topContainer.classList.add('top-container');

      const bottomContainer = document.createElement('div');
      bottomContainer.classList.add('bottom-container');

      topContainer.style.backgroundImage = `url(${event.image})`;

      const name = document.createElement('h3');
      name.textContent = event.eventName || event.name;
      bottomContainer.appendChild(name);

      const pricePoint = document.createElement('p');
      pricePoint.textContent = 'Price: ' + (event.ticketPrice || event.pricePoint || '');
      bottomContainer.appendChild(pricePoint);

      const teams = document.createElement('p');
      teams.textContent = 'Teams: ' + (event.teams || '');
      bottomContainer.appendChild(teams);

      const link = document.createElement('a');
      link.textContent = 'Read More >';
      link.setAttribute('role', 'button');
      link.href = `/events/${event.id}`;
      bottomContainer.appendChild(link);

      card.appendChild(topContainer);
      card.appendChild(bottomContainer);
      mainContent.appendChild(card);
    });

    // after we have data, validate the URL: /events or /events/:id must match
    const parts = window.location.pathname.split('/').filter(Boolean);
    const last = parts[parts.length - 1];
    if (last && last !== 'events') {
      const validId = data.some(e => String(e.id) === last);
      if (!validId) window.location.href = '/404.html';
    }

  } else {
    const message = document.createElement('h2');
    message.textContent = 'No Events Available 😞';
    mainContent.appendChild(message);
  }
};

const requestedUrl = window.location.href.split('/').pop()
if (requestedUrl) {
  window.location.href = '../404.html'
}
else {
    renderEvents()
}
