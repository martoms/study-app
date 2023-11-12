/* eslint-disable react/prop-types */
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editMultipleIdentificationItem } from '../../features/studySet/studySetSlice';
import next from '../../images/next.svg';
import previous from '../../images/previous.svg';

const EditMultipleIdentification = ({
    currentSet,
    studySetItems,
    selection,
    setSelection,
    currentItem,
    setCurrentItem,
    setEditItems
}) => {

    const dispatch = useDispatch();
    const intialFormState = studySetItems.filter(item => selection.includes(item.createdOn))
    const [updatedItems, setUpdatedItems] = useState(intialFormState);
    const currentItemData = studySetItems.filter(item => item.createdOn === Number(selection[currentItem]))[0];
    const itemNo = studySetItems.indexOf(currentItemData) + 1
    const currentSetName = useSelector(state => state.studySetList).filter(set => set.createdOn === Number(currentSet))[0].setName;

    const handleForm = (e, i) => {
        const { name, value, type, checked } = e.target;
        const payload = [...updatedItems];
        
        if (type === 'checkbox') {
            payload[i] = {
                ...payload[i],
                [name]: checked,
            };
        } else {
            payload[i] = {
                ...payload[i],
                [name]: value,
            };
        }

        setUpdatedItems(payload);
    }

    const handleSaveItems = (e) => {
        e.preventDefault();
        const updatedSet = {
            selection,
            updatedItems,
            currentSet
        }
        dispatch(editMultipleIdentificationItem(updatedSet));
        setSelection([]);
        document.querySelectorAll('input[name="selection"]')
            .forEach(elem => elem.checked = false);
        setEditItems(false);
    };

    const handleNav = (e) => {
        const { alt } = e.target;
        if (alt === 'next') {
            if (currentItem + 1 === selection.length) return false
            else {
                setCurrentItem(currentItem + 1);
            }
        } else {
            if (currentItem + 1 === 1) return false
            else {
                setCurrentItem(currentItem - 1);
            }
        }
    };


    let items = [];

    for (let i = 1; i <= selection.length; i++) {
        items.push(
            <li key={i}>
                <Form.Group className="statement">
                    <Form.Label>Statement</Form.Label>
                    <Form.Control
                        name="statement"
                        value={updatedItems[currentItem].statement}
                        as="textarea"
                        onChange={(e) => handleForm(e, currentItem)}
                        
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
                        onChange={(e) => handleForm(e, currentItem)}
                        checked={updatedItems[currentItem].caseSensitive}
                    />
                    <p className="input-info">{ `Use a comma (",") to separate alternative answers.` }</p>
                    <Form.Control
                        name="answer"
                        value={updatedItems[currentItem].answer}
                        onChange={(e) => handleForm(e, currentItem)}
                    />
                </Form.Group>
            </li>
        )
    }

    const statementInput = updatedItems[currentItem].statement.length;
    const answerInput = updatedItems[currentItem].answer.length;


    return ( 
        <div className="add-items-container">
            <div className="current-set">
                <span className="itemNo">{`Item #${itemNo} `}</span>
                <span>{ `(${currentSetName})` } </span>
            </div><hr />
            <div className="navigation">
                <img src={previous} alt="previous" title="Go to previous item" onClick={handleNav} />
                <img src={next} alt="next" title="Go to next item" onClick={handleNav} />
                <p>
                    {`${currentItem + 1} of ${selection.length}`}
                </p>
            </div><hr />
            <div className="items-container">
                <Form>
                    <ul>
                        { items[currentItem] }   
                    </ul>
                    <div className="row item-btns">
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
 
export default EditMultipleIdentification;