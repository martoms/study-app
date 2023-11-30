import stat from '../../images/stat.svg';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const StatBtn = () => {

    const { timeStamp } = useParams();

    return ( 
        <Link className='stat-button' to={`/${timeStamp}/statistics`}>
            <img src={stat} alt="statistics" />
        </Link>
    );
}
 
export default StatBtn;