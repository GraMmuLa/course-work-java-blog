import React from 'react';
import {Link} from "../../types/link";
import classes from "./FooterList.module.css";
import {List} from "../../types/list";

const FooterList:React.FC<List<Link>> = (props: List<Link>) => {
    return (
        <ul className={classes.list}>
            {props.items.map(x=> (
                <li className={classes.list__item}>
                     <a className={classes.list__link} href={x.value}>{x.name}</a>
                </li>
            ))}
        </ul>
    );
};

export default FooterList;