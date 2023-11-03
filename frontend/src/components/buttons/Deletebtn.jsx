/* eslint-disable react/prop-types */
import { useState } from "react";
import DeleteWarning from "../modals/DeleteWarning";

const DeleteBtn = ({deleteItems, handleDelete, selection}) => {

    const [deleteWarning, setDeleteWarning] = useState(false);

    const handleShowDeleteWarning = () => setDeleteWarning(true);
    const handleCloseDeleteWarning = () => setDeleteWarning(false);

    return ( 
        <>
        <div className='delete' onClick={handleShowDeleteWarning}>
            <p>{`Delete ${deleteItems > 1 ? `selections (${deleteItems})` : `selection (${deleteItems})`}` }</p>
        </div>
        <DeleteWarning
            deleteWarning={deleteWarning}
            handleCloseDeleteWarning={handleCloseDeleteWarning}
            handleDelete={handleDelete}
            selection={selection}
        />
        </>

    );
}
 
export default DeleteBtn;