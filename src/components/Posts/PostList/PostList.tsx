import React, {useEffect, useState} from 'react';
import MinPost from "../MinPost/MinPost";
import {
    useDeletePostMutation,
    useGetPostsMutation,
    useGetPostsQuantityMutation,
} from "../../../store/api/postApi";
import {Container} from "react-bootstrap";
import {PaginationControl} from "react-bootstrap-pagination-control";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {postSlice} from "../../../store/reducers/postsReducer";
import {SessionValues} from "../../../resources/sessionValues";
const PostList: React.FC = () => {

    const [page, setPage] = useState<number>(1);

    const [getPosts , {isLoading}] = useGetPostsMutation();
    const [getPostsSize] = useGetPostsQuantityMutation();
    const [deletePost] = useDeletePostMutation();

    const [pageQty, setPageQty] = useState<number>(1);
    const token = sessionStorage.getItem(SessionValues.JWT_AUTHORIZATION);

    const [deletedOperations, setDeletedOperations] = useState(0);

    const dispatch = useAppDispatch();

    const {addMany} = postSlice.actions;
    const {items} = useAppSelector(state => state.postReducer);

    useEffect(()=>{
        getPostsSize().unwrap()
            .then(response=> setPageQty(response !== undefined ? Math.ceil(response / 10) : 1))
            .then(() => {
                getPosts({page: page, limit: 10}).unwrap()
                    .then(response => {
                        dispatch(addMany(response));
                    });
            });
    }, [page, deletedOperations]);

    useEffect(()=>{
        if(pageQty < page)
            setPage(page-1);
    }, [pageQty]);

    function onDeleteMinPost(id: number) {
        deletePost({postId: id, token: token}).then(()=>setDeletedOperations(deletedOperations+1));
    }

    return (
        <Container className="mb-3">
            {
                isLoading
                ?
                <span>Loading...</span>
                :
                <ul style={{listStyle: "none", padding: "none", margin: "none"}}>
                    {items.map(x=><li className="mb-3"><MinPost onDelete={(id: number)=>onDeleteMinPost(id)} post={{id: x.id, title: x.title, content: x.content}}/></li>)}
                </ul>
            }
            <PaginationControl
                page={page}
                between={4}
                total={pageQty}
                limit={1}
                changePage={(page) => setPage(page)}
                ellipsis={1}
            />
        </Container>
    );
};

export default PostList;