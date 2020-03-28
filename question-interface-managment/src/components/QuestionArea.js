import React from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

const getRenderItem = (items, className) => (provided, snapshot, rubric) => {
    const item = items[rubric.source.index];
    return (
        <React.Fragment>
            <li
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                style={provided.draggableProps.style}
                className={snapshot.isDragging ? "dragging" : ""}
            >
                {item.label}
            </li>
        </React.Fragment>
    );
};


function QuestionArea(props) {
    return (
        <Droppable
            renderClone={getRenderItem(props.items, props.className)}
            droppableId={props.droppableId}
            isDropDisabled={true}
        >
            {(provided, snapshot) => (
                <ul ref={provided.innerRef} className={props.className}>
                    {props.items.map((item, index) => {
                        const shouldRenderClone = item.id === snapshot.draggingFromThisWith;
                        return (
                            <React.Fragment key={item.id}>
                                {shouldRenderClone ? (
                                    <li className="react-beatiful-dnd-copy">{item.label}</li>
                                ) : (
                                    <Draggable draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <React.Fragment>
                                                <li
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={snapshot.isDragging ? "dragging" : ""}
                                                >
                                                    {item.label}
                                                </li>
                                            </React.Fragment>
                                        )}
                                    </Draggable>
                                )}
                            </React.Fragment>
                        );
                    })}
                    {provided.placeholder}
                </ul>
            )}
        </Droppable>
    );
}

export default QuestionArea
