//axios 요청 들어가는 모든 모듈

import { getAllByText } from "@testing-library/react";
import axios from "axios";

//조회
const getTodos = async () => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/todos`);
  console.log(response.data);
  return response.data;
};

//추가
const addTodo = async (newTodo) => {
  await axios.post(`${process.env.REACT_APP_URL}/todos`, newTodo);
};

//삭제

const delTodo = async (id) => {
  await axios.delete(`${process.env.REACT_APP_URL}/todos/${id}`);
};

//변경

const switchTodo = async (payload) => {
  await axios.patch(`${process.env.REACT_APP_URL}/todos/${payload.id}`, {
    isDone: payload.isDone,
  });
};

export { getTodos, addTodo, delTodo, switchTodo };
