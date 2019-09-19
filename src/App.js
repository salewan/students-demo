import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'react-virtualized/styles.css';

import './App.css';
import Header from './components/header/header';
import Students from './components/students/students';

function App() {
  return (
    <Router>
      <div>
        <Header />

        <div className="App">
          <Route path="/" component={Students} />
        </div>
      </div>
    </Router>
  );
}

export default App;
