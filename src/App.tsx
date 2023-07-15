import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginForm from "./components/Forms/LoginForm/LoginForm";
import Layout from "./components/Layout/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from "./components/Forms/RegisterForm/RegisterForm";
import {useAppDispatch} from "./hooks/redux";
import {userSlice} from "./store/reducers/userReducer";
import AddPostForm from "./components/Forms/AddPostForm/AddPostForm";
import {SessionValues} from "./resources/sessionValues";
import PrivateRoutes from "./components/CustomRoutes/PrivateRoutes";
import PostList from "./components/Posts/PostList/PostList";
import {useCheckTokenMutation} from "./store/api/userApi";
import {JwtObject} from "./types/additional/jwtObject";

function App() {

    const dispatch = useAppDispatch();
    const {init} = userSlice.actions;
    const [checkToken] = useCheckTokenMutation();

    async function fetchToken() {
        const token: string | null = sessionStorage.getItem(SessionValues.JWT_AUTHORIZATION);
        if(token !== null) {
            try {
                const response: JwtObject = (await checkToken({token: token}).unwrap());

                if(response) {
                    sessionStorage.setItem(SessionValues.JWT_AUTHORIZATION, response.token);
                    dispatch(init(response));
                }
            } catch (e: any) {
                sessionStorage.removeItem(SessionValues.JWT_AUTHORIZATION);
            }
        }
    }

    useEffect(() => {
        fetchToken();
    }, []);

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout/>}>
                  <Route index element={<PostList/>}/>
                  <Route path="post" element={<PostList/>}>
                      <Route path=":id"/>
                      <Route path="all" element={<PostList/>}/>
                  </Route>

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
