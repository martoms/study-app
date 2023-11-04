/* eslint-disable react/prop-types */
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addIdentificationItems } from '../../features/studySet/studySetSlice';

const Identification = ({currentSet, studySetItems}) => {

    const dispatch = useDispatch();
    const initialFormState = [{
        statement: '',
        answer: '',
        caseSensitive: false
    }];
    const [newItems, setNewItems] = useState(initialFormState);
    const [itemCount, setItemCount] = useState(1);

    const handleForm = (e, i) => {
        const { name, value, type, checked } = e.target;
        const updatedItems = [...newItems];
        
        if (type === 'checkbox') {
            updatedItems[i] = {
                ...updatedItems[i],
                [name]: checked,
                category: 'identification',
                itemNo: studySetItems + 1 + i
            };
        } else {
            updatedItems[i] = {
                ...updatedItems[i],
                [name]: value,
                category: 'identification',
                itemNo: studySetItems + 1 + i
            };
        }

        setNewItems(updatedItems);
    }

    const handleSaveItems = (e) => {
        e.preventDefault();
        const updatedSet = {
            newItems,
            currentSet
        }
        dispatch(addIdentificationItems(updatedSet))
    };

    let items = [];

    for (let i = 1; i <= itemCount; i++) {
        items.push(
            <li key={i}>
                <Form.Group className="statement">
                    <Form.Label>Statement</Form.Label>
                    <Form.Control
                        name="statement"
                        value={newItems[i - 1].statement}
                        as="textarea"
                        onChange={(e) => handleForm(e, (i-1))}
                        
                    />
                </Form.Group>
                <Form.Group className="statement">
                    <Form.Label className="answer">Answer</Form.Label>
                    <Form.Check
                        className="case-sensitive"
                        name="caseSensitive"
                        type='checkbox'
                        label='Case Sensitive'
                        id={`case-sensitive-${i}`}
                        onChange={(e) => handleForm(e, (i-1))}
                    />
                    <p className="input-info">{ `Use a comma (",") to separate alternative answers.` }</p>
                    <Form.Control
                        name="answer"
                        value={newItems[i - 1].answer}
                        onChange={(e) => handleForm(e, (i-1))}
                    />
                </Form.Group>
            </li>
        )
    }

    const statementInput = newItems[newItems.length - 1].statement.length;
    const answerInput = newItems[newItems.length - 1].answer.length;

    return ( 
        <div className="add-items-container">
            <div><span className="itemNo">{`Item #${studySetItems + newItems.length} `}</span><span>{ `(${currentSet})` } </span></div><hr />
            <div className="items-container">
                <Form>
                    <ul>
                        { items }   
                    </ul>
                    <div className="row item-btns">
                        <Button
                            className="col-md-6"
                            type='button'
                            variant="light"
                            // onClick={handleCloseAddItems}
                        >
                            Add More
                        </Button>
                        <Button
                            className="col-md-6"
                            type='submit'
                            variant="primary"
                            onClick={handleSaveItems}
                            disabled={!statementInput || !answerInput}
                        >
                            Save
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
 
export default Identification;