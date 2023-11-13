/* eslint-disable react/prop-types */

import { Form } from "react-bootstrap";

const IdentificationQuestions = ({statement, answer, caseSensitive}) => {
    
    return ( 
        <div className="question-and-answer identification-questions">
            <div className="statement">
                { statement }
            </div>
            <div className="user-answer">
                <Form>
                    <Form.Control />
                </Form>
            </div>
        </div>
    );
}
 
export default IdentificationQuestions;