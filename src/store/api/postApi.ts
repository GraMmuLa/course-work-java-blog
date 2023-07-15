import {createApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Post} from "../../types/model/post";
import PostDto from "../../types/dto/postDto";

export const postApi = createApi({
    reducerPath: "postApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8080/api"}),
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], {from: number, limit: number}>({
            query: (obj: {from: number, limit: number}) => `post/fetch?from=${obj.from}&limit=${obj.limit}`
        }),
        addPost: builder.mutation<Post, {token: string, post: PostDto, userId: number}> ({
            query: (obj: { token: string, post: Post, userId: number }): FetchArgs => ({
                url: `admin/post/add/${obj.userId}`,
                method: "POST",
                body: {
                    title: obj.post.title,
                    content: obj.post.content
                },
                headers: {
                    "Authorization": "Bearer_" + obj.token,
                    "Access-Control-Allow-Origin": "*"
                }
            })
        })
    })
});

export const {useGetPostsQuery, useAddPostMutation} = postApi;