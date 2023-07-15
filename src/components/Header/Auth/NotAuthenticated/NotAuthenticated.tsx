import React from 'react';
import classes from "./NotAuthenticated.module.css";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

const NotAuthenticated: React.FC = () => {
    return (
        <div className={classes.auth}>
            <Button variant="link"><Link to="/login">Log In</Link></Button>
            <hr className={classes.auth__separator}/>
            <Button variant="link"><Link to="/register">Register</Link></Button>
        </div>
    );
};

export default NotAuthenticated;