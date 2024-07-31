import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'User',
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return action.payload; // On retuning it takes place of initial state and update the value of slice
        },
        removeUser: (state, action) => {
            return null;
        },
        updateName: (state, action) => {
            state.displayName = action.payload;
            console.log(state);
            return state;
        }
    }
});

export const {addUser, removeUser, updateName} = userSlice.actions;
export default userSlice.reducer;