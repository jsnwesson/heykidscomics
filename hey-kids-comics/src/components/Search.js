import { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';

const Search = ({searchIssues, searchSeries}) => {
  const [term, setTerm] = useState('');
  return (
    <div>
      <Form >
        <Form.Group>
          <Form.Input
            placeholder='Insert title of series'
            value={term}
            onChange={(e) => {setTerm(e.target.value)}}
          />
          <Button
            onClick={() => {
              searchSeries(term)
            }}
            type='submit'
          >
            Search
          </Button>
        </Form.Group>
      </Form>
    </div>
  )

}

export default Search;