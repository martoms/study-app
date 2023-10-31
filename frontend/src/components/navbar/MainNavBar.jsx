import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MainNavbar = () => {

    return ( 
        <Navbar className="navbar d-none d-md-flex px-5 navbar-expand-md">
            <Link to="/">
                HOME
            </Link>
        </Navbar>
    );
}
 
export default MainNavbar;