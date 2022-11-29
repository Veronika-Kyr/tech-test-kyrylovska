import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../interfaces/user';


export const fetchPostUsers = createAsyncThunk(
    "usersPost/fetch",
    async function (userData: IUser) {
        await fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }
        );
    }
);

const usersPostSlice = createSlice({
    name: 'usersPost',
    initialState: { data: [], fetchStatus: '' },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostUsers.fulfilled, (state, action) => {
            state.fetchStatus = 'success'
        })
            .addCase(fetchPostUsers.pending, (state) => {
                state.fetchStatus = 'loading'
            })
            .addCase(fetchPostUsers.rejected, (state) => {
                state.fetchStatus = 'error'
            })
    },
})

export default usersPostSlice;
