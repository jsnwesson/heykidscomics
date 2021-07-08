import React from 'react';
import { Button, Image, Modal } from 'semantic-ui-react';


const Collection = ({collectionNames, currentCollection, getCollection}) => {
  const [open, setOpen] = React.useState(false)

  let list = collectionNames.map((name) => {
    return (
      // <Modal
      //   key={name}
      //   onClick={() => {
      //     getCollection(name)
      //   }}
      // >
      <Modal
        key={name}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={<Button onClick={() => {getCollection(name)}}>{name}</Button>}
      >
        <Modal.Header>{name}</Modal.Header>
          {currentCollection.map((issue) => {
            return (
              <Modal.Content key={issue.id} image scrolling>
                <Image
                  as='a'
                  href={issue.digitalId > 0 ? `https://read.marvel.com/#/book/${issue.digitalId}` : issue.url}
                  rel='noreferrer'
                  size='small'
                  src={issue.thumbnail}
                  target='_blank'
                  wrapped/>
                <Modal.Description>
                  <a href={issue.digitalId > 0 ? `https://read.marvel.com/#/book/${issue.digitalId}` : issue.url} target='_blank' rel='noreferrer'  >{issue.title}</a>
                </Modal.Description>
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