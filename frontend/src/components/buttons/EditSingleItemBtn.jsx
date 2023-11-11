/* eslint-disable react/prop-types */
import { useState } from 'react';
import edit from '../../images/edit.svg'
import EditItems from '../modals/EditItems';



const EditSingleItemBtn = ({createdOn, itemType, itemNo}) => {

    const [editItems, setEditItems] = useState(false);
    const [item, setItem] = useState('');

    const handleShowEditItems = () => {
        setEditItems(true);
        setItem(createdOn);
    };

    return ( 
        <>
            <span className='edit-btn toggle' onClick={handleShowEditItems} >
                <img src={edit} alt="rename" title='rename' />
            </span>
            <EditItems
                editItems={editItems}
                setEditItems={setEditItems}
                itemNo={itemNo}
                item={item}
                itemType={itemType}
            />
        </>
    );
}
 
export default EditSingleItemBtn;