import React, { useState } from "react";

const useInput = () => {
  // 2. value는 useState로 관리하고,
  const [value, setVlaue] = useState("");

  // 3. Handler 로직도 구현해준다.
  const handler = (e) => {
    setVlaue(e.target.value);
  };

  //1. 이 HOOK은 배열을 반환하는데 [], 첫번째는 value, 두번째는 Handler를 반환한다.
  return [value, handler];
};

export default useInput;
