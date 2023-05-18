import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = { 
    posts: [],
    loading: false
}

export const getPosts = createAsyncThunk(
    '/posts/getPosts', 
    async () => {
        const resposne = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return resposne.data;
    }
)

export const postsSlice = createSlice(
    {
        name: 'posts',
        initialState,
        reducers: {},
        extraReducers: {
            [getPosts.pending]: (state) => {
                state.loading = true
              },
              [getPosts.fulfilled]: (state, { payload }) => {
                state.loading = false
                state.entities = payload
              },
              [getPosts.rejected]: (state) => {
                state.loading = false
              }
        }
    }
)

export const postReducer = postsSlice.reducer;