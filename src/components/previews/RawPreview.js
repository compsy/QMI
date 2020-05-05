import React from "react";
import ReactHtmlParser from 'react-html-parser';

const NumberPreview = ({ question }) => {
    return (
        <div title={question.title}>
            <form>
                { ReactHtmlParser (question.content) }
            </form>
        </div>
    );
};


export default NumberPreview;