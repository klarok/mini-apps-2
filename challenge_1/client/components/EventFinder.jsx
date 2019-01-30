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
      events: [],
      pages: {
        first: null,
        prev: null,
        next: null,
        last: null
      }
    }
    this.fetchEvents = this.fetchEvents.bind(this);
  }

  componentDidMount() {
    this.fetchEvents('pilgrim');
  }

  fetchEvents(keyword) {
    axios.get(`/events?q=${keyword}&_page=1`)
      .then(results => {

        console.log(results.headers.link);
        return this.setState({
          events: results.data,
          pages: helpers.extractPageLinks(results.headers.link)
        })
      })
      .then(() => console.log('FETCH EVENTS', this.state))
      .catch(err => console.log('ERROR FETCHING EVENTS', err));
  }

  changePage(e) {

  }

  render() {
    return (
      <div>
        <h1>Historical Event Finder</h1>
        <Search />
        <EventList events={this.state.events} />
        <ReactPaginate
          previousLabel="previous"
          nextLabel="next"
          breakLabel="..."
          pageCount={10}
          marginPagesDisplayed={1}
          pageRangeDisplayed={1}
          onPageChange={() => console.log('paging')}
          />
      </div>
    );
  }
}

export default EventFinder;