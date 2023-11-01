import { Table } from 'react-bootstrap';
import { useSelector } from "react-redux";
import useReformatDate from '../../hooks/useReformatDate';

const StudyTable = () => {

    const studySet = useSelector(state => state.studySetList);
    const { dateMonthYearShort, minuteHour } = useReformatDate()

    const setNames = studySet.map(studySet => studySet.setName);
    const setItems = studySet.map(studySet => studySet.items);
    const dateCreated = studySet.map(studySet => dateMonthYearShort(studySet.createdOn));
    const timeCreated = studySet.map(studySet => minuteHour(studySet.createdOn));
    
    const studyData = setNames.map((setName, i) => {
        return (
            <tr key={ setName }>
                <td className='setName'>{ setName }</td>
                <td className='createdOn'>
                    <p>{ dateCreated[i] }</p>
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
                    <div>
                        <button
                            type='button'
                            className='view'
                            style={{backgroundColor: setItems[i].length === 0 && 'lightgrey'}}
                            disabled={setItems[i].length === 0}
                        >
                            view
                        </button>
                        <button
                            type='button'
                            className='add'
                        >
                            add
                        </button>
                        <button
                            type='button'
                            className='study'
                            style={{backgroundColor: setItems[i].length === 0 && 'lightgrey'}}
                            disabled={setItems[i].length === 0}
                        >
                            study
                        </button>
                    </div>
                </td>
            </tr>
        )
    });

    return (
        <Table
            className='study-table'
            striped
            hover
        >
            <thead>
                <tr>
                    <th className='setName'>Study Set</th>
                    <th>Created On</th>
                    <th>Items</th>
                </tr>
            </thead>
            <tbody>
                { studyData }
            </tbody>
        </Table>
    );
}

export default StudyTable;