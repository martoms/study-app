/* eslint-disable react/prop-types */
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import slugify from 'slugify';
import { useDispatch } from "react-redux";
import { addItems, currentSet, category } from "../../features/generalState/generalStateSlice";

const AddItemCategory = ({addItem, setAddItem, setName}) => {

    const slug = slugify(setName).toLocaleLowerCase();
    const dispatch = useDispatch();

    const handleCloseAddItem = () => {
        setAddItem(false);
    };

    const handleCategory = (e) => {
        dispatch(addItems(true));
        dispatch(currentSet(setName));
        dispatch(category(e.target.innerHTML));
    };

    return ( 
        <Modal show={addItem} onHide={handleCloseAddItem} centered>
            <Modal.Header closeButton>
                <Modal.Title>Choose Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    <Link to={`/${slug}`} target="_self" onClick={handleCategory}>
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
 
export default AddItemCategory;