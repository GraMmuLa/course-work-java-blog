import React from 'react';
import classes from "./NotAuthenticated.module.css";

const NotAuthenticated: React.FC = () => {
    return (
        <div className={classes.auth}>
            <a href="#" className="link">Log In</a>
            <hr className={classes.auth__separator}/>
            <a href="#" className="link">Register</a>
        </div>
    );
};

export default NotAuthenticated;