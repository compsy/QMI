import React from 'react'
import { CLONE, REORDER } from '../features/State Management/questionsSlice'
import store from '../store'

function useDrag() {
    const onDragEnd = React.useCallback(result => {
        const {source, destination} = result;
        if (!destination) {
            return;
        }
        switch (source.droppableId) {
            case "BAG":
                store.dispatch(REORDER({source: source, destination: destination}));
                break;
            case "SHOP":
                store.dispatch(CLONE({source: source, destination: destination}));
                break;
            default:
                break;
        }
    }, []);
    return onDragEnd
}

export default useDrag;