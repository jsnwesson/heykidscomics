import './App.css';
import React from 'react';
import axios from 'axios';
import { Grid } from 'semantic-ui-react';
import Header from './components/Header.js';
import Search from './components/Search.js';
import Feed from './components/Feed.js';
import Collection from './components/Collection.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      collectionNames: [],
      currentCollection: [],
      currentIssuesQuery: [],
      currentSeries: {},
      currentSeriesQuery: [],
      toBeAdded: [],
    }

    this.getCollection = this.getCollection.bind(this);
    this.getCollectionList = this.getCollectionList.bind(this);
    this.searchSeries = this.searchSeries.bind(this);
    this.searchIssues = this.searchIssues.bind(this);
  }

  componentDidMount() {
    this.getCollectionList();
  }

  searchSeries(term) {
    axios.get('http://localhost:3000/query', {params: {series: term}})
      .then((results) => {
        let data = results.data.data.results;
        let searchResults = data.map((entry) => {
          return {
            id: entry.id,
            title: entry.title,
            thumbnail: `${entry.thumbnail.path}.jpg`,
            url: entry.urls[0].url,
          }
        })
        this.setState({
          currentSeriesQuery: searchResults,
        })
      })
  }

  searchIssues() {
    axios.get('http://localhost:3000/issues')
      //setState with issues results
  }

  getCollection(value) {
    axios.get('http://localhost:3000/collection', {params: {listCollection: value}})
      .then((response) => {
        this.setState({
          currentCollection: response.data,
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getCollectionList() {
    axios.get('http://localhost:3000/collectionlist')
    .then((response) => {
      let names = (response.data.map((collection) => {
        return collection.title;
      }))
      this.setState({
        collectionNames: names,
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  postCollection() {
    axios.post('http://localhost:3000/saveIssues')
  }

  render() {
    return (
      <div>
        <Grid.Row>
          <Header />
        </Grid.Row>
        <Grid.Row>
          <Search
            searchSeries={this.searchSeries}
            searchIssues={this.searchIssues}
            />
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Feed
              currentSeriesQuery={this.state.currentSeriesQuery}
              currentIssuesQuery={this.state.currentIssuesQuery}
            />
          </Grid.Column>
          <Grid.Column>
            <Collection
              collectionNames={this.state.collectionNames}
              currentCollection={this.state.currentCollection}
              getCollection={this.getCollection} />
          </Grid.Column>
        </Grid.Row>
      </div>
    )
  }
}

export default App;
