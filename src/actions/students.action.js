import uuid from 'uuid/v1';
import history from '../history';

export const SAVE_FORM = 'SAVE_FORM';
export const SUBMIT_STUDENT_SUCCESS = 'SUBMIT_STUDENT_SUCCESS';
export const DELETE_STUDENT_SUCCESS = 'DELETE_STUDENT_SUCCESS';
export const UPDATE_STUDENT_SUCCESS = 'UPDATE_STUDENT_SUCCESS';

export function saveForm(values) {
  return {
    type: SAVE_FORM,
    values
  }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export function submitResults(values) {

  return async dispatch => {
    await sleep(500);
    dispatch({
      type: SUBMIT_STUDENT_SUCCESS,
      values: {...values, id: uuid()}
    });

    history.push('/');
  }
}

export function deleteStudent(student) {
  return async dispatch => {
    await sleep(500);
    dispatch({
      type: DELETE_STUDENT_SUCCESS,
      student
    });
  }
}

export function editStudent({rowData: student}) {
  return async dispatch => {
    dispatch({
      type: SAVE_FORM,
      values: student
    });

    history.push('/student');
  }
}

export function addStudent() {
  return dispatch => {
    dispatch({
      type: SAVE_FORM,
      values: null
    });

    history.push('/student');
  }
}