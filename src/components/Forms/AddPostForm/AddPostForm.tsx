import React, {useState} from 'react';
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import axios from "axios";
import {useAppSelector} from "../../../hooks/redux";
import header from "../../Header/Header";
import {SessionValues} from "../../../resources/sessionValues";

const AddPostForm: React.FC = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const {id} = useAppSelector(state=>state.userReducer);

    const token = sessionStorage.getItem(SessionValues.JWT_AUTHORIZATION);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = (await axios.post(`http://localhost:8080/api/admin/post/add/${1}`, {
                title: title,
                content: content,
            }, {
                headers: {
                    "Authorization": "Bearer_"+token,
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            }));

            if(response.data)
                console.log(response.data);
        } catch (e: any) {
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
            <Button type="submit" variant="success">Send</Button>
        </Form>
    );
};

export default AddPostForm;