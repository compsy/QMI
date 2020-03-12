import React, { useState } from "react";
import { List, arrayMove } from "react-movable";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import ButtonAppBar from "./ButtonAppBar";
import RadioTemplate from "./templates/RadioTemplate";
import CheckboxTemplate from "./templates/CheckboxTemplate";

function NewEdit({ questions }) {
  return (
    <Container>
      <ButtonAppBar />
      <ReorderableQuestions questions={questions} />
      <Fab
        style={{ position: "fixed", bottom: 50, right: 50, zIndex: 999 }}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </Container>
  );
}

const ReorderableQuestions = props => {
  const [items, setItems] = useState(props.questions);

  return (
    <Container maxWidth="sm">
      <List
        values={items}
        onChange={({ oldIndex, newIndex }) =>
          setItems(arrayMove(items, oldIndex, newIndex))
        }
        renderList={({ children, props, isDragged }) => (
          <ul
            {...props}
            style={{ padding: 0, cursor: isDragged ? "grabbing" : undefined }}
          >
            {children}
          </ul>
        )}
        renderItem={({ value, props, isDragged, isSelected }) => (
          <li
            {...props}
            style={{
              ...props.style,
              padding: "0 0",
              // padding: "1.5em",
              margin: "1em 0em",
              // margin: "0.5em 0em",
              listStyleType: "none",
              cursor: isDragged ? "grabbing" : "grab",
              textAlign: "center"
            }}
          >
            {(() => {
              switch (value.type) {
                case "radio":
                  return (
                    <RadioTemplate
                      question={value}
                      items={items}
                      setItems={setItems}
                    />
                  );
                case "checkbox":
                  return (
                    <CheckboxTemplate
                      question={value}
                      items={items}
                      setItems={setItems}
                    />
                  );
                default:
                  return null;
              }
            })()}
          </li>
        )}
      />
      <button onClick={() => console.log(JSON.stringify(items))}>
        click me (and check console)
      </button>
    </Container>
  );
};

export default NewEdit;
