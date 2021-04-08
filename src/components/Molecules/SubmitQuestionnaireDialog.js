import { toPrint } from '../../utils'
import SuccessAlert from '../Atoms/Alerts/SuccessAlert'
import ErrorAlert from '../Atoms/Alerts/ErrorAlert'
import Button from '@material-ui/core/Button'
import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'

function handleError(response) {
    if (!response.ok) {
        throw Error(response.statusText)
    }
    return response.json()
}

export default function SubmitQuestionnaireDialog({ open, onClose }) {
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [badLogin, setBadLogin] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const submitQuestionnaire = () => {
        setError(false)
        setBadLogin(false)
        const key = name.toLowerCase().replace(/\s/g, '-')
        console.log(key)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
            },
            body: JSON.stringify({
                'name': name,
                'content': toPrint(),
                'title': title,
                'key': key,
            }),
        }

        fetch('http://app.u-can-act.nl/api/v1/basic_auth_api/questionnaires', options)
            .then(handleError)
            .then(() => {
                setSuccess(true)
                setTimeout(() => {
                    onClose()
                }, 1000)
            })
            .catch((error) => {
                if (error.message === 'Unauthorized') {
                    setBadLogin(true)
                } else {
                    setError(true)
                }
            })
    }

    return (
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby='form-dialog-title'>
                <DialogTitle>Submit Questionnaire</DialogTitle>
                <DialogContent>
                    { success && <SuccessAlert/> }
                    { error && <ErrorAlert/> }
                    <TextField
                        autoFocus
                        fullWidth
                        error={badLogin}
                        helperText={badLogin ? 'Incorrect Login' : false}
                        margin='dense'
                        label='Username'
                        id='username'
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                    />
                    <TextField
                        autoFocus
                        fullWidth
                        error={badLogin}
                        helperText={badLogin ? 'Incorrect Login' : false}
                        margin='dense'
                        label='Password'
                        id='password'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <TextField
                        autoFocus
                        fullWidth
                        margin='dense'
                        label='Name'
                        helperText='Short, descriptive Name'
                        id='name'
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                    <TextField
                        autoFocus
                        fullWidth
                        margin='dense'
                        label='Title'
                        helperText='Long title of questionnaire'
                        id='title'
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color='primary'>
                        Cancel
                    </Button>
                    <Button
                        color='primary'
                        onClick={submitQuestionnaire}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
