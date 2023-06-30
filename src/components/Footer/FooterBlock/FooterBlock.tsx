import React from 'react';
import {Link} from "../../types/link";
import FooterList from "../FooterList/FooterList";
import {List} from "../../types/list";
import classes from "../Footer.module.css";

const FooterBlock: React.FC<List<Link>> = (props: List<Link>) => {
    return (
        <div className={classes.footer__block}>
            <h4 className={classes.footer__header}>{props.name}</h4>
            <hr/>
            <FooterList items={props.items}/>
        </div>
    );
};

export default FooterBlock;