import React, {useState} from 'react';
import axios from "axios";
import {useCookies} from "react-cookie";
import {Cookie} from "../../types/cookie";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux";
import {userSlice} from "../../store/reducers/userReducer";
import JwtResponse from "../../types/jwtResponse";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";

const LoginForm: React.FC = () => {

    const navigate = useNavigate();

    let [loginText, setLoginText] = useState("");
    let [password, setPassword] = useState("");

    const dispatch = useAppDispatch();

    const {login} = userSlice.actions;

    const [cookies, setCookies, getCookies]: [Cookie, Function, Function] = useCookies([]);

    // TODO
    const submitUser = async (e: React.FormEvent) => {

        e.preventDefault();

        try {
            const response = await (axios.post("http://localhost:8080/api/auth", {
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

            setCookies("jwt_authentication", data.token);

            if(response.data)
                navigate("/");

        } catch (e) {
            console.log("Something went wrong... " + e);
        }
    }

    return (
        <Form className="container" method="get" onSubmit={(e) => submitUser(e)}>
            <h2>Login</h2>
            <FormGroup className="mb-3">
                <FormLabel>Login</FormLabel>
                <FormControl type="text" placeholder="Имя пользователя" value={loginText} onChange={(e)=>setLoginText(e.target.value)}/>
            </FormGroup>
            <FormGroup className="mb-3">
                <FormLabel>Password</FormLabel>
                <FormControl type="password" placeholder="Пароль" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </FormGroup>
            <Button className="mb-3" variant="success" type="submit">Подтвердить</Button>
        </Form>
    );
};

export default LoginForm;