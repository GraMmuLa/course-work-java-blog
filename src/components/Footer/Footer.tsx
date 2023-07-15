import React from 'react';
import classes from "./Footer.module.css";
import {threads} from "../../resources/threads";
import LinkList from "../LinkList/LinkList";

const Footer: React.FC = () => {

    //TODO
    const footerBlocks= [
        {
            name: "Account",
            items: [
                {name: "Login", value: "#"},
                {name: "Register", value: "#"}
            ]
        },
        {
            name: "Threads",
            items: threads
        },
        {
            name: "Help",
            items: [
                {name: "How to use", value: "#"},
                {name: "How to post", value: "#"},
                {name: "How to register", value: "#"},
                {name: "How to contact us", value: "#"}
            ]
        },
        {
            name: "Contact us",
            items: [
                {name: "Our address", value: "#"},
                {name: "Our socials", value: "#"}
            ]
        }
    ];

    return (
        <footer>
            <div className={classes.footer__topBar}>
                {
                    footerBlocks.map(x=>
                        <div>
                            <h5 className={classes.footer__header}>{x.name}</h5>
                            <LinkList items={x.items} className={classes.footer__block}/>
                        </div>)
                }
            </div>
            <div className={classes.footer__bottomBar}></div>
        </footer>
    );
};

export default Footer;