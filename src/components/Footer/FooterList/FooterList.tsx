import React from 'react';
import classes from "./FooterList.module.css";
import {List} from "../../../types/list";
import KeyValue from "../../../types/keyValue";

const FooterList:React.FC<List<KeyValue<string, string>>> = (props: List<KeyValue<string, string>>) => {
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