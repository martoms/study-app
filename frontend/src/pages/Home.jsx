import CreateSet from "../features/studySet/CreateStudySet";
import { useSelector } from "react-redux";

const Home = () => {

    const newSet = useSelector(state => state.studySetList.list);
    
    if (newSet.length !== 0) {
        console.log(newSet[newSet.length - 1]);
    }

    return ( 
        <div className="main-container">
            <div className="initial-setup d-flex">
                <CreateSet />
            </div>
        </div>
    );
}
 
export default Home;