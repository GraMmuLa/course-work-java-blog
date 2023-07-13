import React from 'react';
import FooterList from "../FooterList/FooterList";
import {List} from "../../../types/list";
import classes from "../Footer.module.css";
import KeyValue from "../../../types/keyValue";

const FooterBlock: React.FC<List<KeyValue<String, String>>> = (props: List<KeyValue<String, String>>) => {
    return (
        <div className={classes.footer__block}>
            <h4 className={classes.footer__header}>{props.name}</h4>
            <hr/>
            <FooterList items={props.items}/>
        </div>
    );
};

export default FooterBlock;