import React from 'react';

const Section = ({label, info}) => {
  return (
    <div>
      {label}: {info}
    </div>
  )
}
const Event = ({ event }) => {
  return (
    <div className="event">
      {
        Object.keys(event).map((key, index) => {
          return <Section key={index} label={key} info={event[key]} />
        })
      }
    </div>
  );
}

export default Event;