
import Alert from 'react-bootstrap/Alert';

const Notification = ({notifClass, notifMessage}) =>{
    if (notifMessage === null){
        return null
      }

      return (
        <Alert variant={notifClass} style={{padding: "6px"}}>
          {notifMessage}
        </Alert>

      )
}

export default Notification