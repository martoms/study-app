import { useState } from "react";
import { Table, Form } from "react-bootstrap";
import AddItems from "../components/modals/AddItems";
import { handleCheckbox, handleMasterCheckbox } from '../handlers/formHandlers';
import DeleteBtn from "../components/buttons/deletebtn";
import { useDispatch, useSelector } from "react-redux";
import { deleteItems } from "../features/studySet/studySetSlice";
import { useParams, useNavigate } from "react-router-dom";
import AddItemsBtn from "../components/buttons/AddItemsBtn";
import AddItemType from "../components/modals/AddItemType";
import EditSingleItemBtn from "../components/buttons/EditSingleItemBtn";
import EditMultipleItemsBtn from "../components/buttons/EditMultipleItemsBtn";
import StudyBtn from "../components/buttons/StudyBtn";
import { studyMode } from "../features/generalState/generalStateSlice";
import StatBtn from "../components/buttons/StatBtn";

const ItemsPanel = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { timeStamp } = useParams();
    const addItems = useSelector(state => state.generalState.addItems)
    const setName = useSelector(state => state.studySetList).filter(set => set.createdOn === Number(timeStamp))[0].setName;
    const itemsData = useSelector(state => state.studySetList).filter(set => set.createdOn === Number(timeStamp))[0].items;

    const [addItem, setAddItem] = useState(false);
    const [selection, setSelection] = useState([]);
    const deleteItem = selection.length;

    const currentStudyMode = useSelector(state => state.generalState.studyModes)?.filter(set => set.timeStamp === timeStamp)[0]?.mode;

    const handleDelete = () => {
        const payload = {
            selection,
            timeStamp
        }
        dispatch(deleteItems(payload));
        setSelection([]);

        if (itemsData.length === selection.length) {
            navigate('/');
        }
    };

    const handleStudyMode = (e) => {
        const mode = e.target.value;
        const study = {
            timeStamp,
            mode
        };
        dispatch(studyMode(study));
    };

    const itemsList = itemsData.map((item, i) => {
        // console.log(item)
        let {
            createdOn,
            itemType,
            statement,
        } = item

        return (
            <tr key={ createdOn }>
                <td className="item-no checkbox-td">
                    <span className='delete-checkbox'>
                        <Form.Check
                            type="checkbox"
                            name="selection"
                            value={ createdOn }
                            onChange={(e) => handleCheckbox(e, selection, setSelection)}
                        />
                    </span>
                    <span>
                        { i + 1 }
                    </span>
                </td>
                <td className="item-preview">
                    { 
                        itemType === 'Fill in the Blanks' ?
                        `"${statement.replaceAll('BLANK', '______')}"`
                        :
                        `"${statement}"`
                    }
                    {
                        deleteItem === 0 &&
                        <EditSingleItemBtn
                            createdOn={createdOn}
                            itemType={itemType}
                            itemNo={i + 1}
                        />
                    }
                    
                </td>
                <td className="item-type">
                    { itemType }
                </td>
            </tr>
        )
    })

    return ( 
        <div className="main-container">
            <h1 className="setName">{ setName }</h1><hr />
            <div className="items-table">
                {
                    deleteItem < 1 &&
                    <div className="study-mode">
                        <Form>
                            <Form.Group>
                                <Form.Label>Study Mode:</Form.Label>
                                <Form.Select value={currentStudyMode} onChange={handleStudyMode}>
                                    <option value="ordered">ordered</option>
                                    <option value="reversed">reversed</option>
                                    <option value="random">random</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </div>
                }
                {
                    deleteItem > 0 &&
                    <>
                    <DeleteBtn
                        deleteItem={deleteItem}
                        handleDelete={handleDelete}
                        selection={selection}
                        deleteCategory={'items'}
                    />
                    <EditMultipleItemsBtn
                        selection={selection}
                        setSelection={setSelection}
                    />
                    </>
                }
                {
                    deleteItem === 0 && 
                    <StatBtn />
                }
                <div className="items-table-container">
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th colSpan={2}>
                                    {
                                        deleteItem > 0 &&
                                        <Form.Check
                                            className='master-checkbox'
                                            type="checkbox"
                                            name="selection"
                                            onChange={(e) => handleMasterCheckbox(e, setSelection)}
                                        />
                                    }
                                    {
                                        !deleteItem &&
                                        <AddItemsBtn
                                            setAddItem={setAddItem}
                                        />
                                    }
                                    Items
                                </th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            { itemsList }
                        </tbody>
                    </Table>
                </div>
            </div>
            <div className="items-panel-study">
                <StudyBtn />
            </div>
            <AddItemType
                addItem={addItem}
                setAddItem={setAddItem}
                currentSet={timeStamp}
            />
            <AddItems addItems={addItems} />
        </div>
    );
}
 
export default ItemsPanel;