import React from 'react';
import classes from './Header.module.css';
import NavList from "./NavList/NavList";
import {Link} from "../../models/link";
import Search from "./Search/Search";
import NotAuthenticated from "./Auth/NotAuthenticated/NotAuthenticated";
import Authenticated from "./Auth/Authenticated/Authenticated";

const Header: React.FC = () => {

    const navItems: Link[] = [
        {name: "Home", value: "#"},
        {name: "About us", value: "#"},
        {name: "Top posts", value: "#"},
        {name: "Contacts", value: "#"},
    ];

    // TODO:
    return (
        <header className={classes.header}>
            <NavList items={navItems}/>
            <div className={classes.header__right}>
                <Search/>
                {/*<NotAuthenticated/>*/}
                <Authenticated/>
            </div>
        </header>
    );
};
export default Header;

