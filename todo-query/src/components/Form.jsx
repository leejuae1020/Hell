import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// import { addTodo } from "../redux/modules/todos"; //액션객체 임포트
import useInput from "../hooks/useInput";
import { addTodo } from "../api/todos";
import { useMutation, useQueryClient } from "react-query";

function Form() {
  // dispatch 생성
  const dispatch = useDispatch();

  //리액트 쿼리 관련코드
  const queryClient = useQueryClient();
  const mutaition = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos"); //무효화
      console.log("성공했냐");
    },
  });

  // input을 통해 들어오는 변화값을 받는 state
  const [todo, setTodo] = useState({
    id: 0,
    title: "",
    contents: "",
    isDone: false,
  });

  //useRef(3) -> 으로 고유id 를 부여해주었다가 중복 발생 됨...
  // id값 주기  승호님이 해결해주심 ㅠㅠㅠ
  const nextId = useSelector((state) => {
    return state.todos[state.todos.length - 1].id + 1;
  });

  // input의 onChange 이벤트 핸들러
  // input 이벤트헨들러
  const onChange = (e) => {
    const { name, value } = e.target;
    // const [title, onChangeTitleHandler] = useInput();
    // const [body, onChangeBodyHandler] = useInput();
    setTodo({ ...todo, [name]: value, id: nextId });
  };

  // form의 onSubmit 이벤트 핸들러. 클릭하면 form에서 나온 변화(명령)를 dispatch에 담아서 올려보낸다!
  // form - onSubmit 이벤트 핸들러.

  const newTodo = {
    title: todo.title,
    contents: todo.contents,
    isDone: false,
  };
  const onSubmit = (e) => {
    e.preventDefault();

    //dispatch에 액션을 담아서 리듀서로 보낸다. 여기서 보낸 값이 액션객체의 payload에 들어감
    // dispatch(addTodo({ ...todo }));

    mutaition.mutate(newTodo);

    setTodo({ id: 0, title: "", contents: "", isDone: false }); //이벤트(클릭)이 끝날 때 초기화-> input창을 빈칸으로 만들어 주는 역할!
  };

  return (
    <StForm onSubmit={onSubmit}>
      <StInputGroup>
        <StLabel>제목</StLabel>
        {/* useState의 객체todo의 title(key)를 value로 가져온다 */}
        <StInput type="text" name="title" value={todo.title} onChange={onChange} required />
        <StLabel>내용</StLabel>
        {/* useState의 객체todo의 body(key)를 value로 가져온다 */}
        <StInput type="text" name="contents" value={todo.contents} onChange={onChange} required />
      </StInputGroup>
      {/* disabled 속성 값으로 !todo.title || !todo.contents를 사용하였습니다. 이것은 todo 객체의 title과 contents 프로퍼티 중 하나라도 falsy 값인 경우 버튼을 비활성화합니다. !todo.title과 !todo.contents는 각각 todo.title과 todo.contents가 falsy 값인 경우 true를 반환합니다. 따라서 두 값 중 하나라도 true인 경우 버튼을 비활성화합니다. 이 경우 required 속성은 필수는 아니지만, 추가적인 보안을 제공하여 사용자의 실수로 인한 오류를 방지하고 폼 유효성 검증을 향상시키는 데 도움이 됩니다.
      required 속성을 사용할 것인지는 개발자의 선택이지만, 웹 애플리케이션에서 사용자의 입력이 필수인 경우 required 속성을 사용하는 것이 좋습니다.
       */}
      <StButton disabled={!todo.title || !todo.contents}>추가하기</StButton>
    </StForm>
  );
}

export default Form;

const StForm = styled.form`
  margin: 20px 40px;
  border: none;
  border-radius: 20px;
  background-color: #ffffff6c;
  display: flex;
  justify-content: space-between;
  height: 90px;
  align-items: center;
  padding: 25px;
  font-size: 25px;
  font-weight: bold;
  color: rgb(0, 0, 0);
`;

const StInputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
`;

const StLabel = styled.label`
  font-size: 1.5rem; //최상위 엘리먼트의 font size의 1.2배 크기
  color: black;
`;
const StButton = styled.button`
  border-radius: 15px;
  border: none;
  background-color: #ffffff97;
  width: 120px;
  height: 50px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.3rem;
  color: black;
  /* 버튼에 마우스 올릴 때 반응 */
  &:hover {
    /* width: 130px;
    border: 1px solid white; */
    color: rgb(255, 255, 255);
    background-color: #057d47df;
  }
`;

const StInput = styled.input`
  box-sizing: border-box;
  border-radius: 20px;
  border: none;
  width: 200px;
  height: 30px;
  color: #ff0000;
  padding-left: 50px;
  /* 첫번째 요소에만 오른쪽 여백 */
  &:first-of-type {
    margin-right: 30px;
    height: 50px;
  }
  /* 두번째 요소의 크기만 증가 */
  &:nth-of-type(2) {
    width: 500px;
    height: 50px;
  }
`;
