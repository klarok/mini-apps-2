import React from 'react';
import helpers from '../helpers.js';

const Section = ({label, info}) => {
  return (
    <div>
      {label}: {info}
    </div>
  )
}

const EventEditor = ({data, isClosed, toggleEditor}) => {
  return (
    (isClosed) ? 
      <button onClick={toggleEditor}>Edit</button> :
      <div className="editor">
        <textarea className="editorText"
          defaultValue={JSON.stringify(data)}>
        </textarea>
        <button onClick={toggleEditor}>Cancel</button>
        <button>Save</button>
      </div> 
  )
}

class Event extends React.Component {
  constructor({event}) {
    super();
    this.state = {
      event,
      editorClosed: true
    };
    this.toggleEditor = this.toggleEditor.bind(this);
  }

  toggleEditor() {
    this.setState({ editorClosed: !this.state.editorClosed});
  }

  render() {
    return (
      <div className="event">
        {
          Object.keys(this.state.event).map((key, index) => {
            return <Section key={index} label={key} info={this.state.event[key]} />
          })
        }
        <EventEditor data={this.state.event}
          isClosed={this.state.editorClosed} 
          toggleEditor={this.toggleEditor}/>
      </div>
    );
  }
}

export default Event;