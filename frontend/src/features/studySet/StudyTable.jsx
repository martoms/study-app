import { Table, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import useReformatDate from '../../hooks/useReformatDate';
import { useState } from 'react';
import DeleteBtn from '../../components/buttons/deletebtn';
import { deleteSet } from '../../features/studySet/studySetSlice';
import { currentSet } from '../../features/generalState/generalStateSlice';
import RenameBtn from '../../components/buttons/RenameBtn';
import SortBtn from '../../components/buttons/SortBtn';
import AddItemType from '../../components/modals/AddItemType';
import { handleCheckbox, handleMasterCheckbox } from '../../components/handlers/formHandlers';
import slugify from 'slugify';
import { useNavigate } from 'react-router-dom';

const StudyTable = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const studySet = useSelector(state => state.studySetList);
    const selectedSet = useSelector(state => state.generalState.currentSet);
    const slug = slugify(selectedSet).toLocaleLowerCase();
    const { dateMonthYearShort, toMMDDYY, minuteHour } = useReformatDate();

    const [selection, setSelection] = useState([]);
    const [addItem, setAddItem] = useState(false);
    const deleteItem = selection.length;

    const setNames = studySet.map(studySet => studySet.setName);
    const setItems = studySet.map(studySet => studySet.items);
    const dateCreated = studySet.map(studySet => dateMonthYearShort(studySet.createdOn));
    const shortDate = studySet.map(studySet => toMMDDYY(studySet.createdOn));
    const timeCreated = studySet.map(studySet => minuteHour(studySet.createdOn));

    const handleDelete = () => {
        dispatch(deleteSet(selection));
        setSelection([]);
    };

    const handleShowAddItem = (setName) => {
        dispatch(currentSet(setName));
        setAddItem(true);
    };

    const handleView = (setName) => {
        dispatch(currentSet(setName));
        navigate(`/${slug}`);
    };


    const studyData = setNames.map((setName, i) => {

        const targetItem = setName;

        return (
            <tr key={ setName } >
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
                            setNames={setNames}
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
                            onClick={() => handleView(setName)}
                        >
                            view
                        </button>
                        <button
                            id={`${setName}-add-btn`}
                            type='button'
                            className={`add ${deleteItem === 0 && 'toggle'}`}
                            style={{backgroundColor: deleteItem > 0 && 'lightgrey'}}
                            disabled={deleteItem > 0}
                            onClick={() => handleShowAddItem(setName)}
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
                slug={slug}
            />
        </div>
        </>
    );
}

export default StudyTable;