import { useState } from 'react';
import set from '../../images/set.svg';
import InputSetName from '../../components/modals/InputSetName';

const CreateSet = () => {

    const [createNewSet, setCreateNewSet] = useState(false);
    const handleCloseCreateSet = () => setCreateNewSet(false);
    const handleShowCreateSet = () => setCreateNewSet(true);
    
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
            createNewSet={createNewSet}
            handleCloseCreateSet={handleCloseCreateSet}
        />
        </>
    );
}
 
export default CreateSet;