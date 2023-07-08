import React from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {Outlet} from "react-router-dom";

const Layout: React.FC = () => {
    return (
        <div className="app">
            <Header/>
            <main style={{marginBottom: "50px"}} className="main">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;