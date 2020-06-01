import {Draggable, Droppable} from "react-beautiful-dnd";
import React from "react";

function BoxArea(props) {
    return (
        <Droppable droppableId="BAG">
            {(provided, snapshot) => (
                <ul ref={provided.innerRef} id={"dropzone"} className="shopping-bag">
                    {props.items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(subProvided) => (
                                <li
                                    ref={subProvided.innerRef}
                                    {...subProvided.draggableProps}
                                    {...subProvided.dragHandleProps}
                                    style={subProvided.draggableProps.style}
                                >
                                    {item.label}
                                </li>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </ul>
            )}
        </Droppable>
    );
}

export default BoxArea
