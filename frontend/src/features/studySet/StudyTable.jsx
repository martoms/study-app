import { Table, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import useReformatDate from '../../hooks/useReformatDate';
import { useState } from 'react';
import DeleteBtn from '../../components/buttons/deletebtn';
import { deleteSet } from '../../features/studySet/studySetSlice';
import { currentSet } from '../../features/generalState/generalStateSlice';
import RenameBtn from '../../components/buttons/RenameBtn';
import SortBtn from '../../components/buttons/SortBtn';
import AddItemCategory from '../../components/modals/AddItemCategory';

const StudyTable = () => {

    const studySet = useSelector(state => state.studySetList);
    const dispatch = useDispatch();
    const { dateMonthYearShort, toMMDDYY, minuteHour } = useReformatDate()

    const [selection, setSelection] = useState([]);
    const [addItem, setAddItem] = useState(false);
    const deleteItems = selection.length;

    const setNames = studySet.map(studySet => studySet.setName);
    const setItems = studySet.map(studySet => studySet.items);
    const dateCreated = studySet.map(studySet => dateMonthYearShort(studySet.createdOn));
    const shortDate = studySet.map(studySet => toMMDDYY(studySet.createdOn));
    const timeCreated = studySet.map(studySet => minuteHour(studySet.createdOn));

    const handleCheckbox = (e) => {

        const value = e.target.value;

        if (selection.includes(value)) {

            const updatedSelection = selection.filter(item => item !== value);
            setSelection(updatedSelection);

        } else {
            setSelection([...selection, value]);
        }
    };

    const handleMasterCheckbox = (e) => {
        const checkboxes = document.querySelectorAll('.setName-checkbox input');
        const allSelections = []

        if (e.target.checked == true) {

            checkboxes.forEach((checkbox) => {
                const value = checkbox.value;
                checkbox.checked = true;
                allSelections.push(value)
                setSelection(allSelections);
            });
        } else {
            checkboxes.forEach((checkbox) => {
                checkbox.checked = false;
                setSelection([]);
            });
        }
    }

    const handleDelete = () => {
        dispatch(deleteSet(selection));
        setSelection([]);
    };

    const handleShowAddItem = (setName) => {
        dispatch(currentSet(setName));
        setAddItem(true);
    };


    const studyData = setNames.map((setName, i) => {

        const targetItem = setName;

        return (
            <tr key={ setName } >
                <td className='setName'>
                    <span>
                        <Form.Check
                            className='setName-checkbox'
                            type="checkbox"
                            name="selection"
                            key={setName}
                            value={setName}
                            onChange={(e) => handleCheckbox(e)}
                        />
                    </span>
                    <span>
                        { setName }
                    </span>
                    {
                        deleteItems === 0 &&
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
                    <div style={{display: deleteItems > 0 && window.innerWidth <= 800 && 'none'}}>
                        <button
                            type='button'
                            className={`view ${setItems[i].length === 0 || deleteItems === 0 && 'toggle'}`}
                            style={{backgroundColor: (setItems[i].length === 0 && 'lightgrey') || (deleteItems > 0 && 'lightgrey')}}
                            disabled={setItems[i].length === 0}
                        >
                            view
                        </button>
                        <button
                            id={`${setName}-add-btn`}
                            type='button'
                            className={`add ${deleteItems === 0 && 'toggle'}`}
                            style={{backgroundColor: deleteItems > 0 && 'lightgrey'}}
                            disabled={deleteItems > 0}
                            onClick={() => handleShowAddItem(setName)}
                        >
                            add
                        </button>
                        <button
                            type='button'
                            className={`study ${setItems[i].length === 0 || deleteItems === 0 && 'toggle'}`}
                            style={{backgroundColor: (setItems[i].length === 0 && 'lightgrey') || (deleteItems > 0 && 'lightgrey')}}
                            disabled={(setItems[i].length === 0) || deleteItems > 0}
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
            deleteItems > 0 &&
            <DeleteBtn deleteItems={deleteItems} handleDelete={handleDelete} selection={selection} />
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
                                    deleteItems > 0 &&
                                    <Form.Check
                                        className='master-checkbox'
                                        type="checkbox"
                                        name="selection"
                                        onChange={(e) => handleMasterCheckbox(e)}
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

            <AddItemCategory
                addItem={addItem}
                setAddItem={setAddItem}
            />
        </div>
        </>
    );
}

export default StudyTable;