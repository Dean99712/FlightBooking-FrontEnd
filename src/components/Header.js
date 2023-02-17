import React from 'react';
import "../styles/Header.scss"
import {Navbar} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";

const Header = () => {

    const navigate = useNavigate()

    const location = useLocation()

    const scroll = () => {
        if (window.scrollY >= 100) {
        }
    }

    const hideHeader = () => {
        console.log("True");

    }
    // switch (window.location.pathname) {
    //     case '/booking/flights':
    //         return console.log(true);
    //     case '/':
    //         return console.log("HomePage");
    //     case '/login':
    //         return true;
    //     case '/fare_options':
    //         return true
    //     case '/passengers':
    //         hideHeader()
    //     default:
    //         console.log(false)
    // }



    window.addEventListener("scroll", scroll)

    const goToLoginPage = () => {
        return navigate('/login')
    }
    return (
        <div>
            <Navbar className="header-container">
                <div className="log-in-button">
                    <button className="btn-login" onClick={() => goToLoginPage()}>Log in</button>
                </div>
                {/**/}
                <div className="header-middle-titles">
                    <span><button className="header-middle-title left">Book a Flight</button></span>
                    <span><button className="header-middle-title middle">Get Ready</button></span>
                    <span><button className="header-middle-title right">Service & Information</button></span>
                </div>
                <div>
                    <Link to={"/"}>
                        <img src={require('./../assets/images/istockphoto-1137971264-612x612.jpg')} className="logo"
                             alt="some text"/>
                    </Link>
                </div>
            </Navbar>
        </div>
    );
};

export default Header;
