import { Link } from "react-router-dom";
import github from '../images/f-github.svg';
import linkedin from '../images/f-linkedin.svg';
import portfolio from '../images/mylogo.svg';
import upwork from '../images/f-upwork.svg';
import phone from '../images/f-phone.svg';
import email from '../images/f-email.svg';

const Footer = () => {
    return ( 
        <>
        <div className="row prefooter">
            <div className="col-12 col-md-6">
                <div className="row">
                    <div className="col-12 links">
                        <h4>Links</h4>
                        <Link to="https://github.com/martoms" target="_blank"><p><img src={github} alt="github" />GitHub</p></Link>
                        <Link to="https://www.linkedin.com/in/m-tomatao/" target="_blank"><p><img src={linkedin} alt="linkedin" />LinkedIn</p></Link>
                        <Link to="https://martoms.github.io/webportfolio/" target="_blank"><p><img src={portfolio} alt="mylogo" />Portfolio</p></Link>
                        <Link to="https://www.upwork.com/freelancers/~010e1495f770d6ef34" target="_blank"><p><img src={upwork} alt="upwork" />Upwork</p></Link>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-6">
                <div className="row">
                    <div className="col-12 contacts">
                        <h4>Contacts</h4>
                        <p><img src={phone} alt="phone" />+639991130968</p>
                        <p><img src={email} alt="phone" />tomataomarjohn@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>

        <footer>
            <p>Study App</p>
            <p>Marjohn Tomatao | Full Stack Web Developer | MERN Stack</p>
            <p>Copyright &copy; 2023. All Rights Reserved</p>
            <hr />
        </footer>
        </>
    );
}
 
export default Footer;