import React from 'react';

const Section = ({label, info}) => {
  if (label === 'id') return '';
  return (
    <div>
      {label}: {info}
    </div>
  )
}

const EventEditor = ({data, toggleEditor, saveEdits}) => {
  return (
    <form className="editor" onSubmit={saveEdits}>
      <textarea className="editorText"
        defaultValue={JSON.stringify(data)}>
      </textarea>
      <button onClick={toggleEditor}>Cancel</button>
      <button type="submit">Save</button>
    </form> 
  )
}

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: props.event,
      editorClosed: true
    };
    this.toggleEditor = this.toggleEditor.bind(this);
    this.saveEdits = this.saveEdits.bind(this);
  }

  toggleEditor(e) {
    e.preventDefault();
    this.setState({ editorClosed: !this.state.editorClosed});
  }

  saveEdits(e) {
    e.preventDefault();
    const oldEvent = Object.assign({}, this.state.event);
    const updatedEvent = JSON.parse(e.currentTarget.children[0].value);
    this.setState({
      event: updatedEvent
    });
    this.props.saveToDatabase(oldEvent, updatedEvent);
  }

  render() {
    return (
      <div className="event">
        {
          Object.keys(this.state.event).map((key, index) => {
            return <Section key={index} label={key} info={this.state.event[key]} />
          })
        }
        {
          (this.state.editorClosed) ? 
            <button onClick={this.toggleEditor}>Edit</button> :
            <EventEditor data={this.state.event}
              toggleEditor={this.toggleEditor}
              saveEdits={this.saveEdits} />
        }
      </div>
    );
  }
}

export default Event;