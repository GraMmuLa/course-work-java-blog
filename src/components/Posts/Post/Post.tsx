import React from 'react';
import {Container} from "react-bootstrap";
import {Post} from "../../../types/model/post";
import {useParams} from "react-router-dom";

const Post: React.FC<Post> = (props) => {
    //TODO
    const {id} = useParams();

    return (
        <Container>
            <h2>{props.title}</h2>
            <p>{props.content}</p>
        </Container>
    );
};

export default Post;