import React from 'react';
import classes from "./NavList.module.css";
import {List} from "../../../types/list";
import LinkList from "../../LinkList/LinkList";
import KeyValue from "../../../types/keyValue";

const NavList: React.FC<List<KeyValue<string, string>>> = (props:List<KeyValue<string, string>>) => {
    return (
        <nav className={classes.navigation}>
            <LinkList className={classes.navigation__list} itemClassName={classes.navigation__item} items={props.items}></LinkList>
        </nav>
    );
};

export default NavList;