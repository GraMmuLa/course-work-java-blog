import React from 'react';
import classes from "./Footer.module.css";
import FooterList from "./FooterList/FooterList";
import {Link} from "../types/link";
import FooterBlock from "./FooterBlock/FooterBlock";
import {threads} from "../../resources/threads";

const Footer: React.FC = () => {

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
                    footerBlocks.map(x=><FooterBlock name={x.name} items={x.items}/>)
                }
            </div>
            <div className={classes.footer__bottomBar}></div>
        </footer>
    );
};

export default Footer;