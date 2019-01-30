import React from 'react';
import Event from './Event.jsx';

const EventList = ({events}) => {
  return (
    <div>
      <h2>Events</h2>
      {
        events.map((event, index) => <Event key={index} event={event}/>)
      }
    </div>
  );
}

export default EventList;