import React from 'react';
import classes from "./NavList.module.css";
import {List} from "../../../types/additional/list";
import LinkList from "../../LinkList/LinkList";
import {KeyValue} from "../../../types/additional/keyValue";

const NavList: React.FC<List<KeyValue<string, string>>> = (props) => {
    return (
        <nav className={classes.navigation}>
            <LinkList className={classes.navigation__list} itemClassName={classes.navigation__item} items={props.items}></LinkList>
        </nav>
    );
};

export default NavList;