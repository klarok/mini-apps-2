import React from 'react';

const Event = ({ event }) => {
  return (
    <div>
      {JSON.stringify(event)}
    </div>
  );
}

export default Event;