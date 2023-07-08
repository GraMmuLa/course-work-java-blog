import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
    userReducer: userReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer
});

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState["dispatch"];