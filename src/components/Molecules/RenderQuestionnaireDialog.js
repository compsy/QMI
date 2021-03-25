import { toPrint } from '../../utils'
import Button from '@material-ui/core/Button'
import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, TextField } from '@material-ui/core'

export default function RenderQuestionnaireDialog({open, onClose}) {

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');

    const submitQuestionnaire = () => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            Authorization: 'Bearer my-token',
            body: {
                'name': name,
                'content': JSON.stringify(toPrint()),
                'key': '',
                'title': title,
            },
        };
        fetch('http://localhost:3002/basic_auth_api/questionnaires', options)
            .then(response => response.json())
            .then(data => {
                window.open(data.url);
            })
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogContent>
                <TextField
                    autoFocus
                    fullWidth
                    margin="dense"
                    label="Name"
                    id="name"
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}
                />
                <TextField
                    autoFocus
                    fullWidth
                    margin="dense"
                    label="Title"
                    id="title"
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    color="primary"
                    onClick={submitQuestionnaire}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}
