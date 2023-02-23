// 기존 코드
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Redux를 사용하기 위해 추가한 코드
import store from "./redux/config/configStore";
import { Provider } from "react-redux"; // Provider는 store가 활용되는 범위를 지정

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <Provider>로 감싸주고, configStore에서 export한 store를 넣어준다.
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
