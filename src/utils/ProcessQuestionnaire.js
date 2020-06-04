/**
 * This function processes all the questions with respect to
 * show/hide property
 *
 * @param idMap maps ids of the questions
 * @param toProcessOption show or hide option to process
 */
const processShowHideOption = (idMap, toProcessOption) => {
    if (toProcessOption !== undefined && toProcessOption.length > 0) {
        for (let k=0; k<toProcessOption.length; k++) {
            toProcessOption[k] = idMap[toProcessOption[k]]
        }
    } else {
        if (toProcessOption !== undefined && toProcessOption.length === 0) {
            toProcessOption = undefined
        }
    }
}

/**
 * Process the questionnaire using @processShowHideOption hook
 *
 * @param questions in questionnaire
 * @returns processed questionnaire
 */
const processQuestionnaire = (questions) => {
    let toProcess = JSON.parse(JSON.stringify(questions))
    let idMap = {};
    let count = 0;
    // idMap generation
    for (let i = 0; i < questions.length; i++) {
        if (questions[i].type === "raw") {
            count++;
            idMap = {...idMap, [questions[i].id]: undefined}
            toProcess[i].id = undefined
        } else {
            idMap = {...idMap, [questions[i].id]: `v${i + 1 - count}`}
            toProcess[i].id = `v${i + 1 - count}`
        }
    }
    for (let i=0; i<toProcess.length; i++) {
        if (toProcess[i].options !== undefined && toProcess[i].options.length > 0) {
            for (let j=0; j<toProcess[i].options.length; j++) {
                toProcess[i].options[j] = typeof toProcess[i].options[j] === "string" ? toProcess[i].options[j] : {...toProcess[i].options[j], id: undefined};
                processShowHideOption(idMap, toProcess[i].options[j].shows_questions);
                processShowHideOption(idMap, toProcess[i].options[j].hides_questions);
            }
        }
    }
    return toProcess;
}

export default processQuestionnaire;