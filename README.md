[![CircleCI](https://circleci.com/gh/QuestionnaireInterfaceManagement/QMI.svg?style=shield&circle-token=0993c29822195c9dc1e8eb414ec02de41201359b)](https://circleci.com/gh/AlexFyod/QMI) 
[![Netlify Status](https://api.netlify.com/api/v1/badges/809d6385-7c0e-4b49-96d2-a8a4833fb566/deploy-status)](https://app.netlify.com/sites/qmi/deploys)
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

* **Editing questions** This feature enables the user to edit any questionnaire which has been previously created. Any corresponding fields to the type can be edited through this feature. 

* **Clickable Title** The title of any questionnaire can be edited by being clicked on.  

* **Dark Mode** The theme of the page can be switched to a darker tone if desired by clciking on the toggle situated at the top right of the page. 

* **Authenticate/Log in** This feature enables the user to log in into the app (or register if needed). By doing this he/she is able to then save his/her current list of questionnaire and come back to it at a later time in order to edit it if needed. 



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


