import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ButtonAppBar from './components/ButtonAppBar';
import LoginForm from './components/LoginForm';
import UserHome from './components/UserHome';
import StickyHeadTable from './components/StickyHeadTable';
import { Container } from '@material-ui/core';
import UserQuestionnaires from './components/UserQuestionnaires';
import EditQuestionnaire from './components/EditQuestionnaire';
import CustomizedDialogs from './components/CustomizedDialogs';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';

import history from './components/history';
import MyQuestionnaires from './components/MyQuestionnaires';
import NewEdit from './components/NewEdit';

const users = [
  {name: "john", password: "lennon", questionnaires: []},
  {name: "paul", password: "mccartney", questionnaires: []},
  {name: "ringo", password: "starr", questionnaires: []},
]

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

  const [users, setUsers] = useState([
      {name: "john", password: "lennon", questionnaires: []},
      {name: "paul", password: "mccartney", questionnaires: []},
      {name: "ringo", password: "starr", questionnaires: []},
    ]);

  const addQuestionnaire = (questionnaire) => {
    // this.setState({
    //   questionnaires: [...this.state.questionnaires, questionnaire]
    // });
    setQuestionnaires([questionnaires ,questionnaire])
  }
  const getQuestionnaire = (id) => {
    // for (let i=0; i<this.state.questionnaires.length; i++) {
    //   if (this.state.questionnaires[i].id === id) {
    //     const x = this.state.questionnaires[i];
    //     return x;
    //   }
    // }
    // return null;
    for (let i=0; i<questionnaires.length; i++) {
      if (questionnaires[i].id === id) {
        const x = questionnaires[i];
        return x;
      }
    }
    return null;
  }
  return (
    // <div className="App">
    //   <EditQuestionnaire/>
    //   <CustomizedDialogs/>
    // </div>

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
    // <EditQuestionnaire />
    <NewEdit questions={questionnaire_test}/>
  );
}

export default App;
