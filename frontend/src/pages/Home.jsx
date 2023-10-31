import set from '../images/set.svg';

const Home = () => {
    return ( 
        <div className="main-container">
            <div className="initial-setup">
                <div className="d-flex">
                    <button type="button" className="center-btn create-study-set">
                        <img src={set} alt="create set" /> Create Study Set
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default Home;