import { useState } from 'react';
import set from '../images/set.svg';
import CreateSet from '../components/modals/CreateSet';

const Home = () => {
  const [createSet, setCreateSet] = useState(false);
  const handleCloseCreateSet = () => setCreateSet(false);
  const handleShowCreateSet = () => setCreateSet(true);

    return ( 
        <div className="main-container">
            <div className="initial-setup d-flex">
                <button
                    type="button"
                    className="center-btn create-study-set"
                    onClick={handleShowCreateSet}
                >
                    <img src={set} alt="create set" /> Create Study Set
                </button>
                <CreateSet 
                    createSet={createSet}
                    handleCloseCreateSet={handleCloseCreateSet}
                />
            </div>
        </div>
    );
}
 
export default Home;