import study from '../../images/study.svg';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const StudyBtn = () => {

    const { timeStamp } = useParams();

    return ( 
        <Link to={`/${timeStamp}/study`}>
            <button
                type="button"
                className="center-btn study-btn"
            >
                <img src={study} alt="study items" /> Study
            </button>
        </Link>
    );
}
 
export default StudyBtn;