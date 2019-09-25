import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Router} from "react-router-dom";
import 'react-virtualized/styles.css';

import './App.css';
import history from './history';
import Header from './components/header/header';
import Students from './components/students/students';
import StudentForm from './components/studentForm/studentForm';

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Header />

        <div className="content">
          <Route path="/" component={Students} exact />
          <Route path="/student" component={StudentForm} />
        </div>
      </div>
    </Router>
  );
}

export default App;
