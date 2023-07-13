import React from 'react';
import {useAppSelector} from "../../hooks/redux";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoutes: React.FC = () => {
    const {loggedIn} = useAppSelector(state=>state.userReducer);

    return (
        loggedIn ? <Outlet/> : <Navigate to="/login"/>
    );
};

export default PrivateRoutes;