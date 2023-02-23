import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Detail() {
  const param = useParams();
  const navigate = useNavigate();

  // 제이슨 서버에서 제공하는 todos 데이터를 가져오기 위해서 axios 모듈을 이용해서 API 요청을 보내야 합니다. 현재 axios 모듈을 사용할 수 있는 코드는 주어졌으므로, 이를 이용해서 Detail 페이지에서 todos 데이터를 가져오면 됩니다....

  // 서버에서 받아온 데이터를 저장할 useState
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    // API 요청을 보낼 함수
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/todos/${param.id}`);
        setTodo(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodo();
  }, [param.id]);

  return (
    <StDetailContainer>
      <StDetailBox>
        <StHeadContainer>
          <h3>ID - {param.id}</h3>
          <StButton onClick={() => navigate("/")}>🏠</StButton>
        </StHeadContainer>

        {todo && (
          <StTodoDescBox>
            <h1>{todo.title}</h1>
            <p>{todo.contents}</p>
          </StTodoDescBox>
        )}
      </StDetailBox>
    </StDetailContainer>
  );
}

export default Detail;

const StDetailContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.01)),
    url("https://i.pinimg.com/originals/a2/08/8e/a2088ec5ed675c888e079cdeb6117f30.jpg");
  background-position: center;
  background-size: cover;
`;

const StDetailBox = styled.div`
  border: none;
  border-radius: 20px;
  background-color: white;
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const StHeadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > h3 {
    color: black;
  }
`;
const StButton = styled.button`
  display: inline-block;
  border: none;
  border-radius: 20px;
  background-color: #cee5fb;
  font-size: 1.3em;
  width: 100px;
  height: 40px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    font-size: 1.7rem;
  }
`;

const StTodoDescBox = styled.div`
  & > h1,
  p {
    color: #000000;
  }
`;
