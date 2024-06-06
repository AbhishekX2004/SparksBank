import React from "react";
import { Link } from 'react-router-dom';

function Landing(){
    return(
        <div>
            LANDING <br/>
            <Link to='/accounts/all'>View all Accounts</Link>

        </div>
    )
}

export default Landing;