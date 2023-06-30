import React from 'react';
import classes from "./Authenticated.module.css";

const Authenticated: React.FC = () => {
    return (
        <div className={classes.authenticated}>
            <a href="#" className={classes.authenticated__link}>
                <img className={classes.authenticated__img} src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="Bad img"/>
            </a>
        </div>
    );
};

export default Authenticated;