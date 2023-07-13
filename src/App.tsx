import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginForm from "./components/Forms/LoginForm/LoginForm";
import Layout from "./components/Layout/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from "./components/Forms/RegisterForm/RegisterForm";
import axios, {AxiosError} from "axios";
import {useAppDispatch} from "./hooks/redux";
import {userSlice} from "./store/reducers/userReducer";
import JwtResponse from "./types/jwtResponse";
import AddPostForm from "./components/Forms/AddPostForm/AddPostForm";
import {SessionValues} from "./resources/sessionValues";
import AdminRoutes from "./components/CustomRoutes/AdminRoutes";
import PrivateRoutes from "./components/CustomRoutes/PrivateRoutes";

function App() {

    const dispatch = useAppDispatch();
    const {login} = userSlice.actions;

    useEffect(() => {
        fetchToken();
    }, []);

    async function fetchToken() {
        const token: string|null = sessionStorage.getItem(SessionValues.JWT_AUTHORIZATION);
        if(token !== null) {
            try {
                const response = (await axios.get("http://localhost:8080/api/auth/checkToken", {
                    headers: {
                        "Authorization": "Bearer_"+token,
                        "Content-Type": "application/json",
                        "Accept": "*/*",
                    }
                }));

                const data: JwtResponse = response.data;
                sessionStorage.setItem(SessionValues.JWT_AUTHORIZATION, data.token);
                if(data)
                    dispatch(login(data));
            } catch (e: any) {
                if(e.response.data.message === "Expired token")
                    sessionStorage.removeItem(SessionValues.JWT_AUTHORIZATION);
            }
        }
    }

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout/>}>
                  <Route path="login" element={<LoginForm/>}/>
                  <Route path="register" element={<RegisterForm/>}/>
                  <Route element={<PrivateRoutes/>} >
                      <Route path="post/add" element={<AddPostForm/>}/>
                  </Route>
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
