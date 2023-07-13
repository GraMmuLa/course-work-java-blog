import React from 'react';
import {useAppSelector} from "../../hooks/redux";
import {Navigate, Outlet} from "react-router-dom";

const AdminRoutes: React.FC = () => {
    const {loggedIn} = useAppSelector(state=>state.userReducer);

    return (
        //TODO
        loggedIn ? <Outlet/> : <Navigate to="/login"/>
    );
};

export default AdminRoutes;