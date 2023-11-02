import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MobileNav = () => {
    return ( 
        <Navbar id="navbar" className="navbar d-md-none fixed-top-transparent">
            
            <div>
                <Link to="/">
                    HOME
                </Link>
            </div>
        </Navbar>
    );
}


export default MobileNav;