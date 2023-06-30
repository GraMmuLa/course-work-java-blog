import React from 'react';
import classes from "./Search.module.css";

const Search: React.FC = () => {
    return (
        <div className={classes.search}>
            <input type="text" className={classes.search__input} placeholder="Search..."/>
            <button className={classes.search__button}>Search</button>
        </div>
    );
};

export default Search;