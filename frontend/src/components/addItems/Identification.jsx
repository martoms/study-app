/* eslint-disable react/prop-types */
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIdentificationItems } from '../../features/studySet/studySetSlice';
import { addItems } from "../../features/generalState/generalStateSlice";
import next from '../../images/next.svg';
import previous from '../../images/previous.svg';
import deleteBtn from '../../images/delete.svg';

const Identification = ({currentSet, studySetItems}) => {

    const dispatch = useDispatch();
    const initialFormState = [{
        statement: '',
        answer: '',
        caseSensitive: false,
        createdOn: Date.now(),
        itemType: 'Identification'
    }];
    const [newItems, setNewItems] = useState(initialFormState);
    const [itemCount, setItemCount] = useState(1);
    const [currentItem, setCurrentItem] = useState(itemCount - 1);
    const currentSetName = useSelector(state => state.studySetList).filter(set => set.createdOn === Number(currentSet))[0].setName;

    // const [slideLeft, setSlideLeft] = useState(false);
    // const [slideRight, setSlideRight] = useState(false);

    const handleForm = (e, i) => {
        const { name, value, type, checked } = e.target;
        const updatedItems = [...newItems];
        
        if (type === 'checkbox') {
            updatedItems[i] = {
                ...updatedItems[i],
                [name]: checked,
            };
        } else {
            updatedItems[i] = {
                ...updatedItems[i],
                [name]: value,
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
        // dispatch(itemType(''));
    };

    const handleAddMore = () => {
        
        const updatedItems = [...newItems];
        
        updatedItems[itemCount] = {
            ...updatedItems[itemCount],
            statement: '',
            answer: '',
            caseSensitive: false,
            createdOn: Date.now(),
            itemType: 'Identification'
        };

        setNewItems(updatedItems);
        setItemCount(itemCount + 1);
        // setSlideLeft(true);
        // setSlideRight(false);
        setTimeout(() => {
            setCurrentItem(currentItem + 1);
        }, 500)
    }

    const handleNav = (e) => {
        const { alt } = e.target;
        if (alt === 'next') {
            if (currentItem + 1 === itemCount) return false
            else {
                // setSlideLeft(true);
                // setSlideRight(false);
                setCurrentItem(currentItem + 1);
            }
        } else {
            if (currentItem + 1 === 1) return false
            else {
                // setSlideRight(true);
                // setSlideLeft(false);
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
                    <Form.Control
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
                    <Form.Control
                        name="answer"
                        value={newItems[i - 1]?.answer}
                        onChange={(e) => handleForm(e, (i-1))}
                    />
                </Form.Group>
            </li>
        )
    }

    const statementInput = newItems[newItems.length - 1].statement.length;
    const answerInput = newItems[newItems.length - 1].answer.length;

    // console.log('slideRight', slideRight)
    // console.log('slideLeft', slideLeft)

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
                    {/* {
                        (((currentItem + 1) % 2 === 0) || slideLeft) &&
                        <ul className={slideLeft ? 'slide-left-in' : slideRight ? 'slide-right-out' : ''}>
                            even
                            { items[currentItem] }   
                        </ul>
                    }
                    {
                        (((currentItem + 1) % 2 !== 0) || slideRight) &&
                        <ul className={slideLeft ? 'slide-left-out' : slideRight ? 'slide-right-in' : ''}>
                            odd
                            { items[currentItem] }   
                        </ul>
                    } */}
                    <ul>
                        { items[currentItem] }   
                    </ul>
                    <div className="row item-btns">
                        <Button
                            className="col-md-6"
                            type='button'
                            variant="light"
                            onClick={handleAddMore}
                            disabled={!statementInput || !answerInput}
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