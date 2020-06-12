[![CircleCI](https://circleci.com/gh/QuestionnaireInterfaceManagement/QMI.svg?style=shield&circle-token=0404cd32f16e9f84c1a7e3e4ee31bc52d0508afa)](https://circleci.com/gh/QuestionnaireInterfaceManagement/QMI) 
[![Netlify Status](https://api.netlify.com/api/v1/badges/809d6385-7c0e-4b49-96d2-a8a4833fb566/deploy-status)](https://app.netlify.com/sites/qmi/deploys)
[![CodeFactor](https://www.codefactor.io/repository/github/questionnaireinterfacemanagement/qmi/badge)](https://www.codefactor.io/repository/github/questionnaireinterfacemanagement/qmi)
 # Questionnaire Managment Interface
 
 ## Table of contents
  * [General info](#general-info)
  * [Screenshots](#screenshots)
  * [Features](#features)
  * [How to run it?](#how-to-run-it)
  * [Status](#status)
  * [Contributing](#contributing)
  * [Contact](#contact)
  * [Redux](#redux)
  * [Testing](#testing)
  * [File structure](#file-structure)

## General info
A questionnaire is a research instrument consisting of a series of questions for the purpose of gathering information from respondents. The goal for this was project to build a front-end interface for the questionnaire engine,that enables users to define their questionnaires. Previously, users would have to edit a JSON format text to create a new questionnaire, which wasn't user friendly at all. 
We have been able to create an elegant and much more user-friendly interface which enables users to create questionnaires by using different question types. For more details on how to get the app started, on what was implemented and more, please refer to the different sections below. 

## How to run it
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

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

At this point, it's important to note that the `id` property for all questions are mapped to `uuid`'s. These ids are then finally post-processed one last time by the final post-processor located in `src/components/JSONCreator.js` to the appropriate `id`'s (v1, v2, ...) before being rendered by the frontend system. Having the `id`'s this way helps us show the correct `id`'s for options with the property `shows_questions` and `hides_questions` (showing hidden/hiding shown question functionality). This also means that the object stored in `state.questions` cannot be used as a valid `questions` object to store in u-can-act's backend (a valid one is the one used in `JSONCreator`).

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

  * **TextAreaTypePreview** with properties (required) : TitleProperty <br/>
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

* `state.questions` contains the current questionnaire being edited by the frontend system

* `state.question` contains the current question being edited by the editdialog (one of the questions in state.questions is loaded into state.question for editing)

* `state.utilities` contains helpers for the frontend. (e.g. helpers for showing hidden/hiding shown question functionality)

## Testing
Testing was essential in this project which is why we went through Static testing, Unit testing, Integration testing and last but not least, End 2 End testing. Our react components share similar behaviour as funtions, instead of writing our code in one large single function, it's a good convention to split the logic into multiple, smaller functions, for each to perform a specific task and therefore make the overall code a lot more readable and easier to understand.
  * Static tests -> [SonarLint](https://www.sonarlint.org) & [ESLint](https://eslint.org) 
  * Unit tests ->  [Enzyme](https://enzymejs.github.io/enzyme/)
  * Integration tests -> [Cypress](https://www.cypress.io)


How to run tests?
  * [SonarLint](https://www.sonarlint.org) & [ESLint](https://eslint.org) -> Can be run through IDE/ Plugin
  * [Enzyme](https://enzymejs.github.io/enzyme/) -> ```npm test```
  * [Cypress](https://www.cypress.io) -> ```cypress open``` (To open cypress dashboard) OR ```cypress run``` (To run all tests)

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

## Compatible browsers
We have tested the application on the following browsers through browserstack:
  * Firefox (version 76)
  * Chrome (version 81)
  * Safari (version 5.1)
  * Opera (version 68)
  
  
## File structure 
  
  ````
📦src
 ┣ 📂components
 ┃ ┣ 📂App Bar
 ┃ ┃ ┣ 📂Navigation Buttons
 ┃ ┃ ┃ ┣ 📜EraseQuestionnaireButton.js           # Button to erase current questionnaire
 ┃ ┃ ┃ ┣ 📜RenderQuestionnaireButton.js          # Button to render current questionnaire 
 ┃ ┃ ┃ ┗ 📜SaveQuestionnaireButton.js            # Button to save current questionnaire 
 ┃ ┃ ┗ 📜AppBarComponent.js                      # This file contains the rendering of the buttons in the app bar
 ┃ ┣ 📂Authentication Dialog                     
 ┃ ┃ ┗ 📜react-auth0-spa.js                      # The API used for Auth0's login mechanism, provided by Auth0
 ┃ ┣ 📂Editor
 ┃ ┃ ┣ 📂Question Buttons
 ┃ ┃ ┃ ┣ 📜DuplicateQuestionButton.js            # Button to duplicate a question
 ┃ ┃ ┃ ┣ 📜EditQuestionButton.js                 # Button to edit a question
 ┃ ┃ ┃ ┗ 📜RemoveQuestionButton.js               # Button to delete a question
 ┃ ┃ ┣ 📂Question Previews
 ┃ ┃ ┃ ┣ 📜DatePickerTypePreview.js              # This file renders the layout of a date question
 ┃ ┃ ┃ ┣ 📜DrawingTypePreview.js                 # This file renders the layout of a drawing question
 ┃ ┃ ┃ ┣ 📜DropdownTypePreview.js                # This file renders the layout of a dropdown question
 ┃ ┃ ┃ ┣ 📜LikertTypePreview.js                  # This file renders the layout of a likert question
 ┃ ┃ ┃ ┣ 📜NumberTypePreview.js                  # This file renders the layout of a number question
 ┃ ┃ ┃ ┣ 📜RadioCheckboxTypePreview.js           # This file renders the layout of a radio/checkbox question
 ┃ ┃ ┃ ┣ 📜RangeTypePreview.js                   # This file renders the layout of a range question
 ┃ ┃ ┃ ┣ 📜RawTypePreview.js                     # This file renders the layout of a raw question
 ┃ ┃ ┃ ┣ 📜TextAreaTypePreview.js                # This file renders the layout of a textarea question
 ┃ ┃ ┃ ┣ 📜TextFieldTypePreview.js               # This file renders the layout of a textfield question
 ┃ ┃ ┃ ┣ 📜TimePickerTypePreview.js              # This file renders the layout of a time question
 ┃ ┃ ┃ ┗ 📜UnsupportedQuestionTypePreview.js     # This file renders the layout of an unsupported question type
 ┃ ┃ ┣ 📜BackToTopArrowButton.js                 # Button to scroll to top of a page
 ┃ ┃ ┣ 📜EditDialogTitle.js                      # The clickable lable for question titles
 ┃ ┃ ┣ 📜EditingFeature.js                       # The edit dialog
 ┃ ┃ ┣ 📜ExpansionRule.js                        # Containing the expansion mechanism for question previews
 ┃ ┃ ┣ 📜HiddenQuestionIndicator.js              # Icon for question preview, showed when a question is set to 'hidden'
 ┃ ┃ ┣ 📜JSONCreator.js                          # Converts the current questions list in an accepted JSON format
 ┃ ┃ ┣ 📜JSONTranslationArea.js                  # Wrapper for JSONCreator.js
 ┃ ┃ ┣ 📜MainPage.js                             # '/': The editor page
 ┃ ┃ ┣ 📜ModeToggle.js                           # Switch for dark/light mode over the app
 ┃ ┃ ┣ 📜QuestionTypes.js                        # Utility for question type toolbar
 ┃ ┃ ┣ 📜QuestionTypesMenu.js                    # Toolbar containing available question types
 ┃ ┃ ┣ 📜QuestionsArea.js                        # Wrapper for questions area
 ┃ ┃ ┣ 📜QuestionsList.js                        # List that renders appropriate question previews depending on the question type
 ┃ ┃ ┣ 📜SaveQuestionnaireDialog.js              # Dialog for saving questionnaires
 ┃ ┃ ┣ 📜RenderQuestionHeaderElements.js         # Function for rendering buttons in a question preview header
 ┃ ┃ ┣ 📜VideoTutorialDialog.js                  # Tutorial pop up
 ┃ ┃ ┣ 📜background.css
 ┃ ┃ ┗ 📜scroll.css
 ┃ ┣ 📂Home Page
 ┃ ┃ ┣ 📜HomePage.js                             # '/home': The home page
 ┃ ┃ ┣ 📜QuestionnaireCard.js                    # A card for showing a questionnaire in the questionnaire list
 ┃ ┃ ┣ 📜QuestionnaireDetails.js                 # Entrypoint for 'right side' of the home page, handling retrieval of a questionnaire
 ┃ ┃ ┣ 📜QuestionnaireDetailsCard.js             # The view for QuestionnaireDetails.js, showing the actual details of a selected questionnaire
 ┃ ┃ ┣ 📜QuestionnaireList.js                    # Entrypoint for 'left side' of the home page, showing available questionnaires 
 ┃ ┃ ┗ 📜QuestionnaireListStatusMessage.js       # Style component for status messages for the questionnaire list
 ┃ ┣ 📂Left Menu Bar
 ┃ ┃ ┣ 📜LeftMenuBar.js                          # Actual left menu bar, with its buttons set
 ┃ ┃ ┣ 📜LeftMenuBarBlueprint.js                 # Skeleton for a left menu bar
 ┃ ┃ ┗ 📜UserCard.js                             # Style component for basic user information, using Auth0
 ┃ ┣ 📂properties
 ┃ ┃ ┣ 📂TextArrayTemplate
 ┃ ┃ ┃ ┣ 📜AddOptionButton.js
 ┃ ┃ ┃ ┣ 📜EachOption.js
 ┃ ┃ ┃ ┣ 📜EachOptionHides.js
 ┃ ┃ ┃ ┣ 📜EachOptionMenu.js
 ┃ ┃ ┃ ┣ 📜EachOptionShows.js
 ┃ ┃ ┃ ┗ 📜TextArrayTemplate.js
 ┃ ┃ ┣ 📜BooleanProperties.js
 ┃ ┃ ┣ 📜BooleanTemplate.js
 ┃ ┃ ┣ 📜DateProperties.js
 ┃ ┃ ┣ 📜DateTemplate.js
 ┃ ┃ ┣ 📜NumericProperties.js
 ┃ ┃ ┣ 📜NumericTemplate.js
 ┃ ┃ ┣ 📜OtherProperties.js
 ┃ ┃ ┣ 📜TextArrayProperties.js
 ┃ ┃ ┣ 📜TextArrayTemplate.js
 ┃ ┃ ┣ 📜TextProperties.js
 ┃ ┃ ┣ 📜TextTemplate.js
 ┃ ┃ ┣ 📜TypeProperty.js
 ┃ ┃ ┗ 📜postprocessor.js
 ┃ ┗ 📜index.css
 ┣ 📂customHooks
 ┃ ┣ 📜useDarkMode.js                            # Configuration for dark mode theme
 ┃ ┗ 📜useDrag.js                                # Configuration for Drag and Drop
 ┣ 📂features
 ┃ ┣ 📂API
 ┃ ┃ ┣ 📜ApiHandler.js                           # Containing API status messages
 ┃ ┃ ┗ 📜auth_config.js                          # Containing variables for Auth0 configuration
 ┃ ┣ 📂State Management                          # Contains Redux state management for...
 ┃ ┃ ┣ 📜questionnaireMetadataSlice.js           # ...Questionnaire metadata for loaded questionnaires (in the editor)
 ┃ ┃ ┣ 📜questionSlice.js                        # ...Question properties for a question opened in the edit dialog
 ┃ ┃ ┣ 📜questionsSlice.js                       # ...The list of current questionnaires
 ┃ ┃ ┗ 📜utilitiesSlice.js                       # ...misc utilities (shows/hides questions)
 ┣ 📂tests
 ┃ ┗ 📂question previews
 ┃ ┃ ┣ 📂__snapshots__
 ┃ ┃ ┃ ┣ 📜CheckboxPreview.test.js.snap
 ┃ ┃ ┃ ┣ 📜DropdownPreview.test.js.snap
 ┃ ┃ ┃ ┣ 📜LikertPreview.test.js.snap
 ┃ ┃ ┃ ┣ 📜NumberPreview.test.js.snap
 ┃ ┃ ┃ ┣ 📜RadioPreview.test.js.snap
 ┃ ┃ ┃ ┣ 📜RangePreview.test.js.snap
 ┃ ┃ ┃ ┣ 📜TextArea.test.js.snap
 ┃ ┃ ┃ ┣ 📜TextField.test.js.snap
 ┃ ┃ ┃ ┗ 📜TimePreview.test.js.snap
 ┃ ┃ ┣ 📜CheckboxPreview.test.js
 ┃ ┃ ┣ 📜DropdownPreview.test.js
 ┃ ┃ ┣ 📜LikertPreview.test.js
 ┃ ┃ ┣ 📜NumberPreview.test.js
 ┃ ┃ ┣ 📜RadioPreview.test.js
 ┃ ┃ ┣ 📜RangePreview.test.js
 ┃ ┃ ┣ 📜TextArea.test.js
 ┃ ┃ ┣ 📜TextField.test.js
 ┃ ┃ ┗ 📜TimePreview.test.js
 ┣ 📂utils
 ┃ ┣ 📜ProcessQuestionnaire.js
 ┃ ┣ 📜formatting_utils.js                       # Global functions used for formatting
 ┃ ┣ 📜history.js                                
 ┃ ┗ 📜index.js                                  # Question configurations
 ┣ 📜App.js                                      # Entrypoint for the web app
 ┣ 📜index.js
 ┣ 📜serviceWorker.js
 ┗ 📜store.js
````
