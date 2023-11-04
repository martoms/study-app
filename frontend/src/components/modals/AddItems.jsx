import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { addItems, category } from '../../features/generalState/generalStateSlice';
import { useNavigate } from 'react-router-dom';
import Identification from '../addItems/Identification';

const AddItems = () => {
  
    const addNewItems = useSelector(state => state.generalState.addItems);
    const currentCategory = useSelector(state => state.generalState.category);
    const currentSet = useSelector(state => state.generalState.currentSet);
    const studySetItems = useSelector(state => state.studySetList).filter(set => set.setName === currentSet)[0].items.length;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCloseAddItems = () => {
        dispatch(addItems(false));
        dispatch(category(''));
        studySetItems === 0 && navigate('/');
    };

    return (
        <Modal
            className='add-items-modal'
            show={addNewItems}
            size='xl'
            backdrop="static"
            fullscreen={true}
            onHide={handleCloseAddItems}
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    { currentCategory }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { currentCategory === 'Identification' && <Identification currentSet={currentSet} studySetItems={studySetItems} />}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type='button'
                    variant="secondary"
                    onClick={handleCloseAddItems}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddItems;