import { createSlice } from '@reduxjs/toolkit'

export const utilitiesSlice = createSlice({
    name: 'utilities',
    initialState: {
        showsMap: {},
        hidesMap: {},
        saved: {},
        idMap: {},
    },
    reducers: {
        addToMap: (state, action) => {
            // 1) check if uuid already exists in map
            const {type, key, value} = action.payload
            const list = state[type][key]
            if (list !== undefined && list.length > 0) {
                state[type][key] = [...list, value]
            } else {
                state[type][key] = [value]
            }
        },
        removeFromMap: (state, action) => {
            const {type, key, value} = action.payload
            if (state[type][key] && state[type][key].length > 0) {
                state[type][key] = state[type][key].filter(
                    (x) => JSON.stringify(x) !== JSON.stringify(value)
                )
            }
        },
        removeByKey: (state, action) => {
            const {[action.payload.key]: value, ...rest} = state[
                action.payload.type
                ]
            console.log('rest: ', rest)
            state[action.payload.type] = rest
        },
        SET_UTILITIES: (state, action) => {
            return action.payload
        },
        SET_SAVED: (state, action) => {
            state.saved = action.payload
        },
        SET_IDMAP: (state, action) => {
            state.idMap = action.payload
        },
        CLEAR_MAPS: (state, action) => {
            state.showsMap = {};
            state.hidesMap = {};
        }
    },
})

export const {
    addToMap,
    removeFromMap,
    removeByKey,
    SET_UTILITIES,
    SET_SAVED,
    CLEAR_MAPS
} = utilitiesSlice.actions

export const initializeMaps = questions => dispatch => {
    // computeMaps
    dispatch(CLEAR_MAPS());
    // 1) go through the questionnaire
    for (let i = 0; i < questions.length; i++) {
        // 2) check if "radio" or "checkbox" type
        if (questions[i].type === "radio" || questions[i].type === "checkbox") {
            // 3) go through the question's options
            for (let j = 0; j < questions[i].options.length; j++) {
                // 4) check if "string" or "object" type
                if (typeof (questions[i].options[j]) === "object") {
                    // 5) check if "shows_questions" or "hides_questions" is not undefined
                    if (questions[i].options[j].shows_questions !== undefined && questions[i].options[j].shows_questions.length > 0) {
                        // 6) go through the shows_questions and add to correct map
                        for (let k = 0; k < questions[i].options[j].shows_questions.length; k++) {
                            dispatch(addToMap({
                                type: 'showsMap',
                                key: questions[i].options[j].shows_questions[k],
                                value: {qid: questions[i].id, oid: questions[i].options[j].id},
                            }))
                        }
                        // 7) go through the hides_questions and add to correct map
                        for (let k = 0; k < questions[i].options[j].hides_questions.length; k++) {
                            dispatch(addToMap({
                                type: 'hidesMap',
                                key: questions[i].options[j].hides_questions[k],
                                value: {qid: questions[i].id, oid: questions[i].options[j].id},
                            }))
                        }
                    }
                }
            }
        }
    }
};

export default utilitiesSlice.reducer
