import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import UserHome from './components/UserHome';
import UserQuestionnaires from './components/UserQuestionnaires';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import history from './components/history';
import NewEdit from './components/NewEdit';

const questionnaire_test = [
  {
    id: "v1",
    type: "checkbox",
    title: 'Waar hadden de belangrijkste gebeurtenissen mee te maken?',
    options: ['hobby/sport', 'werk', 'vriendschap', 'romantische relatie', 'thuis']
  },
  {
    id: "v2",
    type: "checkbox",
    title: 'Waar hadden de belangrijkste gebeurtenissen mee te maken?',
    options: ['hobby/sport', 'werk', 'vriendschap', 'romantische relatie', 'thuis']
  },
  {
    id: "v3",
    type: "radio",
    title: 'Waar hadden de belangrijkste gebeurtenissen mee te maken?',
    options: ['hobby/sport', 'werk', 'vriendschap', 'romantische relatie', 'thuis']
  },
  {
    id: "v4",
    type: "radio",
    title: 'Waar hadden de belangrijkste gebeurtenissen mee te maken?',
    options: ['hobby/sport', 'werk', 'vriendschap', 'romantische relatie', 'thuis']
  },
]

function App() {
  const [questionnaires, setQuestionnaires] = useState([
    {
      id: Math.floor(Math.random()*100),
      title: "person test",
      questions: [
        {id: ":v1", type: ":likert", title: "How are you?", options: ["very good", "good", "ok", "bad", "very bad"]},
        {id: ":v2", type: ":checkbox", title: "Who are you?", options: ["me", "you"]},
        {id: ":v3", type: ":radio", title: "What are you?", options: ["dog", "cat", "human", "chimp"]},
      ],
      scores: []
    },
    {
      id: Math.floor(Math.random()*100),
      title: "person test",
      questions: [
        {id: ":v1", type: ":likert", title: "How are you?", options: ["very good", "good", "ok", "bad", "very bad"]},
        {id: ":v2", type: ":checkbox", title: "Who are you?", options: ["me", "you"]},
        {id: ":v3", type: ":radio", title: "What are you?", options: ["dog", "cat", "human", "chimp"]},
      ],
      scores: []
    }
  ])

  return (
    // <Router history={history}>
    //   <Switch>
    //     <Route exact path="/login" component={LoginForm} />
    //     <PrivateRoute exact path="/" component={UserHome}/>
    //     <PrivateRoute
    //       exact
    //       exact path="/questionnaires"
    //       component={UserQuestionnaires}
    //       questionnaires={questionnaires}
    //       addQuestionnaire={addQuestionnaire}
    //       getQuestionnaire={getQuestionnaire}
    //     />
    //   </Switch>
    // </Router>

    <NewEdit questions={questionnaire_test}/>
  );
}

export default App;
