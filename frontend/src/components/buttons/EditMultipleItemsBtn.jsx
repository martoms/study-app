/* eslint-disable react/prop-types */
import { useState } from 'react';
import edit from '../../images/edit.svg'
import EditMultipleItems from '../modals/EditMultipleItems';



const EditMultipleItemsBtn = ({selection, setSelection}) => {

    const [editItems, setEditItems] = useState(false);

    const handleShowEditItems = () => {
        setEditItems(true);
    };

    return ( 
        <>
            <span className='edit-multiple-btn toggle' onClick={handleShowEditItems} >
                <img src={edit} alt="rename" title='rename' />
            </span>
            {
                editItems &&
                <EditMultipleItems
                    editItems={editItems}
                    setEditItems={setEditItems}
                    selection={selection}
                    setSelection={setSelection}
                />
            }
        </>
    );
}
 
export default EditMultipleItemsBtn;