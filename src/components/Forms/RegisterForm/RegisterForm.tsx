import React, {useState} from 'react';
import {Alert, Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import axios from "axios";
import JwtResponse from "../../../types/jwtResponse";
import {useAppDispatch} from "../../../hooks/redux";
import {userSlice} from "../../../store/reducers/userReducer";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {SessionValues} from "../../../resources/sessionValues";

const RegisterForm: React.FC = () => {

    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [invalidUsername, setInvalidUsername] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);

    const passwordExpression: RegExp = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const usernameExpression: RegExp = /[a-zA-Z0-9!#$^&*%]{6,16}$/

    const dispatch = useAppDispatch();

    const {register} = userSlice.actions;

    const navigate = useNavigate();

    const registerUser = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!usernameExpression.test(login)) {
            if(!passwordExpression.test(password))
                setInvalidPassword(true);
            setInvalidUsername(true);
            return;
        }
        if(!passwordExpression.test(password)) {
            setInvalidPassword(true);
            return;
        }

        try {
            const response = await (axios.post("http://localhost:8080/api/auth/register", {
                username: login,
                email: email,
                password: password
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                }
            }));

            const data: JwtResponse = response.data;

            dispatch(register(data));

            sessionStorage.setItem(SessionValues.JWT_AUTHORIZATION, data.token);

            if(response.data)
                navigate("/");

        } catch (e) {
            console.log("Something went wrong... in RegisterForm" + e);
        }
    }

    return (
        <Form className="container" onSubmit={(e)=>{registerUser(e)}}>
            <h2 className="mb-3">Register</h2>
            <FormGroup className="mb-3">
                <FormLabel>Login</FormLabel>
                <FormControl placeholder="Username" type="text" onChange={(e)=>{setLogin(e.target.value)}}/>
            </FormGroup>
            {
                invalidUsername
                    ?
                <Alert className="mb-3" key="danger" variant="danger">Invalid username</Alert>
                    :
                <></>
            }
            <FormGroup className="mb-3">
                <FormLabel>Email</FormLabel>
                <FormControl type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
            </FormGroup>
            <FormGroup className="mb-3">
                <FormLabel>Password</FormLabel>
                <FormControl type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
            </FormGroup>
            {
                invalidPassword
                    ?
                    <Alert className="mb-3" key="danger" variant="danger">Invalid password</Alert>
                    :
                    <></>
            }

            <Button className="mb-3" type="submit" variant="success">Send</Button>
        </Form>
    );
};

export default RegisterForm;