import { Table } from 'react-bootstrap';
import { useSelector } from "react-redux";
import useReformatDate from '../../hooks/useReformatDate';

const StudyTable = () => {

    const studySet = useSelector(state => state.studySetList);
    const { dateMonthYear, minuteHour } = useReformatDate()

    const setNames = studySet.map(studySet => studySet.setName);
    const setItems = studySet.map(studySet => studySet.items);
    const dateCreated = studySet.map(studySet => dateMonthYear(studySet.createdOn));
    const timeCreated = studySet.map(studySet => minuteHour(studySet.createdOn));
    
    const studyData = setNames.map((setName, i) => {
        return (
            <tr key={ setName }>
                <td>{ setName }</td>
                <td>
                    <p>{ dateCreated[i] }</p>
                    <p>{ timeCreated[i] }</p>
                </td>
                <td>
                    <span>
                    {
                        setItems[i].length == 0 ?
                        '0'
                        :
                        setItems[i]
                    }
                    </span>
                    <button type='button'>
                        view
                    </button>
                    <button type='button'>
                        add
                    </button>
                    <button type='button'>
                        study
                    </button>
                </td>
            </tr>
        )
    });

    return (
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>Study Set</th>
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