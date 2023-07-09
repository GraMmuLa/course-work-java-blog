import React, {useState} from 'react';
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import axios from "axios";
import JwtResponse from "../../types/jwtResponse";
import {useAppDispatch} from "../../hooks/redux";
import {userSlice} from "../../store/reducers/userReducer";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

const RegisterForm: React.FC = () => {

    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [cookies, setCookies, removeCookies] = useCookies();

    const dispatch = useAppDispatch();

    const {register} = userSlice.actions;

    const navigate = useNavigate();

    const registerUser = async (e: React.FormEvent) => {
        e.preventDefault();

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

            setCookies("jwt_authentication", data.token);

            if(response.data)
                navigate("/");

        } catch (e) {
            console.log("Something went wrong... " + e);
        }
    }

    return (
        <Form onSubmit={(e)=>{registerUser(e)}}>
            <FormGroup>
                <FormLabel>Login</FormLabel>
                <FormControl type="text" onChange={(e)=>{setLogin(e.target.value)}}/>
            </FormGroup>
            <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormControl type="email" onChange={(e)=>{setEmail(e.target.value)}}/>
            </FormGroup>
            <FormGroup>
                <FormLabel>Password</FormLabel>
                <FormControl type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
            </FormGroup>

            <Button type="submit" variant="success">Send</Button>
        </Form>
    );
};

export default RegisterForm;