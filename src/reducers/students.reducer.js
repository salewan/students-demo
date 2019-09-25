import {
  DELETE_STUDENT_SUCCESS,
  SAVE_FORM,
  SUBMIT_STUDENT_SUCCESS,
  UPDATE_STUDENT_SUCCESS
} from '../actions/students.action';


function indexOf(list, id) {
  for (let i = 0; i < list.length; i ++) {
    if (list[i].id === id) {
      return i;
    }
  }
  return -1;
}

export default (state = {}, action) => {
  switch (action.type) {
    case SAVE_FORM:
      return {
        ...state,
        form: action.values
      };
    case SUBMIT_STUDENT_SUCCESS:
      return {
        ...state,
        list: [{...action.values}, ...state.list],
        form: null
      };
    case DELETE_STUDENT_SUCCESS:
      const index = indexOf(state.list, action.student.id);
      return {
        ...state,
        list: [...state.list.slice(0, index), ...state.list.slice(index + 1)]
      };
    case UPDATE_STUDENT_SUCCESS:
      const list = state.list.map((item) => {
        if (item.id !== action.student.id) {
          return item
        }

        return {
          ...item,
          ...action.student
        }
      });

      return {
        ...state,
        list
      };
    default:
      return state
  }
}