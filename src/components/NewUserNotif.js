
import React, {useState} from "react"
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

const NewUserNotif= () => {
    const [show, setShow] = useState(true);
  
    return (
      <div className="newUserNotif">
        <Alert show={show} variant="success">
          <Alert.Heading>New Player?</Alert.Heading>
          <div>
            The goal of the game is to type the alphabet in order in the shortest time.
          </div>
          <div>
            The timer begins as soon as you type.
          </div>
          <hr />
          <div className="d-flex justify-content-center">
            <Button onClick={() => setShow(false)} variant="outline-success">
              I understand the game
            </Button>
          </div>
        </Alert>
      </div>
    );
}

export default NewUserNotif