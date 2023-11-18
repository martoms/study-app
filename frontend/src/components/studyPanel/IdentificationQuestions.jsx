/* eslint-disable react/prop-types */

import { Form } from "react-bootstrap";

const IdentificationQuestions = ({statement, answer, caseSensitive}) => {

    console.log(statement)
    
    return ( 
        <div className="question-and-answer identification-questions">
            <div className="statement">
                { statement }
            </div>
            <div className="user-answer">
                <Form>
                    <Form.Control
                        placeholder="Answer..."
                    />
                </Form>
            </div>
        </div>
    );
}
 
export default IdentificationQuestions;