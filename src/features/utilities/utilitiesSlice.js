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
            const { type, key, value } = action.payload
            const list = state[type][key]
            if (list !== undefined && list.length > 0) {
                state[type][key] = [...list, value]
            } else {
                state[type][key] = [value]
            }
        },
        removeFromMap: (state, action) => {
            const { type, key, value } = action.payload
            if (state[type][key] && state[type][key].length > 0) {
                state[type][key] = state[type][key].filter(
                    (x) => JSON.stringify(x) !== JSON.stringify(value)
                )
            }
        },
        removeByKey: (state, action) => {
            const { [action.payload.key]: value, ...rest } = state[
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
    SET_IDMAP,
    CLEAR_MAPS
} = utilitiesSlice.actions

export default utilitiesSlice.reducer
