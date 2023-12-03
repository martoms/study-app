/* eslint-disable react/prop-types */
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editSingleIdentificationItem } from '../../features/studySet/studySetSlice';

const EditFillInTheBlanks = ({currentSet, studySetItems, itemNo, item, setEditItems}) => {

    const dispatch = useDispatch();
    const currentFormState = studySetItems.filter(i => i.createdOn === item);
    const [editedItem, setEditedItem] = useState(currentFormState);
    const currentSetName = useSelector(state => state.studySetList).filter(set => set.createdOn === Number(currentSet))[0].setName;
    const blankItems = editedItem[0]?.blanks;

    const handleForm = (e, i) => {
        const { name, value, type, checked } = e.target;
        const updatedItems = [...editedItem];
        
        if (type === 'checkbox') {
            updatedItems[0] = {
                ...updatedItems[0],
                [name]: checked,
            };
        } else if (type === 'textarea') {
            const matchedBlanks = (value.match(/BLANK/g) || []).length;

            updatedItems[0] = {
                ...updatedItems[0],
                [name]: value,
                blanks: Array.from({ length: matchedBlanks }, (_, index) => {
                    return updatedItems[0]?.blanks?.[index] || '';
                }),
            };
        } else if (type === 'text') {
            updatedItems[0] = {
                ...updatedItems[0],
                blanks: updatedItems[0].blanks.map((blank, index) => {
                    if (index === i) { 
                        return value;
                    }
                    return blank;
                }),
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
    const answerInput = editedItem[0].blanks.every((blank) => blank.length > 0);

    return ( 
        <div className="edit-items-container">
            <div className="current-set">
                <span className="itemNo">{`Item #${itemNo} `}</span>
                <span>{ `(${currentSetName})` } </span>
            </div><hr />
            
            <div className="items-container">
                <Form>
                    <ul className="fill-in-the-blanks">
                        <li>
                            <Form.Group className="statement">
                                <Form.Label>Statement</Form.Label>
                                <p className="input-info">{ `Write as many "BLANK" to create blank item(s).` }</p>
                                <Form.Control
                                    name="statement"
                                    value={editedItem[0].statement}
                                    as="textarea"
                                    onChange={handleForm}
                                    
                                />
                            </Form.Group>
                            {
                                editedItem[0]?.blanks.length ?
                                <Form.Group className="statement">
                                    <Form.Label className="answer">Answer</Form.Label>
                                    <Form.Check
                                        className="case-sensitive"
                                        name="caseSensitive"
                                        type='checkbox'
                                        label='Case Sensitive'
                                        id={`case-sensitive-${0}`}
                                        onChange={(e) => handleForm(e)}
                                        checked={editedItem[0]?.caseSensitive}
                                    />
                                    <p className="input-info">{ `Use a comma (",") to separate alternative answers.` }</p>
                                    <div className="multiple-answers">
                                        {blankItems.map((blank, i) => (
                                            <div className="blank-input" key={i}>
                                                <span>{i + 1}</span>
                                                <Form.Control
                                                    name={`answer-${i}`}
                                                    value={blank}
                                                    onChange={(e) => handleForm(e, i)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </Form.Group>
                                :
                                <></>
                            }
                        </li> 
                    </ul>
                    <div className="row item-btns mx-0 w-100">
                        <Button
                            className="edit-save w-25 mx-auto"
                            type='submit'
                            variant="primary"
                            onClick={handleSaveItem}
                            disabled={!statementInput || !answerInput || !editedItem[0].blanks.length}
                        >
                            Save
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
 
export default EditFillInTheBlanks;