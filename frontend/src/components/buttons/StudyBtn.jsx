import study from '../../images/study.svg';

const StudyBtn = () => {

    // const handleShowCreateSet = () => setCreateNewSet(true);
    
    return ( 
        <button
            type="button"
            className="center-btn create-study-set"
            // onClick={handleShowCreateSet}
        >
            <img src={study} alt="study items" /> Study
        </button>
    );
}
 
export default StudyBtn;