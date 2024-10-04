import { createSlice } from '@reduxjs/toolkit';

export type User = {
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    token: string | null;
    id: string | null;
    isAdmin: boolean | null;
    rating: number;
};

const initialState: User = {
    email: null,
    firstName: null,
    lastName: null,
    token: null,
    id: null,
    isAdmin: false,
    rating: 0,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.isAdmin = action.payload.isAdmin;
            state.rating = action.payload.rating;
        },
        removeUser(state) {
            state.email = null;
            state.firstName = null;
            state.lastName = null;
            state.token = null;
            state.id = null;
            state.isAdmin = false;
            state.rating = 0;
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
