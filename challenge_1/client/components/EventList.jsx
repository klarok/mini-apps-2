import React from 'react';
import Event from './Event.jsx';

const EventList = ({events, saveToDatabase}) => {
  return (
    <div>
      <h2>Events</h2>
      {
        events.map((event, index) => 
          <Event key={index} 
            event={event} 
            saveToDatabase={saveToDatabase}/>)
      }
    </div>
  );
}

export default EventList;