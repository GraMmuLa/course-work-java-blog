import React from 'react';
import classes from "./NotAuthenticated.module.css";
import {Link, NavLink, Route, Routes} from "react-router-dom";

const NotAuthenticated: React.FC = () => {
    return (
        <div className={classes.auth}>
            <Link to="/login" className="link">Log In</Link>
            <hr className={classes.auth__separator}/>
            <a href="#" className="link">Register</a>
        </div>
    );
};

export default NotAuthenticated;