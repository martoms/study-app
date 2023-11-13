import { Table, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import useReformatDate from '../../hooks/useReformatDate';
import { useState } from 'react';
import DeleteBtn from '../../components/buttons/deletebtn';
import { deleteSet } from '../../features/studySet/studySetSlice';
// import { currentSet } from '../../features/generalState/generalStateSlice';
import RenameBtn from '../../components/buttons/RenameBtn';
import SortBtn from '../../components/buttons/SortBtn';
import AddItemType from '../../components/modals/AddItemType';
import { handleCheckbox, handleMasterCheckbox } from '../../handlers/formHandlers';
import { useNavigate } from 'react-router-dom';

const StudyTable = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const studySet = useSelector(state => state.studySetList);
    const { dateMonthYearShort, toMMDDYY, minuteHour } = useReformatDate();

    const [selection, setSelection] = useState([]);
    const [currentSet, setCurrentSet] = useState('');
    const [addItem, setAddItem] = useState(false);
    const deleteItem = selection.length;

    const setNames = studySet.map(studySet => studySet.setName);
    const setItems = studySet.map(studySet => studySet.items);
    const createdOn = studySet.map(studySet => studySet.createdOn);
    const dateCreated = studySet.map(studySet => dateMonthYearShort(studySet.createdOn));
    const shortDate = studySet.map(studySet => toMMDDYY(studySet.createdOn));
    const timeCreated = studySet.map(studySet => minuteHour(studySet.createdOn));

    const handleDelete = () => {
        dispatch(deleteSet(selection));
        setSelection([]);
    };

    const handleShowAddItem = (createdOn) => {
        setCurrentSet(createdOn);
        setAddItem(true);
    };

    const handleView = (createdOn) => {
        setCurrentSet(createdOn);
        navigate(`/${createdOn}`);
    };


    const studyData = setNames.map((setName, i) => {

        const targetItem = setName;

        return (
            <tr key={ createdOn[i] } >
                <td className='setName checkbox-td'>
                    <span className='delete-checkbox'>
                        <Form.Check
                            type="checkbox"
                            name="selection"
                            value={setName}
                            onChange={(e) => handleCheckbox(e, selection, setSelection)}
                        />
                    </span>
                    <span>
                        { setName }
                    </span>
                    {
                        deleteItem === 0 &&
                        <RenameBtn
                            list={setNames}
                            targetItem={targetItem}
                        />
                    }
                    
                </td>
                <td className='createdOn'>
                    <p className='lg'>{ dateCreated[i] }</p>
                    <p className='sm'>{ shortDate[i] }</p>
                    <p>{ timeCreated[i] }</p>
                </td>
                <td className='items'>
                    <span>
                    {
                        setItems[i].length == 0 ?
                        '0'
                        :
                        setItems[i].length
                    }
                    </span>
                    <div style={{display: deleteItem > 0 && window.innerWidth <= 800 && 'none'}}>
                        <button
                            type='button'
                            className={`view ${setItems[i].length === 0 || deleteItem === 0 && 'toggle'}`}
                            style={{backgroundColor: (setItems[i].length === 0 && 'lightgrey') || (deleteItem > 0 && 'lightgrey')}}
                            disabled={setItems[i].length === 0}
                            onClick={() => handleView(createdOn[i])}
                        >
                            view
                        </button>
                        <button
                            id={`${setName}-add-btn`}
                            type='button'
                            className={`add ${deleteItem === 0 && 'toggle'}`}
                            style={{backgroundColor: deleteItem > 0 && 'lightgrey'}}
                            disabled={deleteItem > 0}
                            onClick={() => handleShowAddItem(createdOn[i])}
                        >
                            add
                        </button>
                        <button
                            type='button'
                            className={`study ${setItems[i].length === 0 || deleteItem === 0 && 'toggle'}`}
                            style={{backgroundColor: (setItems[i].length === 0 && 'lightgrey') || (deleteItem > 0 && 'lightgrey')}}
                            disabled={(setItems[i].length === 0) || deleteItem > 0}
                        >
                            study
                        </button>
                    </div>
                </td>
            </tr>
        )
    });

    return (
        <>
        <div className='study-table'>
        {
            deleteItem > 0 &&
            <DeleteBtn deleteItem={deleteItem} handleDelete={handleDelete} selection={selection} deleteCategory={'setName'} />
        }
            <SortBtn />
            
            <div className='study-table-container'>
                <Table
                    striped
                    hover
                >
                    <thead>
                        <tr>
                            <th className='setName'>
                                {
                                    deleteItem > 0 &&
                                    <Form.Check
                                        className='master-checkbox'
                                        type="checkbox"
                                        name="selection"
                                        onChange={(e) => handleMasterCheckbox(e, setSelection)}
                                    />
                                }
                                Study Set
                            </th>
                            <th>Created On</th>
                            <th>Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        { studyData }
                    </tbody>
                </Table>
            </div>

            <AddItemType
                addItem={addItem}
                setAddItem={setAddItem}
                currentSet={currentSet}
            />
        </div>
        </>
    );
}

export default StudyTable;