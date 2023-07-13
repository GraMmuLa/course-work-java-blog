import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import User from "../../types/user";
import jwtDecode from "jwt-decode";
import DecodedJwtToken from "../../types/decodedJwtToken";
import JwtResponse from "../../types/jwtResponse";

const initialState: User = {
    id: 0,
    username: "",
    password: null,
    email: "",
    roles: [],
    loggedIn: false
}

export const userSlice = createSlice({
    name: "userReducer",
    initialState: initialState,
    reducers: {
        login(state: User, action: PayloadAction<JwtResponse>) {
            const token = action.payload.token;
            const decoded: DecodedJwtToken = jwtDecode(token);
            console.log(decoded);
            state.id = decoded.userId;
            state.username = decoded.sub;
            state.roles = decoded.roles;
            state.email = decoded.email;
            state.loggedIn = true;
        },
        register(state: User, action: PayloadAction<JwtResponse>) {
            const token = action.payload.token;
            const decoded: DecodedJwtToken = jwtDecode(token);
            console.log(decoded);
            state.username = decoded.sub;
            state.email = decoded.email;
            state.roles = decoded.roles;
            state.loggedIn = true;
        }
    },
    extraReducers: {
    }
});

export default userSlice.reducer;