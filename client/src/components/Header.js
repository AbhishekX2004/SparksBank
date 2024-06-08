import React from "react";
import {Link} from 'react-router-dom';
import "./Header.css"; // Make sure to import the CSS file

function Header(){
    return(
        <nav className="header">
            <Link to='/'>
                <img 
                    src="../SparksBankLogo_Transparent.png" 
                    alt="Sparks Bank Logo" 
                    className="logo logo-large" 
                />
                <img 
                    src="../SparksBankLogo2_Transparent.png" 
                    alt="Sparks Bank Logo" 
                    className="logo logo-small" 
                />
            </Link>
        </nav>
    )
}

export default Header;
