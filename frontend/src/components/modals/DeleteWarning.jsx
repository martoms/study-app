/* eslint-disable react/prop-types */
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const DeleteWarning = ({deleteWarning, handleCloseDeleteWarning, handleDelete, selection}) => {

    const { timeStamp } = useParams();
    const whatToDelete = useSelector(state => state.generalState.whatToDelete);
    const currentSet = useSelector(state => state.studySetList).filter(set => set.createdOn === Number(timeStamp))[0]?.setName;

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
        <Modal show={deleteWarning} onHide={handleCloseDeleteWarning} centered >
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
                    style={{marginRight: "5px"}}
                >
                    Cancel
                </Button>
                <Button
                    type='submit'
                    variant="primary"
                    onClick={handleDelete}
                >
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
 
export default DeleteWarning;