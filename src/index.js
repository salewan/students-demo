import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import faker from 'faker';
import uuid from 'uuid/v1';
import moment from 'moment';

import configureStore from './store';
import {getStudentList, setStudentList} from "./actions/api";
import {RATES} from './static/edu.constants';

function genFakePersonalities() {
  const list = [];
  for (let i = 0; i < 1000; i ++) {
    list.push({
      id: uuid(),
      name: faker.name.findName(),
      born: faker.date.past(),
      rate: RATES[2]
    })

  }
  return list;
}

const initialState = () => {
  let list = getStudentList();
  if (list.length === 0) {
    list = genFakePersonalities();
    setStudentList(list);
  }
  return {students: {list}};
};

ReactDOM.render(
  <Provider store={configureStore(initialState())}>
    <App />
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
