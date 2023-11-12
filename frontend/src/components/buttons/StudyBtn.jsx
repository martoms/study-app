import { useState } from 'react';
import study from '../../images/study.svg';
import InputSetName from '../../components/modals/InputSetName';

const StudyBtn = () => {

    const [createNewSet, setCreateNewSet] = useState(false);
    const handleShowCreateSet = () => setCreateNewSet(true);
    
    return ( 
        <>
        <button
            type="button"
            className="center-btn create-study-set"
            onClick={handleShowCreateSet}
        >
            <img src={study} alt="study items" /> Study
        </button>
        <InputSetName 
            createNewSet={createNewSet}
            setCreateNewSet={setCreateNewSet}
        />
        </>
    );
}
 
export default StudyBtn;