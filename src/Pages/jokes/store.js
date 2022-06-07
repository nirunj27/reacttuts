import {configureStore} from "@reduxjs/toolkit"
import JokeReducer from "./features/jokeSlice"


export default configureStore({
    reducer:{
        joke:JokeReducer,
    },
});