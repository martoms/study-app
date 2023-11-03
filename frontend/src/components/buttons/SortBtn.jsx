/* eslint-disable react/prop-types */
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sortSet } from "../../features/studySet/studySetSlice";

const SortBtn = () => {

    const dispatch = useDispatch();

    return ( 
        <div className='sort-control'>
            <Form>
                <Form.Select onChange={(e) => dispatch(sortSet(e.target.value))}>
                    <option value="oldest">oldest</option>
                    <option value="latest">latest</option>
                    <option value="a-z">a-z</option>
                    <option value="z-a">z-a</option>
                    <option value="moreItems">{`< items`}</option>
                    <option value="lessItems">{`> items`}</option>
                </Form.Select>
            </Form>
        </div>
    );
}
 
export default SortBtn;