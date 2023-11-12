/* eslint-disable react/prop-types */
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editSingleIdentificationItem } from '../../features/studySet/studySetSlice';

const EditIdentification = ({currentSet, studySetItems, itemNo, item, setEditItems}) => {

    const dispatch = useDispatch();
    const currentFormState = studySetItems.filter(i => i.createdOn === item);
    const [editedItem, setEditedItem] = useState(currentFormState);
    const currentSetName = useSelector(state => state.studySetList).filter(set => set.createdOn === Number(currentSet))[0].setName;

    const handleForm = (e) => {
        const { name, value, type, checked } = e.target;
        const updatedItems = [...editedItem];
        
        if (type === 'checkbox') {
            updatedItems[0] = {
                ...updatedItems[0],
                [name]: checked,
            };
        } else {
            updatedItems[0] = {
                ...updatedItems[0],
                [name]: value,
            };
        }

        setEditedItem(updatedItems);
    }

    const handleSaveItem = (e) => {
        e.preventDefault();
        const editedItemObj = editedItem[0]
        const updatedSet = {
            item,
            editedItemObj,
            currentSet
        }
        dispatch(editSingleIdentificationItem(updatedSet));
        setEditItems(false);
    };

    const statementInput = editedItem[0].statement.length;
    const answerInput = editedItem[0].answer.length;

    return ( 
        <div className="edit-items-container">
            <div className="current-set">
                <span className="itemNo">{`Item #${itemNo} `}</span>
                <span>{ `(${currentSetName})` } </span>
            </div><hr />
            
            <div className="items-container">
                <Form>
                    <ul>
                        <li>
                            <Form.Group className="statement">
                                <Form.Label>Statement</Form.Label>
                                <Form.Control
                                    name="statement"
                                    value={editedItem[0].statement}
                                    as="textarea"
                                    onChange={handleForm}
                                    
                                />
                            </Form.Group>
                            <Form.Group className="statement">
                                <Form.Label className="answer">Answer</Form.Label>
                                <Form.Check
                                    className="case-sensitive"
                                    name="caseSensitive"
                                    type='checkbox'
                                    label='Case Sensitive'
                                    id={`case-sensitive`}
                                    onChange={handleForm}
                                    checked={editedItem[0].caseSensitive}
                                />
                                <p className="input-info">{ `Use a comma (",") to separate alternative answers.` }</p>
                                <Form.Control
                                    name="answer"
                                    value={editedItem[0].answer}
                                    onChange={handleForm}
                                />
                            </Form.Group>
                        </li> 
                    </ul>
                    <div className="row item-btns mx-0 w-100">
                        <Button
                            className="edit-save w-25 mx-auto"
                            type='submit'
                            variant="primary"
                            onClick={handleSaveItem}
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
 
export default EditIdentification;