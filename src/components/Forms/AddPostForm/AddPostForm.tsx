import React, {useState} from 'react';
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {useAppSelector} from "../../../hooks/redux";
import {SessionValues} from "../../../resources/sessionValues";
import {User} from "../../../types/model/user";
import {useAddPostMutation} from "../../../store/api/postApi";
import {useNavigate} from "react-router-dom";

const AddPostForm: React.FC = () => {

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [disabledButton, setDisabledButton] = useState<boolean>(false);

    const {id} = useAppSelector<User>(state=>state.userReducer);

    const [addPost] = useAddPostMutation();

    const token = sessionStorage.getItem(SessionValues.JWT_AUTHORIZATION);

    const navigate = useNavigate();



    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setDisabledButton(true);

        try {

            if(token !== null) {
                const payload = {token: token, post: {title: title, content: content}, userId: id};

                const response = await addPost(payload).unwrap();

                if(response)
                    navigate("/")
            }
        } catch (e: any) {
            setDisabledButton(false);
            console.log("ERROR " + e);
        }
    }

    return (
        <Form className="container" onSubmit={(e)=>{handleSubmit(e)}}>
            <FormGroup>
               <FormLabel>Title</FormLabel>
               <FormControl type="text" onChange={(e)=>{setTitle(e.target.value)}}/>
            </FormGroup>
            <FormGroup>
               <FormLabel>Content</FormLabel>
               <FormControl as="textarea" rows={9} onChange={(e)=>{setContent(e.target.value);}}/>
            </FormGroup>
            <Button type="submit" disabled={disabledButton} variant="success">Send</Button>
        </Form>
    );
};

export default AddPostForm;