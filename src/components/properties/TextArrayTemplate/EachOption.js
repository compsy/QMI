import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Badge, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, makeStyles,} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EachOptionMenu from './EachOptionMenu'
import {removeOption, setTextArrayElement, setTextArrayField,} from '../../../features/question/questionSlice'
import {CLEAN_SUPER_OPTION} from '../../../utils'
import {v4 as uuidv4} from 'uuid'
import EachOptionShows from './EachOptionShows'
import {removeFromMap} from '../../../features/utilities/utilitiesSlice'
import EachOptionHides from './EachOptionHides'

const useStyles = makeStyles((theme) => ({
    boxy: {
        borderRadius: 0,
    },
}));

const EachOption = ({propertyName, index}) => {
    return (
        // <Slide in direction="right">
        <OptionInputField propertyName={propertyName} index={index}/>
        // </Slide>
    )
};

export default EachOption

/* ----- USED IN EachOption BELOW ----- */

const OptionInputField = ({propertyName, index}) => {
    const option = useSelector((state) => state.question[propertyName][index])
    const dispatch = useDispatch()

    // makes sure the options are in object format (unless range type)
    useEffect(() => {
        if (propertyName === 'options' && typeof option === 'string') {
            dispatch(
                setTextArrayElement({
                    property: propertyName,
                    index: index,
                    value: {
                        ...CLEAN_SUPER_OPTION,
                        id: uuidv4(),
                        title: option,
                        shows_questions: [],
                        hides_questions: [],
                    },
                })
            )
        }
    }, [dispatch, index, option, propertyName]);

    const handleChange = (subIndex, event) => {
        if (propertyName === 'options') {
            dispatch(
                setTextArrayElement({
                    property: propertyName,
                    index: subIndex,
                    value: {...option, title: event.target.value},
                })
            )
        } else {
            dispatch(
                setTextArrayField({
                    property: propertyName,
                    index: subIndex,
                    value: event.target.value,
                })
            )
        }
    };

    const classes = useStyles();
    return (
        <FormControl fullWidth required>
            <InputLabel variant="filled" style={{userSelect: 'none'}}>
                {propertyName === 'labels'
                    ? `Label ${index + 1}`
                    : `Option ${index + 1}`}
            </InputLabel>
            <FilledInput
                // required
                className={classes.boxy}
                autoFocus
                autoComplete="off"
                type="text"
                id={`option-${index + 1}`}
                placeholder={
                    propertyName === 'labels'
                        ? 'Enter range label here..'
                        : 'Enter option title here..'
                }
                value={
                    (propertyName === 'labels' ? option : option['title']) || ''
                }
                onChange={(e) => handleChange(index, e)}
                endAdornment={
                    <EndButtons propertyName={propertyName} index={index}/>
                }
            />
        </FormControl>
    )
};

const RemoveButton = ({propertyName, index}) => {
    const dispatch = useDispatch();
    const question = useSelector((state) => state.question);
    const qid = question.id;
    const removeBothFromMap = () => {
        const option = question[propertyName][index];
        const showsQuestions = option.shows_questions;
        const hidesQuestions = option.hides_questions;
        const oid = option.id;
        console.log("qid" + qid);
        if (showsQuestions && showsQuestions.length > 0) {
            for (let i = 0; i < showsQuestions.length; i++) {
                dispatch(
                    removeFromMap({
                        type: 'showsMap',
                        key: showsQuestions[i],
                        value: {qid, oid},
                    })
                )
            }
        }
        if (hidesQuestions && hidesQuestions.length > 0) {
            for (let i = 0; i < hidesQuestions.length; i++) {
                dispatch(
                    removeFromMap({
                        type: 'hidesMap',
                        key: hidesQuestions[i],
                        value: {qid, oid},
                    })
                )
            }
        }
    };
    const handleRemoveOptionClick = (subIndex) => {
        // removeFromMap({
        //     type: 'showsMap',
        //     key: key,
        //     value: { qid: qid, oid: oid },
        // })
        removeBothFromMap();
        dispatch(removeOption({property: propertyName, index: subIndex}))
    };

    return (
        <IconButton data-cy={"delete" + (index + 1)} size="small" onClick={() => handleRemoveOptionClick(index)}>
            <DeleteIcon/>
        </IconButton>
    )
};

const EndButtons = ({propertyName, index}) => {
    const showsQuestions = useSelector(
        (state) => state.question[propertyName][index].shows_questions
    );
    const hidesQuestions = useSelector(
        (state) => state.question[propertyName][index].hides_questions
    );
    const type = useSelector((state) => state.question.type);
    return (
        <InputAdornment position="end">
            {propertyName === 'options' && (
                <>
                    {(type === 'checkbox' || type === 'radio') && (
                        <>
                            <Badge
                                badgeContent={
                                    (showsQuestions && showsQuestions.length) ||
                                    0
                                }
                                color="primary"
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                overlap="circle"
                            >
                                <EachOptionShows index={index}/>
                            </Badge>
                            <Badge
                                badgeContent={
                                    (hidesQuestions && hidesQuestions.length) ||
                                    0
                                }
                                color="primary"
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                overlap="circle"
                            >
                                <EachOptionHides index={index}/>
                            </Badge>
                        </>
                    )}
                    <EachOptionMenu propertyName={propertyName} index={index}/>
                </>
            )}
            <RemoveButton propertyName={propertyName} index={index}/>
        </InputAdornment>
    )
};
