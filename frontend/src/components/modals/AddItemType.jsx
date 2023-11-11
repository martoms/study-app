/* eslint-disable react/prop-types */
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItems, itemType } from "../../features/generalState/generalStateSlice";
import { useLocation } from "react-router-dom";

const AddItemType = ({addItem, setAddItem, currentSet}) => {

    const dispatch = useDispatch();
    const location = useLocation().pathname;

    const handleCloseAddItem = () => {
        setAddItem(false);
    };

    const handleType = (e) => {
        setAddItem(false);
        dispatch(addItems(true));
        dispatch(itemType(e.target.innerHTML));
    };

    return ( 
        <Modal show={addItem} onHide={handleCloseAddItem} centered>
            <Modal.Header closeButton>
                <Modal.Title>Choose Item Type</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    location === '/' ?
                    <ul>
                        <Link to={`/${currentSet}`} target="_self" onClick={handleType}>
                            <li className="opt-btn-1">Identification</li>
                        </Link>
                    </ul>
                    :
                    <ul>
                        <li
                            className="opt-btn-1"
                            onClick={handleType}
                        >
                            Identification
                        </li>
                    </ul>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type='button'
                    variant="secondary"
                    onClick={handleCloseAddItem}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
 
export default AddItemType;