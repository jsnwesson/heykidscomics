import React from 'react';
import { Image, Segment } from 'semantic-ui-react';

const Feed = ({currentSeriesQuery, currentIssuesQuery, searchIssues}) => {
  if (currentSeriesQuery.length) {
    const feed = currentSeriesQuery.map((series) => {
      return (
        <div key={series.id}>
            <Segment>
              <h2 onClick={() => {searchIssues(series.id)}}>{series.title}</h2>
              <Image onClick={() => {searchIssues(series.id)}} src={series.thumbnail} />
            </Segment>
        </div>
      )
    })
    return (
      <div>
        <Image.Group size='small'>
          {feed}
        </Image.Group>
      </div>
    )
  } else {
    return null;
  }
}

export default Feed;