import React from 'react';
import {Link} from "react-router-dom";
import {List} from "../../types/additional/list";
import {KeyValue} from "../../types/additional/keyValue";

const LinkList: React.FC<List<KeyValue<string, string>>> = (props) => {
    return (
        <ul className={props.className}>
            {props.items.map(
                x => {
                    return (
                        <li className={props.itemClassName}>
                            <Link to={x.value} className="link-light">{x.name}</Link>
                        </li>
                    );
                }
            )}
        </ul>
    );
};

export default LinkList;