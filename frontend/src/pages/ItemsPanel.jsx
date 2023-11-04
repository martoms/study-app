import { useSelector } from "react-redux";
import AddItems from "../components/modals/AddItems";

const ItemsPanel = () => {

    const addItems = useSelector(state => state.generalState.addItems);

    // console.log('add items', addItems);

    return ( 
        <div className="main-container">
        <AddItems />
        </div>
    );
}
 
export default ItemsPanel;