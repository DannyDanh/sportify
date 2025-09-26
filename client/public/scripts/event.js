// Detail page: match event data, stay close to original

const renderEvent = async () => {
  const requestedID = parseInt(window.location.href.split('/').pop(), 10);

  const response = await fetch('/events');
  const data = await response.json();

  const eventContent = document.getElementById('event-content') || document.getElementById('gift-content');

  const event = Array.isArray(data) ? data.find(e => Number(e.id) === requestedID) : null;

  if (event) {
    const byId = id => document.getElementById(id);

    if (byId('image')) byId('image').src = event.image || '';
    if (byId('name')) byId('name').textContent = event.eventName || 'Untitled Event';
    if (byId('submittedBy')) byId('submittedBy').textContent = 'Submitted by: ' + (event.submittedBy || '');
    if (byId('pricePoint')) byId('pricePoint').textContent = 'Ticket Price: ' + (event.ticketPrice || '');
    if (byId('audience')) byId('audience').textContent = 'Teams: ' + (event.teams || '');

    // Optional extra fields if you added elements for them
    if (byId('sport') && event.sport) byId('sport').textContent = 'Sport: ' + event.sport;
    if (byId('venue') && event.venue) byId('venue').textContent = 'Venue: ' + event.venue;
    if (byId('dateTime') && event.dateTime) {
      const dt = new Date(event.dateTime);
      byId('dateTime').textContent = 'When: ' + (isNaN(dt)
        ? event.dateTime
        : new Intl.DateTimeFormat(undefined, {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
            hour: 'numeric', minute: '2-digit'
          }).format(dt));
    }
    if (byId('description')) byId('description').textContent = event.description || '';

    document.title = `Sportify - ${event.eventName || 'Event'}`;
  } else {
    if (eventContent) {
      const message = document.createElement('h1');
      message.textContent = 'No Events Available 😞';
      eventContent.appendChild(message);
    }
  }
};

renderEvent();
