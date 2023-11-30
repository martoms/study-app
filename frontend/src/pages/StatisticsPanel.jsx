import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const StatisticsPanel = () => {

    const { timeStamp } = useParams();
    const setName = useSelector(state => state.studySetList).filter(set => set.createdOn === Number(timeStamp))[0].setName;
    const studyData = useSelector(state => state.studySetList).filter(set => set.createdOn === Number(timeStamp))[0].studyData;

    console.log(studyData)


    return ( 
        <div className="main-container">
            <h1 className="setName">{ setName }</h1><hr />
        </div>
    );
}
 
export default StatisticsPanel;