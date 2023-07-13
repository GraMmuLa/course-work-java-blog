import React from 'react';
import classes from "../Header/NavList/NavList.module.css";
import {Link} from "react-router-dom";
import KeyValue from "../../types/keyValue";

const LinkList: React.FC<
    {
        className?: string,
        itemClassName?: string,
        items: KeyValue<string, string>[]
    }> =
    (props: {
        className?: string,
        itemClassName?: string,
        items: KeyValue<string, string>[]
    }) => {
    return (
        <ul className={props.className}>
            {props.items.map(
                x => {
                    return (
                        <li className={props.itemClassName}>
                            <Link to={x.value} className="link">{x.name}</Link>
                        </li>
                    );
                }
            )}
        </ul>
    );
};

export default LinkList;