/* eslint-disable react/prop-types */
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const StudySummary = ({items, score, elapsedTime}) => {

    const { timeStamp } = useParams();
    const navigate = useNavigate();

    const { hours, minutes, seconds } = elapsedTime;
    const percent = ((score / items) * 100).toFixed(1);
    
    const handleClose = () => {
        navigate(`/${timeStamp}`)
    };

    return ( 
        <div className="summary">
            <h1>Congratulations</h1>
            <h2>{`for completing today's study session!`}</h2>
            <div className={`result ${percent < 75 ? 'low' : percent < 90 ? 'mid' : 'high'}`}>
                <div className="percent">
                    <span>{percent}</span>
                    <span>%</span>
                </div>
                <div className="score">
                    <p>{ `${score}/${items}` }</p>
                    <p>items</p>
                </div>
            </div>
            <div className="elapsed-time">
                <p>finished in</p>
                <span className="days">{ hours !== 0 ? hours === 1 ? `${hours} hr, ` : `${hours} hrs, ` : ''}</span>
                <span className="minutes">{ minutes !== 0 ? minutes === 1 ? `${minutes} min and ` : `${minutes} mins and ` : ''}</span>
                <span className="seconds">{ seconds !== 0 ? seconds === 1 ? `${seconds} sec` : `${seconds} secs` : ''}</span>
            </div>
            <Button
                type="button"
                onClick={handleClose}
            >
            Close
            </Button>
        </div>
    );
}
 
export default StudySummary;