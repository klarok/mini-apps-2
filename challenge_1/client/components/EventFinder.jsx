import React from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import EventList from './EventList.jsx';
import ReactPaginate from 'react-paginate';

class EventFinder extends React.Component {
  constructor(props) {
    super();
    this.state = {
      keyword: '',
      events: [],
      pageCount: 0
    }
    this.fetchEvents = this.fetchEvents.bind(this);
    this.changePage = this.changePage.bind(this);
    this.findEvent = this.findEvent.bind(this);
    this.saveToDatabase = this.saveToDatabase.bind(this);
  }

  fetchEvents(keyword, page = 1) {
    axios.get(`/events?q=${keyword}&_page=${page}`)
      .then(results => {
        return this.setState({
          keyword,
          events: results.data,
          pageCount: Math.ceil(results.headers['x-total-count'] / 10)
        })
      })
      .catch(err => console.log('ERROR FETCHING EVENTS', err));
  }

  changePage(data) {
    this.fetchEvents(this.state.keyword, data.selected + 1);
  }

  findEvent(e) {
    if (e.keyCode !== undefined) { //If triggered by keypress event
      if (e.nativeEvent.keyCode !== 13) { return; } //If not 'Enter' key
    }
    const keyword = document.getElementById('searchTerm').value;
    this.fetchEvents(keyword);
  }

  saveToDatabase(oldEvent, updatedEvent) {
    axios.patch(`/events/${oldEvent.id}`, updatedEvent);
  }

  render() {
    return (
      <div>
        <h1>Historical Event Finder</h1>
        <Search clickHandler={this.findEvent} />
        <EventList events={this.state.events} saveToDatabase={this.saveToDatabase}/>
        {
          (this.state.pageCount < 1) ? '' :
            <ReactPaginate
              previousLabel="previous"
              nextLabel="next"
              breakLabel="..."
              pageCount={this.state.pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={1}
              onPageChange={this.changePage}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
              />
        }
      </div>
    );
  }
}

export default EventFinder;
