import React from 'react';
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';

import './TaskCard.css';

class TaskCard extends React.Component {
  render() {
    return (
    <div className={'card-z-'+this.props.card_z+" w-100 row justify-content-center align-items-center"}>
      <Card style={{ width: '40rem' }}>
        <Card.Body>
          <Card.Title>{this.props.data.title}</Card.Title>
          <Card.Text>
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
    )
  }
}

export default TaskCard