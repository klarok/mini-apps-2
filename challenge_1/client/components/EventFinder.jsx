import React from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import EventList from './EventList.jsx';
import helpers from '../helpers.js';
import ReactPaginate from 'react-paginate';

class EventFinder extends React.Component {
  constructor() {
    super();
    this.state = {
      keyword: 'pilgrim',
      events: [],
      pageCount: 0
    }
    this.fetchEvents = this.fetchEvents.bind(this);
    this.changePage = this.changePage.bind(this);
    this.findEvent = this.findEvent.bind(this);
  }
  
  fetchEvents(keyword, page = 1) {
    axios.get(`/events?q=${keyword}&_page=${page}`)
      .then(results => {
        return this.setState({
          keyword,
          events: results.data,
          pageCount: helpers.getPageCount(results.headers['x-total-count'])
        })
      })
      .then(() => console.log('FETCH EVENTS', this.state))
      .catch(err => console.log('ERROR FETCHING EVENTS', err));
  }

  changePage(data) {
    this.fetchEvents(this.state.keyword, data.selected + 1);
  }

  findEvent(e) {
    const keyword = document.getElementById('searchTerm').value;
    this.fetchEvents(keyword);
  }

  render() {
    return (
      <div>
        <h1>Historical Event Finder</h1>
        <Search clickHandler={this.findEvent} />
        <EventList events={this.state.events} />
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
              />
        }
      </div>
    );
  }
}

export default EventFinder;