import React from 'react';
import classes from './Header.module.css';
import NavList from "./NavList/NavList";
import {Link} from "../../types/link";
import Search from "./Search/Search";
import Authenticated from "./Auth/Authenticated/Authenticated";
import {threads} from "../../resources/threads";
import NotAuthenticated from "./Auth/NotAuthenticated/NotAuthenticated";
import {useAppSelector} from "../../hooks/redux";

const Header: React.FC = () => {

    const {loggedIn} = useAppSelector(state=>state.userReducer);

    return (
        <header className={classes.header}>
            <div className={classes.header__topBar}>
                <p className={classes.header__logo}>ExamBlog</p>
            </div>
            <div className={classes.header__bottomBar}>
                <NavList items={threads}/>
                <div className={classes.header__right}>
                    <Search/>
                    {
                        loggedIn
                        ?
                        <Authenticated/>
                        :
                        <NotAuthenticated/>
                    }
                </div>
            </div>
        </header>
    );
};
export default Header;

