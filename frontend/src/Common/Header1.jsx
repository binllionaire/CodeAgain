import React from "react";
import { useNavigate } from "react-router-dom";
// MainPage, LoginPage Header
export default function Header1() {
 
  const navigate = useNavigate();
  const email = "";
  const mainPage = (e) => {
    console.log(e);
    navigate("/");
  };
  const resisterPage = (e) => {
    console.log("NAVIGATE TO RESISTER PAGE");
    navigate("/resister", { state: { Email: email } });
  };

  const loginPage = (e) => {
    console.log("NAVIGATE TO LOGIN PAGE");
    navigate("/login");
  };
  return (
    <header>
      <img onClick={mainPage} id="logo" src={process.env.PUBLIC_URL + '/img/logo.png'} width="150px" alt="logo"/>
      <p id="login" onClick={loginPage}>
       로그인
      </p>
      <p id="login" onClick={resisterPage}>
        회원가입
      </p>
     
      <p id="theme">Dark</p>
      <div id="circle"></div>
    </header>
  );
}
