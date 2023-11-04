import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { addItems, category } from '../../features/generalState/generalStateSlice';
import { useNavigate } from 'react-router-dom';

const AddItems = () => {
  
    const addNewItems = useSelector(state => state.generalState.addItems);
    const category = useSelector(state => state.generalState.category);
    const currentSet = useSelector(state => state.generalState.currentSet);
    const studySetItems = useSelector(state => state.studySetList).filter(set => set.setName === currentSet)[0].items.length;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCloseAddItems = () => {
        dispatch(addItems(false));
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
                { category }
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <p>
                Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
                commodi aspernatur enim, consectetur. Cumque deleniti temporibus
                ipsam atque a dolores quisquam quisquam adipisci possimus
                laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
                accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
                reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
                deleniti rem!
            </p>
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