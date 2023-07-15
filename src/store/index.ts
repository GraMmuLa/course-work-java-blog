import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import {userApi} from "./api/userApi";
import {postApi} from "./api/postApi";

const rootReducer = combineReducers( {
    userReducer: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer
});

const setupStore = () => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([userApi.middleware, postApi.middleware])
});

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState["dispatch"];