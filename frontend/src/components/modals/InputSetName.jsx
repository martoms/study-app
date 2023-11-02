/* eslint-disable react/prop-types */
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSet } from '../../features/studySet/studySetSlice';
import Modal from 'react-bootstrap/Modal';

const InputSetName = ({ createNewSet, setCreateNewSet }) => {

    
    const [setName, setSetName] = useState('');
    const [duplicate, setDuplicate] = useState(false);
    const dispatch = useDispatch();

    const studySet = useSelector(state => state.studySetList);
    const setNames = studySet.map(studySet => studySet.setName);

    const handleCloseCreateSet = () => {
        setCreateNewSet(false);
        setSetName('');
        setDuplicate(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (setNames.includes(setName)) {
            setDuplicate(true);
        } else {
            dispatch(createSet({
                setName,
                items: [],
                createdOn: Date.now()
            }));
            setSetName('');
            handleCloseCreateSet(true);
        }
    }

    return (
        <Modal show={createNewSet} onHide={handleCloseCreateSet}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Input Set Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        value={setName}
                        onChange={e => setSetName(e.target.value)}
                        maxLength={15}
                        autoFocus
                    />
                    {
                        duplicate &&
                        <p className='error-message'>
                            The name you entered is already taken. 
                        </p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type='button'
                        variant="secondary"
                        onClick={handleCloseCreateSet}
                    >
                        Cancel
                    </Button>
                    <Button
                        type='submit'
                        variant="primary"
                    >
                        OK
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default InputSetName;