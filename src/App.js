import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import 'react-virtualized/styles.css';

import './App.css';
import Header from './components/header/header';
import Students from './components/students/students';
import StudentForm from './components/studentForm/studentForm';

function App() {
  return (
    <Router>
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
