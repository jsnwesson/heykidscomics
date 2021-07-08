import React from 'react';
import { Button, Card, Image, Modal } from 'semantic-ui-react';


const Collection = ({collectionNames, currentCollection, getCollection}) => {
  const [open, setOpen] = React.useState(false)

  let list = collectionNames.map((name) => {
    return (
      <Modal
        key={name}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        size='tiny'
        trigger={<Button onClick={() => {getCollection(name)}}>{name}</Button>}
      >
        <Modal.Header>{name}</Modal.Header>
          {currentCollection.map((issue) => {
            return (
              <Modal.Content key={issue.id}>
                <Card centered color='red' raised
                >
                  <Image
                    as='a'
                    href={issue.digitalId > 0 ? `https://read.marvel.com/#/book/${issue.digitalId}` : issue.url}
                    label={issue.digitalId > 0 ? { as: 'a', color: 'red', corner: 'right', icon: 'desktop' } : null}
                    rel='noreferrer'
                    size='medium'
                    src={issue.thumbnail}
                    target='_blank'
                    wrapped/>
                  <Card.Content textAlign='center'>
                    <Card.Header
                      href={issue.digitalId > 0 ? `https://read.marvel.com/#/book/${issue.digitalId}` : issue.url}
                      target='_blank'
                      rel='noreferrer'>
                      {issue.title}
                    </Card.Header>
                  </Card.Content>
                </Card>
              </Modal.Content>
            )
          })}
      </Modal>
    )
  })
  return (
    <div>
      <ul>
        {list}
      </ul>
    </div>
  )
}

export default Collection;