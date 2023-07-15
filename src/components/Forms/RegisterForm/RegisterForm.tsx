import React, {useState} from 'react';
import {Alert, Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {JwtObject} from "../../../types/additional/jwtObject";
import {useAppDispatch} from "../../../hooks/redux";
import {userSlice} from "../../../store/reducers/userReducer";
import {useNavigate} from "react-router-dom";
import {SessionValues} from "../../../resources/sessionValues";
import {useRegisterUserMutation} from "../../../store/api/userApi";

const RegisterForm: React.FC = () => {

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [invalidUsername, setInvalidUsername] = useState<boolean>(false);
    const [invalidPassword, setInvalidPassword] = useState<boolean>(false);

    const passwordExpression: RegExp = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const usernameExpression: RegExp = /[a-zA-Z0-9!#$^&*%]{6,16}$/

    const dispatch = useAppDispatch();

    const {init} = userSlice.actions;

    const [registerUser] = useRegisterUserMutation();

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!usernameExpression.test(username)) {
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
            const response: JwtObject = await registerUser({username: username, email: email, password: password}).unwrap();

            if(response) {
                dispatch(init(response));

                sessionStorage.setItem(SessionValues.JWT_AUTHORIZATION, response.token);

                if(response)
                    navigate("/");
            }

        } catch (e: any) {
            console.log("Something went wrong... in RegisterForm" + e.message);
        }
    }

    return (
        <Form className="container" onSubmit={(e)=>{handleSubmit(e)}}>
            <h2 className="mb-3">Register</h2>
            <FormGroup className="mb-3">
                <FormLabel>Login</FormLabel>
                <FormControl placeholder="Username" type="text" onChange={(e)=>{setUsername(e.target.value)}}/>
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