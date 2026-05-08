import React, { useState, useEffect } from 'react';

const CalendarEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On S3, we fetch a static JSON representation of your calendar.
    // You can automate the generation of this JSON before running 'npm run build'.
    fetch('/data/calendar-events.json')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError("Oops, we haven't got JSON!");
        }
        return res.json();
      })
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load events:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading events...</div>;

  return (
    <div className="events-list">
      {events.map((event, index) => (
        <div key={index} className="event-item" style={{ marginBottom: '10px' }}>
          <b><i>{event.summary}: </i></b><br />
          <i>Date/Time: </i> {event.start} to {event.end}<br />
        </div>
      ))}
      {events.length === 0 && <p>No upcoming events.</p>}
    </div>
  );
};

export default CalendarEvents;