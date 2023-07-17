import React from 'react';
import {Button, Card} from "react-bootstrap";
import {Post} from "../../../types/model/post";
import {Link} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {useDeletePostMutation} from "../../../store/api/postApi";
import {SessionValues} from "../../../resources/sessionValues";
import {useAppSelector} from "../../../hooks/redux";

const MinPost: React.FC<{post: Post, onDelete: Function}> = (props) => {

    const {roles} = useAppSelector(state=>state.userReducer);

    return (
        <Card>
            <Card.Body>
                <Card.Title>{props.post.title}</Card.Title>
                <Card.Body><ReactMarkdown>{props.post.content.substring(0, Math.min(props.post.content.length, 30)) + "..."}</ReactMarkdown></Card.Body>
                {
                    roles.includes("ADMIN")
                    ?
                    <Button variant="link" onClick={()=>props.onDelete(props.post.id)}>Delete post</Button>
                    :
                    <></>
                }

                <Link to={`/post/${props.post.id}`}>Read more</Link>
            </Card.Body>
        </Card>
    );
};

export default MinPost;