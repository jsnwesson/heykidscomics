import './App.css';
import React from 'react';
import axios from 'axios';
import { Button, Divider, Grid } from 'semantic-ui-react';
import Header from './components/Header.js';
import Search from './components/Search.js';
import Feed from './components/Feed.js';
import Collection from './components/Collection.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      collectionToAddTo: '',
      collectionNames: [],
      currentCollection: [],
      currentIssuesQuery: [],
      currentSeriesQuery: [{id: 1, title:'Search for any Marvel comic!', thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg'}],
      toBeAdded: [],
    }

    this.addToList = this.addToList.bind(this);
    this.getCollection = this.getCollection.bind(this);
    this.getCollectionList = this.getCollectionList.bind(this);
    this.handleCollectionName = this.handleCollectionName.bind(this);
    this.searchSeries = this.searchSeries.bind(this);
    this.searchIssues = this.searchIssues.bind(this);
  }

  componentDidMount() {
    this.getCollectionList();
  }

  addToList(issue) {
    let prevAdded = this.state.toBeAdded;
    this.setState({
      toBeAdded: [...prevAdded, issue]
    })
  }

  handleCollectionName(term) {
    this.setState({
      collectionToAddTo: term,
    })
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
      .catch((err) => {
        console.log(err)
      })
  }

  searchIssues(id) {
    axios.get('http://localhost:3000/issues', {params: {seriesId: id}})
      .then((results) => {
        let data = results.data.data.results;
        let issueResults = data.map((entry) => {
          return {
            listCollection:this.state.collectionToAddTo,
            issueId: entry.id,
            issue: entry.issueNumber,
            digitalId: entry.digitalId,
            thumbnail: `${entry.thumbnail.path}.jpg`,
            title: entry.title,
            url: entry.urls[0].url,
          }
        })
        this.setState({
          currentIssuesQuery: issueResults,
        })
      })
      .catch((err) => {
        console.log(err)
      })
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
    if (this.state.collectionNames.indexOf(this.state.collectionToAddTo) < 0) {
      axios.post('http://localhost:3000/saveIssues', {
        collectionToAddTo: this.state.collectionToAddTo,
        toBeAdded: this.state.toBeAdded,
      })
        .then((response) => {
          this.setState({
            toBeAdded: [],
          })
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          this.getCollectionList();
        })
    } else {
      axios.post('http://localhost:3000/saveIssues', {
        toBeAdded: this.state.toBeAdded,
      })
        .then((response) => {
          this.setState({
            toBeAdded: [],
          })
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          this.getCollectionList();
        })
    }
  }

  render() {
    return (
      <div className="App">
        <Grid id='grid'>
          <Grid.Row >
            <Grid.Column width={16}>
              <Header />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className='App-header' centered columns={3} textAlign='center'>
            <Grid.Column width={3}>
              <Search
                collectionToAddTo={this.state.collectionToAddTo}
                handleCollectionName={this.handleCollectionName}
                searchSeries={this.searchSeries}
              />
              <Divider hidden />
              <Button
                disabled={this.state.toBeAdded.length === 0 ? true : false}
                onClick={() => {this.postCollection()}}
              >Submit to Collection</Button>
            </Grid.Column>
            <Grid.Column width={8}>
              <Feed
                addToList={this.addToList}
                currentSeriesQuery={this.state.currentSeriesQuery}
                currentIssuesQuery={this.state.currentIssuesQuery}
                searchIssues={this.searchIssues}
              />
            </Grid.Column>
            <Grid.Column textAlign='right' width={3}>
              <Collection
                collectionNames={this.state.collectionNames}
                currentCollection={this.state.currentCollection}
                getCollection={this.getCollection} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default App;
