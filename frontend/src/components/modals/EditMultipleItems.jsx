/* eslint-disable react/prop-types */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EditMultipleIdentification from '../editItems/EditMultipleIdentification';
import EditMultipleFillInTheBlanks from '../editItems/EditMultipleFillInTheBlanks';

const EditMultipleItems = ({editItems, setEditItems, selection, setSelection}) => {

    const { timeStamp } = useParams();
  
    const studySetItems = useSelector(state => state.studySetList).filter(set => set.createdOn === Number(timeStamp))[0].items;
    // this is to keep the order of selection according to the array, instead of the user selection
    selection = studySetItems.filter(item => selection.includes(String(item.createdOn))).map(item => item.createdOn);
    // const itemTypes = studySetItems.map(item => item.itemType);
    let intialFormState = studySetItems.filter(item => selection.includes(item.createdOn));
    const itemTypes = intialFormState.map(item => item.itemType);
    const [updatedItems, setUpdatedItems] = useState(intialFormState);

    const [currentItem, setCurrentItem] = useState(0);

    const handleCloseEditItems = () => {
        setEditItems(false);
    };

    // console.log('intialFormState', intialFormState)

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
                    { itemTypes[currentItem] }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    itemTypes[currentItem] === 'Identification' &&
                    <EditMultipleIdentification
                        updatedItems={updatedItems}
                        setUpdatedItems={setUpdatedItems}
                        currentSet={timeStamp}
                        studySetItems={studySetItems}
                        selection={selection}
                        setSelection={setSelection}
                        currentItem={currentItem}
                        setCurrentItem={setCurrentItem}
                        setEditItems={setEditItems}
                    />
                }
                {
                    itemTypes[currentItem] === 'Fill in the Blanks' &&
                    <EditMultipleFillInTheBlanks
                        updatedItems={updatedItems}
                        setUpdatedItems={setUpdatedItems}
                        currentSet={timeStamp}
                        studySetItems={studySetItems}
                        selection={selection}
                        setSelection={setSelection}
                        currentItem={currentItem}
                        setCurrentItem={setCurrentItem}
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

export default EditMultipleItems;