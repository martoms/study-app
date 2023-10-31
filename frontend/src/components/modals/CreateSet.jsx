/* eslint-disable react/prop-types */
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const CreateSet = ({ createSet, handleCloseCreateSet }) => {

  return (
    <Modal show={createSet} onHide={handleCloseCreateSet}>
        <Modal.Header closeButton>
            <Modal.Title>Input Set Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control autoFocus/>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCreateSet}>
                Cancel
            </Button>
        </Modal.Footer>
    </Modal>
  );
}

export default CreateSet;