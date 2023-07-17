import {createApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Post} from "../../types/model/post";
import PostDto from "../../types/dto/postDto";

export const postApi = createApi({
    reducerPath: "postApi",
    tagTypes: ["Posts"],
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8080/api"}),
    endpoints: (builder) => ({
        getPostsQuantity: builder.mutation<number, void>({
            query: ():string=>`post/quantity`,
        }),
        getPost: builder.mutation<Post, number>({
            query: (id:number):string=>`post/fetch/${id}`,
        }),
        getPosts: builder.mutation<Post[], {page: number, limit: number, searchString?: string}>({
            query: (obj: {page: number, limit: number, searchString?: string}): FetchArgs => ({
                url: `post/fetch?page=${obj.page}&limit=${obj.limit}${obj.searchString !== undefined ? `&searchString=${obj.searchString}` : ""}`,
                method: "GET",
            })
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
                    "Authorization": "Bearer_" + obj.token
                }
            })
        }),
        deletePost: builder.mutation<{completed: boolean}, {postId: number, token: string | null}>({
            query: (obj: {postId: number, token: string}):FetchArgs =>({
                url: `admin/post/delete/${obj.postId}`,
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer_"+(obj.token ? obj.token : "")
                }
            })
        })
    })
});

export const {useGetPostsQuantityMutation, useDeletePostMutation, useGetPostMutation, useGetPostsMutation, useAddPostMutation} = postApi;