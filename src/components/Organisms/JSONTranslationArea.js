import {Container} from "@material-ui/core";
import JSONCreator from "../Molecules/JSONCreator";
import React from "react";

export const JSONTranslationArea = () => {
    return (
        <div>
            <Container
                style={{textAlign: "center", margin: "1em auto", marginTop: "100px"}}
                maxWidth="md"
            >
                <JSONCreator/>
            </Container>
        </div>
    )
};
