import {createApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import UserDto from "../../types/dto/userDto";
import {JwtObject} from "../../types/additional/jwtObject";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8080/api"}),
    endpoints: (builder) => ({
        loginUser: builder.mutation<JwtObject, UserDto>({
            query: (user: UserDto):FetchArgs => ({
                url: "auth/login",
                method: "POST",
                body: {
                    username: user.username,
                    password: user.password
                }
            })
        }),
        checkToken: builder.mutation<JwtObject, JwtObject>({
           query: (jwt: JwtObject): FetchArgs => ({
               url: "auth/checkToken",
               method: "GET",
               headers: {
                   "Authorization": "Bearer_"+jwt.token,
                   "Access-Control-Allow-Origin": "*"
               }
           })
        }),
        registerUser: builder.mutation<JwtObject, UserDto>({
            query: (user: UserDto): FetchArgs => ({
                url: "auth/register",
                method: "POST",
                body: {
                    username: user.username,
                    password: user.password,
                    email: user.email
                }
            })
        })
    })
});

export const {useLoginUserMutation, useRegisterUserMutation, useCheckTokenMutation} = userApi;
