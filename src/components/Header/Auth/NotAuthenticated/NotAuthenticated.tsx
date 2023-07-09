import React from 'react';
import classes from "./NotAuthenticated.module.css";
import {Link, NavLink, Route, Routes} from "react-router-dom";

const NotAuthenticated: React.FC = () => {
    return (
        <div className={classes.auth}>
            <Link to="/login" className="link">Log In</Link>
            <hr className={classes.auth__separator}/>
            <Link to="/register" className="link">Register</Link>
        </div>
    );
};

export default NotAuthenticated;