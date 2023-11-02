import CreateSet from "../features/studySet/CreateStudySet";
import { useSelector } from "react-redux";
import StudyTable from "../features/studySet/StudyTable";

const Home = () => {

    const newSet = useSelector(state => state.studySetList);
    
    return ( 
        <div className="main-container">
            {
                newSet.length == 0 ?
                <div className="initial-setup d-flex">
                    <CreateSet />
                </div>
                :
                <div className="main-panel">
                    <StudyTable />
                    <div className="addNewSet">
                        <CreateSet />
                    </div>
                </div>
            }
            
        </div>
    );
}
 
export default Home;