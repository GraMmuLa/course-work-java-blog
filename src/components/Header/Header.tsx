import React from 'react';
import classes from './Header.module.css';
import NavList from "./NavList/NavList";
import {Link} from "../types/link";
import Search from "./Search/Search";
import Authenticated from "./Auth/Authenticated/Authenticated";
import {threads} from "../../resources/threads";

const Header: React.FC = () => {
    return (
        <header className={classes.header}>
            <div className={classes.header__topBar}>
                <p className={classes.header__logo}>ExamBlog</p>
            </div>
            <div className={classes.header__bottomBar}>
                <NavList items={threads}/>
                <div className={classes.header__right}>
                    <Search/>
                    {/*<NotAuthenticated/>*/}
                    <Authenticated/>
                </div>
            </div>
        </header>
    );
};
export default Header;

