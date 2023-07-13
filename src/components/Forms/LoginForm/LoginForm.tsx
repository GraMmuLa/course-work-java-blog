import React, {useState} from 'react';
import axios from "axios";
import {useCookies} from "react-cookie";
import {Cookie} from "../../../types/cookie";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../hooks/redux";
import {userSlice} from "../../../store/reducers/userReducer";
import JwtResponse from "../../../types/jwtResponse";
import {Alert, Button, Form, FormControl, FormGroup, FormLabel, NavLink} from "react-bootstrap";
import {SessionValues} from "../../../resources/sessionValues";

const LoginForm: React.FC = () => {

    const navigate = useNavigate();

    const [loginText, setLoginText] = useState("");
    const [password, setPassword] = useState("");

    const [withError, setWithError] = useState(false);

    const dispatch = useAppDispatch();

    const {login} = userSlice.actions;

    // TODO
    const submitUser = async (e: React.FormEvent) => {

        e.preventDefault();

        if(!loginText || !password) {
            setWithError(true);
            return;
        }

        try {
            const response = await (axios.post("http://localhost:8080/api/auth/login", {
                username: loginText,
                password: password
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            }));

            const data: JwtResponse = response.data;

            dispatch(login(data));

            sessionStorage.setItem(SessionValues.JWT_AUTHORIZATION, data.token);

            if(response.data) {
                navigate("/");
            }

        } catch (e) {
            console.log("Something went wrong... " + e);
            setWithError(true);
        }
    }

    return (
        <Form className="container" method="get" onSubmit={(e) => submitUser(e)}>
            <h2>Login</h2>
            { withError
                ?
              <Alert key="danger" variant="danger">Invalid username or password</Alert>
                :
              <></>
            }
            <FormGroup className="mb-3">
                <FormLabel>Login</FormLabel>
                <FormControl type="text" placeholder="Имя пользователя" value={loginText} onChange={(e)=>setLoginText(e.target.value)}/>
            </FormGroup>
            <FormGroup className="mb-3">
                <FormLabel>Password</FormLabel>
                <FormControl type="password" placeholder="Пароль" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </FormGroup>

            <Button className="mb-3" variant="link"><Link to="/register">Register</Link></Button>

            <Button className="mb-3" variant="success" type="submit">Подтвердить</Button>
        </Form>
    );
};

export default LoginForm;