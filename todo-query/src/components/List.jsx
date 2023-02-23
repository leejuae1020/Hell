import React from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate훅 임포
import { getTodos, delTodo, switchTodo } from "../api/todos";
import { useQuery } from "react-query";

function List() {
  const navigate = useNavigate();

  // 버튼이 클릭되면, 변경된 할 일 데이터가 바로 적용되도록 하려면 switchTodo 함수 호출 이후 queryClient.invalidateQueries("todos") 함수를 실행하여 캐시된 todos 데이터를 무효화하면 됩니다. 이렇게 하면 API로부터 새로운 데이터가 가져와지고, 변경된 할 일 데이터가 반영된다
  //리액트 쿼리관련 코드
  const queryClient = useQueryClient();
  const mutaition = useMutation(delTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      console.log("삭제성공");
    },
  });

  const { isLoading, isError, data } = useQuery("todos", getTodos);

  if (isLoading) {
    return <h1>로딩중....이다..</h1>;
  }
  if (isError) {
    return <h1>에러발생했다....</h1>;
  }

  // const onDelete = async (id) => {
  //   delTodo(id);
  //   mutaition.mutate(id);
  // 오류발생코드};

  // delTodo 함수와 onDelete 함수가 모두 API 요청을 보내고 있어서 문제가 발생할 수 있습니다. onDelete 함수에서 delTodo 함수를 호출하여 API 요청을 보내지 말고, useMutation 훅에서 mutateAsync 메소드를 사용하여 새로운 삭제 요청을 해야함
  // 위와 같이 코드를 수정하면, onDelete 함수에서 mutateAsync 메소드를 사용하여 새로운 삭제 요청이 보내지고, useMutation 훅에서 onSuccess 콜백 함수가 실행될 때 새로고침 없이 쿼리가 업데이트됩니다.
  //   useMutation 훅은 두 개의 인자를 받습니다. 첫 번째 인자는 API 요청을 처리하는 함수이고, 두 번째 인자는 객체 형태로 옵션을 설정할 수 있습니다. 현재 코드에서는 onSuccess 옵션을 사용하여 API 요청이 성공적으로 처리되면 실행되는 콜백 함수를 설정해주고 있습니다.
  // mutateAsync 메소드는 mutate 메소드와 동일하지만, 비동기 함수이기 때문에 프로미스를 반환합니다. 이 메소드를 사용하면 새로운 삭제 요청을 보낼 수 있습니다.
  // useMutation 훅을 사용하는 방법은 코드를 더욱 간결하게 만들어주고, API 요청을 더욱 쉽게 관리할 수 있도록 해줍니다. 하지만, useMutation 훅을 사용하지 않고도 API 요청을 보낼 수 있습니다.

  const onDelete = async (id) => {
    try {
      await mutaition.mutateAsync(id);
      console.log("삭제성공");
    } catch (error) {
      console.log(error);
    }
  };

  const onToggle = async (id) => {
    const todo = data.find((todo) => todo.id === id);
    await switchTodo({
      ...todo,
      isDone: !todo.isDone,
    });
    queryClient.invalidateQueries("todos");
  };

  return (
    <StListContainer>
      <h1 style={{ color: "black" }}> 💙You can doit💙</h1>
      <StListBox>
        {data.map((todo) => {
          if (todo.isDone === false) {
            return (
              <StTodoBox key={todo.id}>
                <StDetailBtn onClick={() => navigate(`/detail/${todo.id}`)}>+</StDetailBtn>
                <Tiltle>{todo.title}</Tiltle>
                <Body>{todo.contents}</Body>
                <StBtnBox>
                  <StBtn onClick={() => onDelete(todo.id)}>삭 제</StBtn>
                  <StBtn onClick={() => onToggle(todo.id)}>{todo.isDone ? "취 소" : "완 료"}</StBtn>
                </StBtnBox>
              </StTodoBox>
            );
          } else {
            return null;
          }
        })}
      </StListBox>

      <h1 style={{ marginTop: "70px", color: "black" }}>💙I knew you could do it💙</h1>
      <StListBox>
        {data.map((todo) => {
          if (todo.isDone === true) {
            return (
              <StTodoBox key={todo.id}>
                <StDetailBtn onClick={() => navigate(`/detail/${todo.id}`)}>+</StDetailBtn>
                <Tiltle>{todo.title}</Tiltle>
                <Body>{todo.contents}</Body>
                <StBtnBox>
                  <StBtn onClick={() => onDelete(todo.id)}>삭 제</StBtn>
                  <StBtn onClick={() => onToggle(todo.id)}>{todo.isDone ? "취 소" : "완 료"}</StBtn>
                </StBtnBox>
              </StTodoBox>
            );
          } else {
            return null;
          }
        })}
      </StListBox>
    </StListContainer>
  );
}

export default List;
const StListContainer = styled.div`
  padding: 40px;
`;

const StListBox = styled.div`
  box-sizing: border-box;
  display: flex;
  /* todos들을 여러 행으로 표현 */
  flex-wrap: wrap;
  align-items: center;
  gap: 25px;
`;
const StTodoBox = styled.div`
  width: 300px;
  height: 200px;
  border: none;
  border-radius: 20px;
  // 배경색 투명도 조절
  background-color: rgba(255, 255, 255, 0.332);
  padding: 20px;
`;

const StDetailBtn = styled.button`
  float: right; //버튼 오른쪽상단
  border-radius: 20px;
  border: none;
  padding: 5px 10px;
  width: 90px;
  color: black;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    width: 100px;
  }
`;

const Tiltle = styled.h1`
  color: black;
`;

const Body = styled.p`
  color: black;
  font-size: 1.3rem;
`;

const StBtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
`;
const StBtn = styled.button`
  border-radius: 20px;
  border: none;
  padding: 15px 15px;
  width: 100px;
  cursor: pointer;
  font-size: 1rem;
  &:first-of-type {
    background-color: #bb2f2fc5;
    &:hover {
      font-size: 0.9rem;
    }
  }
  &:nth-of-type(2) {
    background-color: #1a4721b6;
    color: #ffffff;
    &:hover {
      font-size: 0.9rem;
    }
  }
`;
