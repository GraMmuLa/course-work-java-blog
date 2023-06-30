import React from 'react';
import {Link} from "../../../models/link";
import {Props} from "../../../models/props";
import classes from "./NavList.module.css";

const NavList: React.FC<Props<Link>> = (props:Props<Link>) => {
    return (
        <nav className={classes.navigation}>
            <ul className={classes.navigation__list}>
                {props.items.map(
                    x=> {
                        return (
                            <li className={classes.navigation__item}>
                                <a className="link" href={x.value}>{x.name}</a>
                            </li>
                        );
                    }
                )}
            </ul>
        </nav>
    );
};

export default NavList;