import TextField from "@material-ui/core/TextField";
import React, {useState} from "react";

const NumberPreview = ({ question }) => {

    const [inputtedNumber, setValue] = useState('');

    return (
        <div >
            <form>
                <TextField
                    id = "number"
                    label = {question.placeholder}
                    type = "number"
                    min = {question.min}
                    max = {question.max}
                    onInput = {(e) =>{
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0,question.maxlength)
                    }}
                    required = {question.required}
                    value={inputtedNumber}
                    onChange={(e) => setValue(e.target.value)}
                    error = {inputtedNumber < question.min || inputtedNumber > question.max}
                />
            </form>
        </div>
    );
};


export default NumberPreview;
