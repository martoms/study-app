/* eslint-disable react/prop-types */
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItems, itemType } from "../../features/generalState/generalStateSlice";

const AddItemType = ({addItem, setAddItem, slug}) => {

    const dispatch = useDispatch();

    const handleCloseAddItem = () => {
        setAddItem(false);
    };

    const handleType = (e) => {
        dispatch(addItems(true));
        dispatch(itemType(e.target.innerHTML));
    };

    return ( 
        <Modal show={addItem} onHide={handleCloseAddItem} centered>
            <Modal.Header closeButton>
                <Modal.Title>Choose Item Type</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    <Link to={`/${slug}`} target="_self" onClick={handleType}>
                        <li className="opt-btn-1">Identification</li>
                    </Link>
                </ul>
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