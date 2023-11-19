/* eslint-disable react/prop-types */
import { Modal, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const ExitWarning = ({showExitWarning, handleCloseExitWarning}) => {

    const { timeStamp } = useParams();
    const navigate = useNavigate();

    const handleProceed = () => {
        navigate(`/${timeStamp}`);
    };

    return ( 
        <Modal show={showExitWarning} onHide={handleCloseExitWarning} >
            <Modal.Header closeButton>
                <Modal.Title>Warning!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {`If you click "proceed", you will exit the study session and your current data will not be saved.`}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type='button'
                    variant="secondary"
                    onClick={handleCloseExitWarning}
                    style={{marginRight: "5px"}}
                >
                    Cancel
                </Button>
                <Button
                    type='submit'
                    variant="primary"
                    onClick={handleProceed}
                >
                    Proceed
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
 
export default ExitWarning;