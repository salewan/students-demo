import {
  DELETE_STUDENT_SUCCESS,
  SAVE_FORM,
  SUBMIT_STUDENT_SUCCESS,
  UPDATE_STUDENT_SUCCESS
} from '../actions/students.action';

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
        list: [...state.list, {...action.values}],
        form: null
      };
    case DELETE_STUDENT_SUCCESS:
      let index = -1;
      for (let i = 0; i < state.list.length; i ++) {
        if (state.list[i].id === action.student.id) {
          index = i;
          break;
        }
      }
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