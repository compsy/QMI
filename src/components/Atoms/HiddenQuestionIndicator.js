import store from "../../store";
import {Badge} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import React from "react";

export const HiddenQuestionIndicator = ({question, index}) => {
    const utilities = store.getState().utilities;
    return question.hidden ? (
        <Badge
            data-cy={"hiddenBadge" + (index + 1)}
            badgeContent={(utilities.showsMap[question.id] && utilities.showsMap[question.id].length) || 0}
            color="primary"
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            overlap="circle"
        >
            <Tooltip title="This question will be hidden from the user.">
                <IconButton aria-label="This question will be hidden from the user">
                    <VisibilityOffIcon/>
                </IconButton>
            </Tooltip>
        </Badge>
    ) : (
        <Badge
            data-cy={"notHiddenBadge" + (index + 1)}
            badgeContent={(utilities.hidesMap[question.id] && utilities.hidesMap[question.id].length) || 0}
            color="primary"
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            overlap="circle"
        >
            <Tooltip title="This question will be shown to the user.">
                <IconButton aria-label="This question will be shown to the user">
                    <VisibilityIcon/>
                </IconButton>
            </Tooltip>
        </Badge>
    )
};