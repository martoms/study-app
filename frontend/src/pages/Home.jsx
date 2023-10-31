import CreateSet from "../features/studySet/CreateStudySet";
import { useSelector } from "react-redux";

const Home = () => {

    const newSet = useSelector(state => state.studySetList.list);
    
    return ( 
        <div className="main-container">
            {
                newSet.length == 0 ?
                <div className="initial-setup d-flex">
                    <CreateSet />
                </div>
                :
                <div className="">

                </div>
            }
            
        </div>
    );
}
 
export default Home;