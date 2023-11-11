import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { addItems, itemType } from '../../features/generalState/generalStateSlice';
import { useNavigate } from 'react-router-dom';
import Identification from '../addItems/Identification';

const AddItems = () => {
  
    const addNewItems = useSelector(state => state.generalState.addItems);
    const currentItemType = useSelector(state => state.generalState.itemType);
    const currentSet = useSelector(state => state.generalState.currentSet);
    const studySetItems = useSelector(state => state.studySetList).filter(set => set.createdOn === currentSet)[0].items.length;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCloseAddItems = () => {
        dispatch(addItems(false));
        dispatch(itemType(''));
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
                    { currentItemType }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    currentItemType === 'Identification' &&
                    <Identification
                        currentSet={currentSet}
                        studySetItems={studySetItems}
                        handleCloseAddItems={handleCloseAddItems}
                    />
                }
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