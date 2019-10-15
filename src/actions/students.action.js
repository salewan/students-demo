import history from '../history';
import * as api from './api';

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

    if (!values.id) {
      const newStudent = await api.createStudent({...values});
      dispatch({
        type: SUBMIT_STUDENT_SUCCESS,
        values: {...newStudent}
      });

    } else {
      await api.updateStudent({...values});
      dispatch({
        type: UPDATE_STUDENT_SUCCESS,
        student: {...values}
      })
    }

    history.push('/');
  }
}

export function deleteStudent(student) {
  return async dispatch => {
    await sleep(500);
    await api.deleteStudent({...student});
    dispatch({
      type: DELETE_STUDENT_SUCCESS,
      student
    });
  }
}

export function editStudent(id) {
  return async dispatch => {
    const student = await api.fetchStudent(id);
    if (student && student.id === id) {
      dispatch({
        type: SAVE_FORM,
        values: student
      });
    }
  }
}

// this action clears the student form and then forward you to the form's page
export function addStudent() {
  return dispatch => {
    dispatch({
      type: SAVE_FORM,
      values: null
    });

    history.push('/student');
  }
}
