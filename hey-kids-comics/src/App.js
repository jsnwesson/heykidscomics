import './App.css';
import React from 'react';
import axios from 'axios';
import {} from 'semantic-ui-react';
import Header from './components/Header.js';
import Search from './components/Search.js';
import Feed from './components/Feed.js';
import Collection from './components/Collection.js';

class App extends React.Component {
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
