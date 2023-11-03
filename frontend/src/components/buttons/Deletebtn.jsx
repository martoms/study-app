/* eslint-disable react/prop-types */

const DeleteBtn = ({deleteItems, handleDelete}) => {
    return ( 
        <div className='delete' onClick={() => handleDelete()}>
            <p>{`Delete ${deleteItems > 1 ? `selections (${deleteItems})` : `selection (${deleteItems})`}` }</p>
        </div>
    );
}
 
export default DeleteBtn;