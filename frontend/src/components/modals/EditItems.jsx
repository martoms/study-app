/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EditIdentification from '../editItems/EditIdentification';
import EditFillInTheBlanks from '../editItems/EditFillInTheBlanks';

const EditItems = ({editItems, setEditItems, itemNo, item, itemType}) => {

    const { timeStamp } = useParams();
  
    const studySetItems = useSelector(state => state.studySetList).filter(set => set.createdOn === Number(timeStamp))[0].items;

    const handleCloseEditItems = () => {
        setEditItems(false);
    };

    return (
        <Modal
            className='edit-items-modal'
            show={editItems}
            size='xl'
            backdrop="static"
            fullscreen={true}
            onHide={handleCloseEditItems}
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    { itemType }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    itemType === 'Identification' &&
                    <EditIdentification
                        currentSet={timeStamp}
                        studySetItems={studySetItems}
                        itemNo={itemNo}
                        item={item}
                        setEditItems={setEditItems}
                    />
                }
                {
                    itemType === 'Fill in the Blanks' &&
                    <EditFillInTheBlanks
                        currentSet={timeStamp}
                        studySetItems={studySetItems}
                        itemNo={itemNo}
                        item={item}
                        setEditItems={setEditItems}
                    />
                }
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type='button'
                    variant="secondary"
                    onClick={handleCloseEditItems}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditItems;