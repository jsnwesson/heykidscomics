import { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';

const Search = ({collectionToAddTo, handleCollectionName, searchSeries}) => {
  const [term, setTerm] = useState('');

  return (
    <div>
      <Form >
          <Form.Input
            label='Series Title'
            placeholder='Insert title of series'
            value={term}
            onChange={(e) => {setTerm(e.target.value)}}
          />
          <Form.Input
            label='Collection Name'
            placeholder='Insert collection name'
            vale={collectionToAddTo}
            onChange={(e) => {handleCollectionName(e.target.value)}}
          />
          <Button
            onClick={() => {
              searchSeries(term)
            }}
            type='submit'
          >
            Search
          </Button>
      </Form>
    </div>
  )

}

export default Search;