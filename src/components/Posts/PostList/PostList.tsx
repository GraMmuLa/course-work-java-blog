import React from 'react';
import MinPost from "../MinPost/MinPost";
import {useGetPostsQuery} from "../../../store/api/postApi";
import {Container} from "react-bootstrap";

const PostList: React.FC = () => {

    const {data = [], isLoading} = useGetPostsQuery({from: 0, limit: 10});

    console.log(data);

    return (
        <Container className="mb-3">
            {
                isLoading
                ?
                <span>Loading...</span>
                :
                <ul style={{listStyle: "none", padding: "none", margin: "none"}}>
                    {data.map(x=><li className="mb-3"><MinPost id={x.id} title={x.title} content={x.content}/></li>)}
                </ul>
            }
        </Container>
    );
};

export default PostList;