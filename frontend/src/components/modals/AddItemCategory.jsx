/* eslint-disable react/prop-types */
import { Modal, Button } from "react-bootstrap";

const AddItemCategory = ({addItem, setAddItem}) => {

    const handleCloseAddItem = () => {
        setAddItem(false);
    };

    return ( 
        <Modal show={addItem} onHide={handleCloseAddItem} centered>
            <Modal.Header closeButton>
                <Modal.Title>Choose Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    <li className="opt-btn-1">Identification</li>
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
 
export default AddItemCategory;