[![CircleCI](https://circleci.com/gh/AlexFyod/QMI.svg?style=shield&circle-token=0404cd32f16e9f84c1a7e3e4ee31bc52d0508afa)](https://circleci.com/gh/AlexFyod/QMI) 
[![Netlify Status](https://api.netlify.com/api/v1/badges/434fd58f-4250-47a2-b6ce-abf995ad02aa/deploy-status)](https://app.netlify.com/sites/qmi/deploys)
 # Questionnaire Managment Interface
 
 ## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Features](#features)
* [How to run it?](#how-to-run-it)
* [Status](#status)
* [Contributing](#contributing)
* [Contact](#contact)


## General info
blah blah
	

## How to run it?
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


## Features
* **Drag and Drop**
This feature enables the user select a questionnaire type from the right sidebar, drag it along to the questionnaire section and release the mouse to place inside the questionnaire section. We have implemented this functionality by using the {Draggable} hook from "react-beautiful-dnd";

* **Duplicating questions** This feature enables the user to duplicate a current questionnaire with all of it's properties and add it at the end of the list which contains all the current questionnaires. The way this feature was implemented was mainly through the following piece of code which can be found in `questionnaireReducer.js`: 
```
const duplicateQuestion = (action, state) => {
    return [
        ...state, {
            ...action.question,
            id: uuid()
        }];
};
```

* **Editing questions** This feature enables the user to edit any question which has been previously created. Any corresponding fields to the type can be edited through this feature.

### A question is loaded into `state.question`

Every time the EditDialog is opened, `state.question` is initialized as:
```
state.question = {
	id: undefined,
	type: undefined,
	title: undefined,
	tooltip: undefined,
	options: [],
	labels: [],
	required: undefined,
	hidden: undefined,
	// ...union of all properties from all types mapped to undefined ([] if array type)
	...question // the original question as it is in state.questions
}
```
Storing `state.question` this way allows us to continuously switch between question types (checkbox, radio, raw, etc...) while editing the question in `state.question` using the EditDialog. Edited properties also persist between type changes this way, until the question editor dialog is exited by cancellation or submission.

### At form submission (save edited question)

The object in `state.question` at the point of submission, will contain properties undefined for the final question type. We process `state.question` and remove the unwanted properties using the post-processor located in `src/components/properties/postprocessor.js`. Then, we replace the original question in `state.questions` with the post-processed edited question.

At this point, it's important to note that the `id` property for all questions are mapped to `uuid`'s. These ids are then finally post-processed one last time by the final post-processor located in `src/components/StringifiedJSONCard.js` to the appropriate `id`'s (v1, v2, ...) before being rendered by the frontend system. Having the `id`'s this way helps us show the correct `id`'s for options with the property `shows_questions` and `hides_questions` (showing hidden/hiding shown question functionality). This also means that the object stored in `state.questions` cannot be used as a valid `questions` object to store in u-can-act's backend (a valid one is the one used in `StringifiedJSONCard`).

### “Shows/hides” functionality - scenarios (and what to do at each case)

* **Clickable Title** The title of any current question can be edited by being clicked on.  

* **Dark Mode** The theme of the page can be switched to a darker tone if desired by clciking on the toggle situated at the top right of the page. 

* **Authenticate/Log in** This feature enables the user to log in into the app (or register if needed). By doing this he/she is able to then save his/her current list of questionnaire and come back to it at a later time in order to edit it if needed. 

## Available question types (in the latest version) and their respective properties 

* **Radio** with properties (required) : TitleProperty, TextOptionsProperty <br/>
 (optionalProperties) : HiddenRequiredComposite, SectionStartProperty, SectionEndProperty, TooltipProperty, OtherwiseProperty 

* **Checkbox** with properties (required) : TitleProperty, TextOptionsProperty <br/>
(optionalProperties) : HiddenRequiredComposite, SectionStartProperty, SectionEndProperty, TooltipProperty, OtherwiseProperty 

* **Likert** with properties (required) : TitleProperty, TextOptionsProperty <br/>
(optionalProperties) : HiddenProperty, SectionStartProperty, SectionEndProperty, TooltipProperty

* **Range** with properties (required) : TitleProperty, LabelOptionsProperty <br/>
(optionalProperties) : HiddenProperty, SectionStartProperty, SectionEndProperty, TooltipProperty, CustomMinMaxStepProperty

* **Raw** with properties (required) : ContentProperty <br/>
(optionalProperties) : SectionStartProperty, SectionEndProperty

* **TextArea** with properties (required) : TitleProperty <br/>
(optionalProperties) : HiddenProperty, SectionStartProperty, SectionEndProperty, TooltipProperty, PlaceholderProperty


* **Textfield** with properties (required) : TitleProperty <br/>
(optionalProperties) : HiddenProperty, SectionStartProperty, TooltipProperty, SectionEndProperty, PlaceholderProperty, DefaultTextValueProperty, PatternProperty, HintProperty

* **Number** with properties (required) : TitleProperty <br/>
(optionalProperties) :  HiddenRequiredComposite, SectionStartProperty, SectionEndProperty, TooltipProperty, NumberTypeComposite, PlaceholderProperty, LinksToExpandableProperty

* **Time** with properties (required) : TitleProperty <br/>
(optionalProperties) : HoursCompositeProperty, HoursLabelProperty, MinutesLabelProperty

* **Date** with properties (required) : TitleProperty <br/>
(optionalProperties) : HiddenRequiredComposite, SectionStartProperty, SectionEndProperty, TooltipProperty, MinDateProperty, MaxDateProperty, PlaceholderProperty, TodayProperty, DefaultDateProperty

* **Dropdown** with properties (required) : TitleProperty, TextOptionsProperty <br/>
(optionalProperties) : HiddenProperty, SectionStartProperty, SectionEndProperty, TooltipProperty, LabelProperty

* **Drawing** with properties (required) : TitleProperty, WidthHeightComposite, ImageProperty, ColorProperty, <br/>
(optionalProperties) : HiddenProperty, SectionStartProperty, SectionEndProperty, TooltipProperty, RadiusDensityComposite

## Redux
Our react components share similar behaviour as funtions, instead of writing our code in one large single function, it's a good convention to split the logic into multiple, smaller functions, for each to perform a specific task and therefore make the overall code a lot more readable and easier to understand.

We can apply this logic to large React components which handle different requests and have different purpose, which splits these components into smaller ones. We would usually have "container" components which are responsible for retrieving data and displaying corresponding information to the user based on information they have received through props. 

We also use the [react-redux](https://github.com/reduxjs/react-redux) library and Redux’s own [redux-toolkit](https://github.com/reduxjs/redux-toolkit) library.

[react-redux](https://github.com/reduxjs/react-redux) allows us to easily access Redux state and dispatch actions using React.

[redux-toolkit](https://github.com/reduxjs/redux-toolkit) is used to simplify the reducers, actions, and action creators into a single file for each “slice” of state (e.g. state.*slice*). It also allows us to handle API calls to [u-can-act](https://github.com/compsy/u-can-act)’s backend. For the current size of the system, we found that this was an efficient way to organize the "business logic" of the application. In the case that the application gets bigger, this can be converted to using "normal" Redux to connect supply state to a component. (using react-redux connect, mapStateToProps, mapDispatchToProps, separate action and action creators, etc.)

The main Redux store state is `state = { questions, question, utilities }`

- `state.questions` contains the current questionnaire being edited by the frontend system

- `state.question` contains the current question being edited by the editdialog (one of the questions in state.questions is loaded into state.question for editing)

- `state.utilities` contains helpers for the frontend. (e.g. helpers for showing hidden/hiding shown question functionality)

## Compatible browsers
We have tested the application on the following browsers through browserstack:
* Firefox (version 76)
* Chrome (version 81)
* Safari (version 5.1)
* Opera (version 68)


## Status
Project is: **In progress**

## Contributing
Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits.

1. Fork it: git clone https://github.com/AlexFyod/QMI.git
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request

## Contact
1. [Pal Poshyachinda](404)
2. [Mahir Hiro](https://github.com/mahirhiro)
3. [Krishan Jokhan](https://github.com/kanadev-az)
4. [Hleb Shmak](https://github.com/HNaida)
5. [Robert Rey](https://github.com/reyrobs)


