/* eslint-disable react/prop-types */

const DeleteBtn = ({deleteItems}) => {
    return ( 
        <div className='delete'>
            <p>{`Delete ${deleteItems > 1 ? `selections (${deleteItems})` : `selection (${deleteItems})`}` }</p>
        </div>
    );
}
 
export default DeleteBtn;