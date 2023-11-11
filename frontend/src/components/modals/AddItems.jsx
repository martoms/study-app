import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { addItems, itemType } from '../../features/generalState/generalStateSlice';
import { useNavigate } from 'react-router-dom';
import Identification from '../addItems/Identification';
import { useParams } from 'react-router-dom';

const AddItems = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { timeStamp } = useParams();
  
    const addNewItems = useSelector(state => state.generalState.addItems);
    const currentItemType = useSelector(state => state.generalState.itemType);
    const studySetItems = useSelector(state => state.studySetList).filter(set => set.createdOn === Number(timeStamp))[0].items.length;

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
                        currentSet={timeStamp}
                        studySetItems={studySetItems}
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