/* eslint-disable react/prop-types */
import add from '../../images/add.svg';

const AddItemsBtn = ({setAddItem}) => {

    return ( 
        <>
        <button
            type="button"
            className="add-items"
            onClick={() => setAddItem(true)}
        >
            <img src={add} alt="add items" />
        </button>
        </>
    );
}
 
export default AddItemsBtn;