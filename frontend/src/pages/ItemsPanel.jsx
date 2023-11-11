import { useState } from "react";
import { Table, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import AddItems from "../components/modals/AddItems";
import { handleCheckbox, handleMasterCheckbox } from '../components/handlers/formHandlers';
import DeleteBtn from "../components/buttons/deletebtn";
import { useDispatch } from "react-redux";
import { deleteItems } from "../features/studySet/studySetSlice";
import { useParams } from "react-router-dom";
import AddItemsBtn from "../components/buttons/AddItemsBtn";
import AddItemType from "../components/modals/AddItemType";

const ItemsPanel = () => {

    const dispatch = useDispatch();
    const { timeStamp } = useParams();
    const addItems = useSelector(state => state.generalState.addItems)
    const itemsData = useSelector(state => state.studySetList).filter(set => set.createdOn === Number(timeStamp))[0].items;

    const [addItem, setAddItem] = useState(false);
    const [selection, setSelection] = useState([]);
    const deleteItem = selection.length;

    const handleDelete = () => {
        const payload = {
            selection,
            timeStamp
        }
        dispatch(deleteItems(payload));
        setSelection([]);
    };

    const itemsList = itemsData.map((item, i) => {
        const {
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
                    { `"${statement}"` }
                </td>
                <td className="item-type">
                    { itemType }
                </td>
            </tr>
        )
    })

    return ( 
        <div className="main-container">
            <div className="items-table">
                {
                    deleteItem > 0 &&
                    <DeleteBtn
                        deleteItem={deleteItem}
                        handleDelete={handleDelete}
                        selection={selection}
                        deleteCategory={'items'}
                        />
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