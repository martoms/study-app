/* eslint-disable react/prop-types */
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIdentificationItems } from '../../features/studySet/studySetSlice';
import { addItems } from "../../features/generalState/generalStateSlice";
import next from '../../images/next.svg';
import previous from '../../images/previous.svg';
import deleteBtn from '../../images/delete.svg';

const FillInTheBlanks = ({currentSet, studySetItems}) => {

    const dispatch = useDispatch();
    const initialFormState = [{
        statement: '',
        blanks: [],
        caseSensitive: false,
        createdOn: Date.now(),
        itemType: 'Fill in the Blanks'
    }];
    const [newItems, setNewItems] = useState(initialFormState);
    const [itemCount, setItemCount] = useState(1);
    const [currentItem, setCurrentItem] = useState(itemCount - 1);
    const currentSetName = useSelector(state => state.studySetList).filter(set => set.createdOn === Number(currentSet))[0].setName;
    const blankItems = newItems[currentItem]?.blanks;

    const handleForm = (e, i, j) => {
        const { name, value, type, checked } = e.target;
        const updatedItems = [...newItems];

        if (type === 'checkbox') {
            updatedItems[i] = {
                ...updatedItems[i],
                [name]: checked,
            };
        } else if (type === 'textarea') {
            const matchedBlanks = (value.match(/BLANK/g) || []).length;

            updatedItems[i] = {
                ...updatedItems[i],
                [name]: value,
                blanks: Array.from({ length: matchedBlanks }, (_, index) => {
                    return updatedItems[i]?.blanks?.[index] || '';
                }),
            };
        } else if (type === 'text') {
            updatedItems[i] = {
                ...updatedItems[i],
                blanks: updatedItems[i].blanks.map((blank, index) => {
                    if (index === j) {
                        return value;
                    }
                    return blank;
                }),
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
        dispatch(addIdentificationItems(updatedSet));
        setNewItems(initialFormState);
        setItemCount(1);
        setCurrentItem(itemCount);
        dispatch(addItems(false));
    };

    const handleAddMore = () => {
        
        const updatedItems = [...newItems];
        
        updatedItems[itemCount] = {
            ...updatedItems[itemCount],
            statement: '',
            blanks: [],
            caseSensitive: false,
            createdOn: Date.now(),
            itemType: 'Fill in the Blanks'
        };

        setNewItems(updatedItems);
        setItemCount(itemCount + 1);
        setTimeout(() => {
            setCurrentItem(currentItem + 1);
        }, 500)
    }

    const handleNav = (e) => {
        const { alt } = e.target;
        if (alt === 'next') {
            if (currentItem + 1 === itemCount) return false
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

    const handleDelete = () => {
        const updatedItems = newItems.filter((item, index) => index !== currentItem);
        setNewItems(updatedItems);
        setItemCount(itemCount - 1);
        setCurrentItem(currentItem > 0 ? currentItem - 1 : 0);
    };

    let items = [];

    for (let i = 1; i <= itemCount; i++) {
        items.push(
            <li key={i}>
                <Form.Group className="statement">
                    <Form.Label>Statement</Form.Label>
                    <p className="input-info">{ `Write as many "BLANK" to create blank item(s).` }</p>
                    <Form.Control
                        className="fill-in-the-blanks"
                        name="statement"
                        value={newItems[i - 1]?.statement}
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
                        checked={newItems[i - 1]?.caseSensitive}
                    />
                    <p className="input-info">{ `Use a comma (",") to separate alternative answers.` }</p>
                    {
                        newItems[currentItem]?.blanks.length ?
                        <div className="multiple-answers">
                            {blankItems.map((blank, j) => (
                                <div className="blank-input" key={j}>
                                    <span>{j + 1}</span>
                                    <Form.Control
                                        name={`answer-${j}`}
                                        value={blank}
                                        onChange={(e) => handleForm(e, (i - 1), j)}
                                    />
                                </div>
                            ))}
                        </div>
                        :
                        <></>
                    }
                </Form.Group>
            </li>
        )
    }

    const statementInput = newItems[newItems.length - 1].statement.length;
    const answerInput = newItems[newItems.length - 1].blanks.every((blank) => blank.length > 0);

    return ( 
        <div className="add-items-container">
            <div className="current-set">
                {
                    itemCount > 1 && <img src={deleteBtn} alt="delete" title="Delete current item" onClick={handleDelete} />
                }
                <span className="itemNo">{`Item #${studySetItems + currentItem + 1} `}</span>
                <span>{ `(${currentSetName})` } </span>
            </div><hr />
            <div className="navigation">
                <img src={previous} alt="previous" title="Go to previous item" onClick={handleNav} />
                <img src={next} alt="next" title="Go to next item" onClick={handleNav} />
                <p>
                    {`${currentItem + 1} of ${itemCount}`}
                </p>
            </div><hr />
            <div className="items-container">
                <Form>
                    <ul className="fill-in-the-blanks">
                        { items[currentItem] }   
                    </ul>
                    <div className="row item-btns">
                        <Button
                            className="col-md-6"
                            type='button'
                            variant="light"
                            onClick={handleAddMore}
                            disabled={!statementInput || !answerInput || !newItems[currentItem].blanks.length}
                        >
                            Add More
                        </Button>
                        <Button
                            className="col-md-6"
                            type='submit'
                            variant="primary"
                            onClick={handleSaveItems}
                            disabled={!statementInput || !answerInput || !newItems[currentItem].blanks.length}
                        >
                            Save
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
 
export default FillInTheBlanks;