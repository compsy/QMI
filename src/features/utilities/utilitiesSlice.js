import {createSlice} from "@reduxjs/toolkit";

export const utilitiesSlice = createSlice({
    name: "utilities",
    initialState: {
        showsMap: {},
        hidesMap: {},
        toDispatch: [],
    },
    reducers: {
        addToMap: (state, action) => {
            // 1) check if uuid already exists in map
            const { type, key, value } = action.payload;
            const list = state[type][key];
            if (list !== undefined && list.length > 0) {
                state[type][key] = [...list, value];
            } else {
                state[type][key] = [value];
            }
        },
        addToToDispatch: (state, action) => {
            state.toDispatch = [...state.toDispatch, action.payload];
        },
    },
});

export const { addToMap, addToToDispatch } = utilitiesSlice.actions;

export default utilitiesSlice.reducer;
