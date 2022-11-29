import { configureStore } from '@reduxjs/toolkit';
import usersSlice from '../features/usersSlice';
import usersPostSlice from '../features/usersPostSlice'


const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
        usersPost: usersPostSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
