/* eslint-disable react/prop-types */
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editMultipleIdentificationItem } from '../../features/studySet/studySetSlice';
import next from '../../images/next.svg';
import previous from '../../images/previous.svg';

const EditMultipleFillInTheBlanks = ({
    updatedItems,
    setUpdatedItems,
    currentSet,
    studySetItems,
    selection,
    setSelection,
    currentItem,
    setCurrentItem,
    setEditItems
}) => {

    const dispatch = useDispatch();
    const currentItemData = studySetItems.filter(item => item.createdOn === Number(selection[currentItem]))[0];
    const itemNo = studySetItems.indexOf(currentItemData) + 1
    const currentSetName = useSelector(state => state.studySetList).filter(set => set.createdOn === Number(currentSet))[0].setName;
    const blankItems = updatedItems[currentItem]?.blanks;

    const handleForm = (e, i, j) => {
        const { name, value, type, checked } = e.target;
        const payload = [...updatedItems];
        
        if (type === 'checkbox') {
            payload[i] = {
                ...payload[i],
                [name]: checked,
            };
        } else if (type === 'textarea') {
            const matchedBlanks = (value.match(/BLANK/g) || []).length;

            payload[i] = {
                ...payload[i],
                [name]: value,
                blanks: Array.from({ length: matchedBlanks }, (_, index) => {
                    return payload[i]?.blanks?.[index] || '';
                }),
            };
        } else if (type === 'text') {
            payload[i] = {
                ...payload[i],
                blanks: payload[i].blanks.map((blank, index) => {
                    if (index === j) { 
                        return value;
                    }
                    return blank;
                }),
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
                    <p className="input-info">{ `Write as many "BLANK" to create blank item(s).` }</p>
                    <Form.Control
                        name="statement"
                        value={updatedItems[currentItem]?.statement}
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
                        checked={updatedItems[currentItem]?.caseSensitive}
                    />
                    <p className="input-info">{ `Use a comma (",") to separate alternative answers.` }</p>
                    {
                        updatedItems[currentItem]?.blanks.length ?
                        <div className="multiple-answers">
                            {blankItems.map((blank, j) => (
                                <div className="blank-input" key={j}>
                                    <span>{j + 1}</span>
                                    <Form.Control
                                        name={`answer-${j}`}
                                        value={blank}
                                        onChange={(e) => handleForm(e, i, j)}
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

    const statementInput = updatedItems[currentItem]?.statement.length;
    const answerInput = updatedItems[currentItem]?.blanks.every((blank) => blank.length > 0);


    return ( 
        <div className="edit-items-container">
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
                    <ul className="fill-in-the-blanks">
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
 
export default EditMultipleFillInTheBlanks;