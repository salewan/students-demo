import uuid from 'uuid/v1';

const STUD = 'student_list';

// utility method extracting students from localStorage
export function getStudentList() {
  return JSON.parse(localStorage.getItem(STUD) || "[]");
}

// utility method to store students in localStorage
export function setStudentList(list) {
  localStorage.setItem(STUD, JSON.stringify(list));
}

export function createStudent(student) {
  const newStudent = {...student, id: uuid()};

  setStudentList([newStudent, ...getStudentList()]);
  return Promise.resolve(newStudent);
}

export function updateStudent(student) {
  const list = getStudentList().map((item) => {
    if (item.id !== student.id) {
      return item
    }

    return {
      ...item,
      ...student
    }
  });
  setStudentList(list);
  return Promise.resolve("OK");
}

export function deleteStudent(student) {
  const list = getStudentList();
  let index = -1;
  for (let i = 0; i < list.length; i ++) {
    if (list[i].id === student.id) {
      index = i;
      break;
    }
  }
  setStudentList([...list.slice(0, index), ...list.slice(index + 1)]);
  return Promise.resolve("OK");
}

export function fetchStudent(id) {
  const students = getStudentList();
  const student = students.find(student => student.id === id);
  return Promise.resolve(student);
}
