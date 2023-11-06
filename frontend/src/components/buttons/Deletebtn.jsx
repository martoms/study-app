/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import DeleteWarning from "../modals/DeleteWarning";
import { whatToDelete } from "../../features/generalState/generalStateSlice";

const DeleteBtn = ({deleteItem, handleDelete, selection, deleteCategory}) => {

    const [deleteWarning, setDeleteWarning] = useState(false);
    const dispatch = useDispatch();

    const handleShowDeleteWarning = () => {
        dispatch(whatToDelete(deleteCategory))
        setDeleteWarning(true);
    };
    const handleCloseDeleteWarning = () => setDeleteWarning(false);

    return ( 
        <>
        <div className='delete' onClick={handleShowDeleteWarning}>
            <p>{`Delete ${deleteItem > 1 ? `selections (${deleteItem})` : `selection (${deleteItem})`}` }</p>
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