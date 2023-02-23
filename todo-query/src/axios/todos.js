//axios 요청이 들어가는 모든 모듈
import axios from "axios";

//조회
const getTodos = async () => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/todos`);
  return response.data;
};

//추가
const addTodo = async (newTodo) => {
  await axios.post(`${process.env.REACT_APP_URL}/todos`, newTodo);
};

//삭제
const removeTodo = async (id) => {
  await axios.delete(`${process.env.REACT_APP_URL}/todos/${id}`);
};

//수정
const switchTodo = async (payload) => {
  await axios.patch(`${process.env.REACT_APP_URL}/todos/${payload.id}`, {
    isDone: payload.isDone,
  });
};

export { getTodos, addTodo, removeTodo, switchTodo };
