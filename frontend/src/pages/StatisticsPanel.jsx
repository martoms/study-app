import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const StatisticsPanel = () => {

    const { timeStamp } = useParams();
    const statData = useSelector(state => state.studySetList).filter(set => set.createdOn === Number(timeStamp))[0];

    console.log(statData);

    return ( 
        <div className="main-container">

        </div>
    );
}
 
export default StatisticsPanel;