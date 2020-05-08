import {createSlice} from "@reduxjs/toolkit";

export const utilitiesSlice = createSlice({
    name: "utilities",
    initialState: {
        showsMap: {},
        hidesMap: {},
    },
    reducers: {},
});

export const {} = utilitiesSlice.actions;

export default utilitiesSlice.reducer;
