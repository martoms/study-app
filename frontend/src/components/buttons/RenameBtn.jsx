/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import renameBtn from '../../images/edit.svg';
import InputRename from '../modals/InputRename';
import { renameSet } from '../../features/studySet/studySetSlice';
import { useLocation } from 'react-router-dom';

const RenameBtn = ({list, targetItem}) => {

    const [renameItem, setRenameItem] = useState(false);
    const [duplicate, setDuplicate] = useState(false);
    const [newName, setNewName] = useState('');

    const dispatch = useDispatch();
    const location = useLocation();
    const currentPath = location.pathname;

    const handleShowRenameItem = () => setRenameItem(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (list.includes(newName)) {
            setDuplicate(true);
        } else {
            const names = {
                targetItem,
                newName
            }
            if (currentPath === '/') {
                dispatch(renameSet(names));
            } 

            setNewName('');
            setRenameItem(false);
        }
    };

    return ( 
        <>
        <span className='edit-btn' onClick={handleShowRenameItem}>
            <img src={renameBtn} alt="rename" title='rename' />
        </span>
        <InputRename
            renameItem={renameItem}
            setRenameItem={setRenameItem}
            targetItem={targetItem}
            newName={newName}
            duplicate={duplicate}
            setDuplicate={setDuplicate}
            setNewName={setNewName}
            handleSubmit={handleSubmit}
        />
        </>
    );
}
 
export default RenameBtn;