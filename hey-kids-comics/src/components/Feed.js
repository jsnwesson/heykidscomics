import React from 'react';
import { Button, Card, Image, Modal, Segment } from 'semantic-ui-react';

const Feed = ({addToList, currentSeriesQuery, currentIssuesQuery, searchIssues}) => {
  const [open, setOpen] = React.useState(false)

    const feed = currentSeriesQuery.map((series) => {
      console.log(series.title)
      return (
        <div key={series.id}>
          <Segment>
            <Modal
              key={series.id}
              open={open}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              size='tiny'
              trigger={
                <Image onClick={() => {searchIssues(series.id)}} src={series.thumbnail} />}
            >
              {currentIssuesQuery.map((issue) => {
                return (
                  <Modal.Content key={issue.id}>
                    <Card centered color='red' raised >
                      <Image
                        label={issue.digitalId > 0 ? { as: 'a', color: 'red', corner: 'right', icon: 'desktop' } : null}
                        src={issue.thumbnail}
                        wrapped
                      />
                      <Card.Content textAlign='center'>
                        <Card.Header>{issue.title}</Card.Header>
                      </Card.Content>
                    </Card>
                  </Modal.Content>
                  )
              })}
            </Modal>

            <Modal
              key={series.id}
              open={open}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              size='tiny'
              trigger={
                <Button
                  onClick={() => {
                    searchIssues(series.id);
                  }}
                >{series.title}</Button>}
            >
              {currentIssuesQuery.map((issue) => {
                return (
                  <Modal.Content key={issue.id}>
                    <Card centered color='red' raised >
                      <Image
                        label={issue.digitalId > 0 ? { as: 'a', color: 'red', corner: 'right', icon: 'desktop' } : null}
                        src={issue.thumbnail}
                        wrapped
                      />
                      <Card.Content textAlign='center'>
                        <Card.Header>{issue.title}</Card.Header>
                      </Card.Content>
                    </Card>
                  </Modal.Content>
                )
              })}
            </Modal>
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
}

export default Feed;