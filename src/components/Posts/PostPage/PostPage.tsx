import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {useGetPostMutation} from "../../../store/api/postApi";

const PostPage: React.FC = () => {
    //TODO
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [getPost] = useGetPostMutation();

    useEffect(()=>{
        if(id !== undefined) {
            const rightId = parseInt(id);
            getPost(rightId).unwrap().then(response=>{
                setTitle(response.title);
                setContent(response.content);
            });
        }
    }, []);

    return (
        <Container>
            <h2>{title}</h2>
            <ReactMarkdown>{content}</ReactMarkdown>
        </Container>
    );
};

export default PostPage;