/* eslint-disable react/prop-types */
import { Modal, Form, Button } from "react-bootstrap";

const InputRename = ({renameItem, setRenameItem, targetItem, newName, duplicate, setDuplicate, setNewName, handleSubmit}) => {

    const handleCloseRenameItem = () => {
        setRenameItem(false);
        setNewName('');
        setDuplicate(false);
    }

    return ( 
        <Modal show={renameItem} onHide={handleCloseRenameItem}>
            <Form onSubmit={handleSubmit}  >
                <Modal.Header closeButton>
                    <Modal.Title>Rename</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {`Rename "${targetItem}" to:`}
                    </p>
                    <Form.Control
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        maxLength={30}
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
                        onClick={handleCloseRenameItem}
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
 
export default InputRename;