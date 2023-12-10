import { useState, useEffect } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
// import { googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


const MobileNav = () => {

    const [email, setEmail] = useState(null);
    const [picture, setPicture] = useState('');

    const handleLogOut = () => {
        console.log('logout');
        localStorage.clear('googleAuth');
    }

    useEffect(() => {
        const googleCredential = JSON.parse(localStorage.getItem("googleAuth"));
        let credentialResponseDecoded;
        if (googleCredential) {
            credentialResponseDecoded = jwtDecode(googleCredential.credential);
        }
    
        const newEmail = credentialResponseDecoded?.email;
        const newPicture = credentialResponseDecoded?.picture;
    
        if (newEmail !== email) setEmail(newEmail);
        if (newPicture !== picture) setPicture(newPicture);
    
    }, [email, picture]);

    return ( 
        <Navbar id="navbar" className="navbar d-md-none fixed-top-transparent">
            
            <div>
                <Link to="/">
                    HOME
                </Link>
            </div>
            {
                email ?
                <div className="account" onClick={handleLogOut}>
                    <img src={picture} alt="profile image" />
                    { email }
                </div>
                :
                <div className="sign-in">
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            console.log(credentialResponse)
                            localStorage.setItem('googleAuth', JSON.stringify(credentialResponse));
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </div>
            }
        </Navbar>
    );
}


export default MobileNav;