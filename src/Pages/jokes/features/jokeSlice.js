import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"


export const getJokes = createAsyncThunk('Jokes/getJokes',async () =>{
    return  axios.get("https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10").then((res)=>
            res.data                                                                                                                       
        //console.log(res.data)
     )
})


const jokeSlice = createSlice(({
    name:"jokes",
    initialState:{
        jokes:[],
        loading:false
    },
    extraReducers :{
        [getJokes.pending]:(state,action)=>{
            state.loading=true
        },
        [getJokes.fulfilled]:(state,action)=>{
            state.loading=false;
            state.jokes=action.payload
        },
        [getJokes.rejected]:(state,action)=>{
            state.loading=false;            
        }
    }

}))
export default jokeSlice.reducer
