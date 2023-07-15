import React from 'react';
import {Card} from "react-bootstrap";
import {Post} from "../../../types/model/post";
import {Link} from "react-router-dom";

const MinPost: React.FC<Post> = (props: Post) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Body>{props.content}</Card.Body>
                <Link to={`/post/${props.id}`}>Read more</Link>
            </Card.Body>
        </Card>
    );
};

export default MinPost;