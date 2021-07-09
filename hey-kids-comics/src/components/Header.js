import React from 'react';
import { Card } from 'semantic-ui-react';
import './components.css'

const Header = () => {
  return (
      <Card id='topHeader' fluid>
        <Card.Header textAlign='center'><h1>Hey Kids Comics!</h1></Card.Header>
      </Card>
  )

}

export default Header;