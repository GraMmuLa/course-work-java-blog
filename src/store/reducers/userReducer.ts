import {createSlice, PayloadAction, SliceCaseReducers} from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import {User} from "../../types/model/user";
import {DecodedJwtToken} from "../../types/additional/decodedJwtToken";
import {JwtObject} from "../../types/additional/jwtObject";

const initialState: User = {
    id: 0,
    username: "",
    password: null,
    email: "",
    roles: [],
    loggedIn: false
}

export const userSlice = createSlice<User, SliceCaseReducers<User>, string>({
    name: "userReducer",
    initialState: initialState,
    reducers: {
        init(state: User, action: PayloadAction<JwtObject>) {
            try {
                const token = action.payload.token;
                const decoded: DecodedJwtToken = jwtDecode(token);
                state.id = decoded.userId;
                state.username = decoded.sub;
                state.email = decoded.email;
                state.roles = decoded.roles;
                state.loggedIn = true;
            } catch (e) {
                console.log("Invalid token");
            }
        }
    }
});

export default userSlice.reducer;