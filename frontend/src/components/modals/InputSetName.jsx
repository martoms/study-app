/* eslint-disable react/prop-types */
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSet } from '../../features/studySet/studySetSlice';
import Modal from 'react-bootstrap/Modal';

const InputSetName = ({ createNewSet, handleCloseCreateSet }) => {

    const [setName, setSetName] = useState('');
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createSet({
            setName,
            items: [],
            createdOn: Date.now()
        }));
        setSetName('')
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
                        autoFocus
                    />
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