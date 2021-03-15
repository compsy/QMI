import React, {useEffect, useState} from 'react'
import {Box, Button, Checkbox, Grid, makeStyles, Menu, MenuItem, Typography, useTheme,} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import {addToMap, removeFromMap} from '../../../features/State Management/utilitiesSlice'
import {setTextArrayElement,} from '../../../features/State Management/questionSlice'

const useStyles = makeStyles((theme) => ({
    showsHidesButtons: {
        transform: 'scale(0.8)',
        // marginLeft: theme.spacing(1),
    },
}))

const EachOptionShows = ({index}) => {
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
    const hidden = questions.filter((q) => q.hidden === true && q.id !== qid && q.type !== "raw");
    const showsQuestions = useSelector(
        (state) => state.question.options[index].shows_questions
    )

    const dispatch = useDispatch()

    const [copy, setCopy] = useState(showsQuestions ? showsQuestions : [])

    useEffect(() => {
        dispatch(
            setTextArrayElement({
                property: 'options',
                index: index,
                value: {...option, shows_questions: copy},
            })
        )
    }, [copy])

    const handleMenuItemClick = (event, key) => {
        if (copy.indexOf(key) > -1) {
            // remove from totodispatch
            // remove from copy
            dispatch(
                removeFromMap({
                    type: 'showsMap',
                    key: key,
                    value: {qid: qid, oid: oid},
                })
            )
            setCopy(copy.filter((x) => x !== key))
        } else {
            // add to totodispatch
            // add to copy
            dispatch(
                addToMap({
                    type: 'showsMap',
                    key: key,
                    value: {qid: qid, oid: oid},
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
                show
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
                {hidden && hidden.length > 0 ? (
                    hidden.map((item, i) => {
                        const subIndex = questions.indexOf(item)
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
                                                {`v${subIndex + 1}`}
                                            </Box>
                                        </Typography>
                                        {title}
                                    </Grid>
                                </Grid>
                            </MenuItem>
                        )
                    })
                ) : (
                    <NoneMenuItem/>
                )}
            </Menu>
        </>
    )
}

export default EachOptionShows

const NoneMenuItem = () => {
    return (
        <MenuItem button={false}>
            <Typography variant="body1">
                <Box fontStyle="italic">None</Box>
            </Typography>
        </MenuItem>
    )
}
