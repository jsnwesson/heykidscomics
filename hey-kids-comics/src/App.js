import './App.css';
import React from 'react';
import axios from 'axios';
import {Header, Search, Feed, Collection} from './components'


class App extends React.Components {
  constructor(props){
    super(props);
    this.state = {
      currentCollection: [],
      currentIssuesQuery: [],
      currentSeries: {},
      currentSeriesQuery: [],
      toBeAdded: [],
    }
    this.searchSeries = this.searchSeries.bind(this);
    this.searchIssues = this.searchIssues.bind(this);
  }

  componentDidMount() {

  }

  searchSeries() {
    axios.get('http://localhost:3000/query')
      //setState with series results
  }

  searchIssues() {
    axios.get('http://localhost:3000/issues')
      //setState with issues results
  }

  getCollection() {
    axios.get('http://localhost:3000/collection')
  }

  postCollection() {
    axios.post('http://localhost:3000/saveIssues')
  }

  render() {
    return (
      <div>
        <Header />
        <Search
          searchSeries={this.searchSeries}
          searchIssues={this.searchIssues}
        />
        <Feed />
        <Collection />
      </div>
    )
  }
}

export default App;
