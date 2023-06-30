import React from 'react';
import {Link} from "../../types/link";
import classes from "./NavList.module.css";
import {List} from "../../types/list";

const NavList: React.FC<List<Link>> = (props:List<Link>) => {
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