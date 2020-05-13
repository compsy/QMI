import React, { useContext, useEffect } from 'react'
import {
    Button,
    makeStyles,
    Menu,
    MenuItem,
    Grid,
    Checkbox,
    useTheme,
    Typography,
    Box,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {
    addToToDispatch,
    addToMap,
    removeFromMap,
} from '../../../features/utilities/utilitiesSlice'
import { useState } from 'react'
import {
    setProperty,
    setTextArrayElement,
} from '../../../features/question/questionSlice'
import CheckIcon from '@material-ui/icons/Check'

const useStyles = makeStyles((theme) => ({
    showsHidesButtons: {
        transform: 'scale(0.8)',
        // marginLeft: theme.spacing(1),
    },
}))

const EachOptionHides = ({ index }) => {
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    // Access store to get non-hidden questions
    // const shown = store.getState();
    const questions = useSelector((state) => state.questions)
    const qid = useSelector((state) => state.question.id)
    const option = useSelector((state) => state.question.options[index])
    const oid = option.id
    const shown = questions.filter((q) => (q.hidden === false || q.hidden === undefined) && q.id !== qid && q.type !== "raw")
    const hidesQuestions = useSelector(
        (state) => state.question.options[index].hides_questions
    )

    const dispatch = useDispatch()

    const [copy, setCopy] = useState(hidesQuestions ? hidesQuestions : [])

    useEffect(() => {
        dispatch(
            setTextArrayElement({
                property: 'options',
                index: index,
                value: { ...option, hides_questions: copy },
            })
        )
    }, [copy])

    const handleMenuItemClick = (event, key) => {
        if (copy.indexOf(key) > -1) {
            // remove from totodispatch
            // remove from copy
            dispatch(
                removeFromMap({
                    type: 'hidesMap',
                    key: key,
                    value: { qid: qid, oid: oid },
                })
            )
            setCopy(copy.filter((x) => x !== key))
        } else {
            // add to totodispatch
            // add to copy
            dispatch(
                addToMap({
                    type: 'hidesMap',
                    key: key,
                    value: { qid: qid, oid: oid },
                })
            )
            setCopy([...copy, key])
        }
    }

    const classes = useStyles()

    const theme = useTheme()
    return (
        <>
            <Button
                className={classes.showsHidesButtons}
                disableElevation
                size="small"
                // variant="contained"
                variant="outlined"
                onClick={handleClick}
            >
                hide
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                // elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {shown && shown.length > 0 ? (
                    shown.map((item, i) => {
                        const index = questions.indexOf(item)
                        const title = item.title !== undefined ? (
                            item.title.length > 30
                                ? `${item.title.slice(0, 29)}...`
                                : item.title
                        ) : "untitled"
                        const menuItemStyle = {
                            paddingLeft: theme.spacing(1),
                            paddingRight: theme.spacing(3),
                        }
                        return (
                            <MenuItem
                                key={item.id}
                                disableGutters
                                style={menuItemStyle}
                                button={true}
                                onClick={(e) => handleMenuItemClick(e, item.id)}
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <Grid item>
                                        <Checkbox
                                            size="small"
                                            color="primary"
                                            checked={copy.indexOf(item.id) > -1}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography color="primary">
                                            <Box fontWeight="fontWeightBold">
                                                {`v${index + 1}`}
                                            </Box>
                                        </Typography>
                                        {title}
                                    </Grid>
                                </Grid>
                            </MenuItem>
                        )
                    })
                ) : (
                    <NoneMenuItem />
                )}
            </Menu>
        </>
    )
}

export default EachOptionHides

const NoneMenuItem = () => {
    return (
        <MenuItem button={false}>
            <Typography variant="body1">
                <Box fontStyle="italic">None</Box>
            </Typography>
        </MenuItem>
    )
}
