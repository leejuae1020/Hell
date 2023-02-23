import React from "react";

// styled-components를 사용하기 위해 import
import styled from "styled-components";

function Header() {
  return (
    <StHeader>
      <Title>Todo List</Title>
    </StHeader>
  );
}
export default Header;

const StHeader = styled.div`
  margin: 0px 40px 10px 40px;
  border: none;
  border-radius: 20px;
  background-color: #ffffff6c;
  display: flex;
  justify-content: center;
  height: 50px;
  align-items: center;
  padding: 20px;
  font-size: 35px;
  font-weight: bold;
  color: rgb(0, 0, 0);
`;

const Title = styled.div`
  margin: 40px;
  padding: 10px;
  color: black;
`;
