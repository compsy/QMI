import {Container} from "@material-ui/core";
import StringifiedJSONCard from "./components/StringifiedJSONCard";
import React from "react";

export const TopSection = () => {
    return (
        <div>
            <Container
                style={{textAlign: "center", margin: "1em auto", marginTop: "100px"}}
                maxWidth="md"
            >
                <StringifiedJSONCard/>
            </Container>
        </div>
    )
};