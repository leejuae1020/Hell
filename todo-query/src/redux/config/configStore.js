import { createStore } from "redux";
import { combineReducers } from "redux";

import todos from "../modules/todos"; // 모듈 임포트

const rootReducer = combineReducers({
  // combineReducers는 redux에서 Reducer들을 한데 모아 관리하는 모듈
  todos: todos, //todos 모듈과 store 연결
});

const store = createStore(rootReducer);

export default store;
