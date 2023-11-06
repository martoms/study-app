
export const handleCheckbox = (e, selection, setSelection) => {

    const value = e.target.value;

    if (selection.includes(value)) {

        const updatedSelection = selection.filter(item => item !== value);
        setSelection(updatedSelection);

    } else {
        setSelection([...selection, value]);
    }
};

export const handleMasterCheckbox = (e, setSelection) => {

    const checkboxes = document.querySelectorAll('.delete-checkbox input');
        
    const allSelections = []

    if (e.target.checked == true) {

        checkboxes.forEach((checkbox) => {
            const value = checkbox.value;
            checkbox.checked = true;
            allSelections.push(value)
            setSelection(allSelections);
        });
    } else {
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
            setSelection([]);
        });
    }
}

export default null