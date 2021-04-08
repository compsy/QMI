import React from 'react'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import CloseIcon from '@material-ui/icons/Close'
import makeStyles from '@material-ui/core/styles/makeStyles'

export default function TransitionAlerts(open) {
    return (
        <Alert
            severity='error'
        >
            Server Error! Please try again later
        </Alert>
    )
}
