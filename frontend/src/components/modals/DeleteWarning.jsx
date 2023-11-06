/* eslint-disable react/prop-types */
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const DeleteWarning = ({deleteWarning, handleCloseDeleteWarning, handleDelete, selection}) => {

    const whatToDelete = useSelector(state => state.generalState.whatToDelete);
    const currentSet = useSelector(state => state.generalState.currentSet);

    let itemsToDelete;

    if (whatToDelete === 'setName') {
        itemsToDelete = selection.map(setName => {
            return (
                <li key={ setName } className="items-to-be-deleted">
                    { setName }
                </li>
            )
        })
    }

    return ( 
        <Modal show={deleteWarning} onHide={handleCloseDeleteWarning} centered>
            <Modal.Header closeButton>
                <Modal.Title>Warning!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="delete-warning-txt">
                    {
                        whatToDelete === 'items' ?
                        `You are about to delete ${selection.length <= 1 ? '1 item' : ''}${selection.length > 1 ? selection.length : ''} ${selection.length > 1 ? 'items' : ''} from your study set in "${currentSet}"`
                        :
                        `You are about to delete the following ${selection.length <= 1 ? 'item' : 'items'} from your study table:`
                    }
                </p>
                {
                    whatToDelete === 'items' ?
                    <></>
                    :
                    <ul>
                        { itemsToDelete }
                    </ul>
                }
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