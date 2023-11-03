import { Table, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import useReformatDate from '../../hooks/useReformatDate';
import { useState } from 'react';
import DeleteBtn from '../../components/buttons/deletebtn';
import { deleteSet } from '../../features/studySet/studySetSlice';
import RenameBtn from '../../components/buttons/RenameBtn';
import SortBtn from '../../components/buttons/SortBtn';

const StudyTable = () => {

    const studySet = useSelector(state => state.studySetList);
    const dispatch = useDispatch();
    const { dateMonthYearShort, toMMDDYY, minuteHour } = useReformatDate()

    const [selection, setSelection] = useState([]);
    const [sortOrder, setSortOrder] = useState(studySet);
    const deleteItems = selection.length;

    const handleSort = (order) => {
        let sortedStudySet;

        if (order === 'latest') {
            sortedStudySet = studySet.slice().sort((a, b) => b.createdOn - a.createdOn);
            setSortOrder(sortedStudySet);
        } else if (order === 'oldest') {
            sortedStudySet = studySet.slice().sort((a, b) => a.createdOn - b.createdOn);
            setSortOrder(sortedStudySet);
        } else if (order === 'a-z') {
            sortedStudySet = studySet.slice().sort((a, b) => a.setName.localeCompare(b.setName));
            setSortOrder(sortedStudySet);
        } else if (order === 'z-a') {
            sortedStudySet = studySet.slice().sort((a, b) => b.setName.localeCompare(a.setName));
            setSortOrder(sortedStudySet);
        } else if (order === 'moreItems') {
            sortedStudySet = studySet.slice().sort((a, b) => b.items.length - a.items.length);
            setSortOrder(sortedStudySet);
        } else if (order === 'lessItems') {
            sortedStudySet = studySet.slice().sort((a, b) => a.items.length - b.items.length);
            setSortOrder(sortedStudySet);
        }
    }

    const setNames = sortOrder.map(studySet => studySet.setName);
    const setItems = sortOrder.map(studySet => studySet.items);
    const dateCreated = sortOrder.map(studySet => dateMonthYearShort(studySet.createdOn));
    const shortDate = sortOrder.map(studySet => toMMDDYY(studySet.createdOn));
    const timeCreated = sortOrder.map(studySet => minuteHour(studySet.createdOn));

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


    const studyData = setNames.map((setName, i) => {

        const targetItem = setName;

        return (
            <tr key={ setName }>
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
                        setItems[i].length === 0 ?
                        '0'
                        :
                        setItems[i]
                    }
                    </span>
                    <div style={{display: deleteItems > 0 && window.innerWidth <= 800 && 'none'}}>
                        <button
                            type='button'
                            className='view'
                            style={{backgroundColor: (setItems[i].length === 0 && 'lightgrey') || (deleteItems > 0 && 'lightgrey')}}
                            disabled={setItems[i].length === 0}
                        >
                            view
                        </button>
                        <button
                            type='button'
                            className='add'
                            style={{backgroundColor: deleteItems > 0 && 'lightgrey'}}
                            disabled={deleteItems > 0}
                        >
                            add
                        </button>
                        <button
                            type='button'
                            className='study'
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
            <SortBtn handleSort={handleSort} />
            
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
        </div>
        </>
    );
}

export default StudyTable;