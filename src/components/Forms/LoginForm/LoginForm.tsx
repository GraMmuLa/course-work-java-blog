import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../hooks/redux";
import {userSlice} from "../../../store/reducers/userReducer";
import {Alert, Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {SessionValues} from "../../../resources/sessionValues";
import {useLoginUserMutation} from "../../../store/api/userApi";

const LoginForm: React.FC = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [withError, setWithError] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const [loginUser] = useLoginUserMutation();

    const {init} = userSlice.actions;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if(!username || !password) {
            setWithError(true);
            return;
        }

        try {
            const response = await loginUser({username: username, password: password}).unwrap();
            if(response) {
                await dispatch(init(response));

                sessionStorage.setItem(SessionValues.JWT_AUTHORIZATION, response.token);

                navigate("/");
            }

        } catch (e) {
            console.log(e);
            setWithError(true);
        }
    }

    return (
        <Form className="container" method="get" onSubmit={(e) => handleSubmit(e)}>
            <h2>Login</h2>
            {
                withError
                ?
              <Alert key="danger" variant="danger">Invalid username or password</Alert>
                :
              <></>
            }
            <FormGroup className="mb-3">
                <FormLabel>Login</FormLabel>
                <FormControl type="text" placeholder="Имя пользователя" value={username} onChange={(e)=>setUsername(e.target.value)}/>
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