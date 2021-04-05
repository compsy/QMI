import { toPrint } from '../../utils'
import Button from '@material-ui/core/Button'
import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'

export default function RenderQuestionnaireDialog({open, onClose}) {

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitQuestionnaire = () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
            },
            body: JSON.stringify({
                'name': name,
                'content': toPrint(),
                'key': 'uniquekey',
                'title': title,
            }),
        };
        fetch('http://localhost:3002/api/v1/basic_auth_api/questionnaires', options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle>Submit Questionnaire</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    fullWidth
                    margin="dense"
                    label="Username"
                    id="username"
                    value={username}
                    onChange={(e) => {setUsername(e.target.value)}}
                />
                <TextField
                    autoFocus
                    fullWidth
                    margin="dense"
                    label="Password"
                    id="password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                />
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
