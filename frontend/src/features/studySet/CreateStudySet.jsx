import { useState } from 'react';
import set from '../../images/set.svg';
import InputSetName from '../../components/modals/InputSetName';

const CreateSet = () => {

    const [createSet, setCreateSet] = useState(false);
    const handleCloseCreateSet = () => setCreateSet(false);
    const handleShowCreateSet = () => setCreateSet(true);
    
    return ( 
        <>
        <button
            type="button"
            className="center-btn create-study-set"
            onClick={handleShowCreateSet}
        >
            <img src={set} alt="create set" /> Create Study Set
        </button>
        <InputSetName 
            createSet={createSet}
            handleCloseCreateSet={handleCloseCreateSet}
        />
        </>
    );
}
 
export default CreateSet;