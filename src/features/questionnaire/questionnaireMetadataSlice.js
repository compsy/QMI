import {createSlice} from "@reduxjs/toolkit";

import {GENERATE_INITIAL_QUESTIONNAIRE_METADATA_CONTEXT} from "../../utils";


export const questionnaireMetadataSlice = createSlice({
    name: "questionnaireMetadata",
    initialState: GENERATE_INITIAL_QUESTIONNAIRE_METADATA_CONTEXT(),
    reducers: {
        SET_METADATA: (state, action) => {
            return action.payload.metadata;
        },
    },
});

export const {
    SET_METADATA,
} = questionnaireMetadataSlice.actions;

export default questionnaireMetadataSlice.reducer;
