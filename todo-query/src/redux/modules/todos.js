// Action value
const ADD_TODO = "todos/ADD_TODO";
const DELETE_TODO = "todos/DELETE_TODO";
const UPDATE_TODO = "todos/UPDATE_TODO";

// Action Creator
// Todo를 추가하는 action creator
export const addTodo = (payload) => {
  // 콘솔 어디에?
  return {
    type: ADD_TODO,
    payload,
  };
};

// Todo를 삭제하는 action creator
export const deleteTodo = (payload) => {
  return {
    type: DELETE_TODO,
    payload,
  };
};

// Todo의 isDone을 변경해주는 action creator
export const updateTodo = (payload) => {
  return {
    type: UPDATE_TODO,
    payload,
  };
};

// 초기값
const initialState = [
  { id: 1, title: "", contents: "", isDone: false },
  { id: 2, title: "", contents: "", isDone: true },
];

// Reducer: todos
const todos = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      // 기존 state를 복제해서 그 뒤에 새로운 객체를 추가해준다.
      const newTodo = [...state, action.payload];
      return newTodo;

    case DELETE_TODO:
      // filter를 통해 id가 일치하는 내용들을 삭제!
      const remainedTodo = state.filter((todo) => todo.id !== action.payload);
      return remainedTodo;
    // return state.filter(todo => (todo.id !== action.payload)) //0803에러발견> 아이템을 삭제 후 새로운 내용을 추가하면 id가 3으로 초기화

    case UPDATE_TODO:
      const updatedTodo = state.map((todo) => {
        if (todo.id === action.payload) {
          // id가 일치하는 곳에서
          return { ...todo, isDone: !todo.isDone }; //isDone의 값을 반대로(false->true or true->false) 바꿔주는 로직 구현
          // 마찬가지로 객체의 불변성을 지켜줘야 되니까 전개연산자(...)를 이용해 기존 내용을 복사해서 사용
        } else {
          // id가 일치하지 않는다면? 그냥 그대로...
          return { ...todo };
        }
      });
      return updatedTodo;

    default:
      return state;
  }
};

// 모듈에서 reducer를 export default
export default todos;
