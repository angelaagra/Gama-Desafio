import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Contato from '../src/Contato/contato';
import Home from './Home/home'
import Form from './Form/form'
import {
  BrowserRouter as Router,
  Switch,
  Route, 
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router >
     <Switch>
       <Route exact path="/">
         <Home />
       </Route>
       <Route exact path="/bancodecurriculos">
         <Form />
       </Route>
       <Route path="/contato">
         <Contato />
       </Route>
     </Switch>
    </Router>
     
  </React.StrictMode>,
  document.getElementById('root')
);

