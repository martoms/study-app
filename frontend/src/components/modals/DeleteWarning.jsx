/* eslint-disable react/prop-types */
import { Modal, Button } from "react-bootstrap";

const DeleteWarning = ({deleteWarning, handleCloseDeleteWarning, handleDelete, selection}) => {

    const itemsToDelete = selection.map(setName => {
        return (
            <li key={ setName } className="items-to-be-deleted">
                { setName }
            </li>
        )
    })

    return ( 
        <Modal show={deleteWarning} onHide={handleCloseDeleteWarning} centered>
            <Modal.Header closeButton>
                <Modal.Title>Warning!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    <p className="delete-warning-txt">
                        {`You are about to delete the following ${selection.length <= 1 ? 'item' : 'items'} from your study table:`}
                    </p>
                }
               <ul>
                    { itemsToDelete }
               </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type='button'
                    variant="secondary"
                    onClick={handleCloseDeleteWarning}
                >
                    Cancel
                </Button>
                <Button
                    type='button'
                    variant="primary"
                    onClick={() => handleDelete()}
                >
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
 
export default DeleteWarning;