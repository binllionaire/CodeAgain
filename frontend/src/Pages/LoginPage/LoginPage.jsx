import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header4 from "../../Common/Header4";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginForm;
  const [isloginFailed, setIsLoginFailed] = useState(false)
  const onEmailChange = (e) => {
    setLoginForm({ ...loginForm, email: e.target.value });
  };

  const onPasswordChange = (e) => {
    setLoginForm({ ...loginForm, password: e.target.value });
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      loginBtnClick()
    }
  };
  const loginBtnClick = (e) => {
    axios
      .post(
        "https://codeagain.kro.kr/api/login",
        { email: email, password: password },
        {
          headers: {
            "Content-Type": `application/json`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          localStorage.setItem("access_token", res.data.data.accessToken);
          localStorage.setItem("refresh_token", res.data.data.refreshToken);
          navigate("/review");
        }
        
      })
      .catch((err) => {
        setIsLoginFailed(true)
        console.log(isloginFailed)
      })
  };

  return (
    <div className="LoginPage">
      <Header4 />

      <div id="main">
        <p id="title">로그인</p>
        <p className="subTitle">이메일</p>
        <input onChange={onEmailChange} onKeyPress={handleKeyPress} type="text" placeholder="" id="email" />
        <p className="subTitle">비밀번호</p>
        <input onChange={onPasswordChange} onKeyPress={handleKeyPress} type="password" placeholder="" id="pw" />
        <p id="errorMessage">{isloginFailed ? "아이디 또는 비밀번호를 잘못 입력했습니다." : ""}</p>
        <button id="join" onClick={loginBtnClick}>
          로그인
        </button>
        {/** 
        <button id="google">
          <img id="googleIcon" src="../img/google.png" width="30px"></img>
          <p id="googleP">구글 계정으로 로그인</p>
        </button>
        */}
      </div>
      <style jsx>{`
      #errorMessage {
          background: none;
          font-size: 13px;
          margin-top: 10px;
          margin-left: 55px;
          color: #ffb400;
        }
        body {
          margin-left: 0px;
        }
        .LoginPage {
          background-image: url("../../img/background.png");
          background-size: 110%;
          background-repeat: no-repeat;
          background-position: center top;
          padding-bottom: 200px;
        }
        #google {
          display: block;
          background-color: transparent;
          color: white;
          height: 40px;
          width: 80%;
          line-height: 40px;
          text-align: center;
          margin: 50px auto 50px auto;
          border: 1px solid #808080;
        }
        #googleIcon {
          background: none;
          float: left;
          margin-top: 2px;
        }
        #googleP {
          display: inline-block;
          background: none;
          margin: 0px;
        }
        input {
          outline: none;
          color: #d9d9d9;
        }
        * {
        font-family: 'Pretendard-Regular';
          background-color: #343a40;
        }
        #logo {
          position: relative;
          margin-left: 5px;
          background: none;
          z-index: 100;
          display: inline-block;
          cursor: pointer;
        }
        #circle {
          margin-top: 10px;
          display: block;
          background-color: black;
          float: right;
          margin-right: 5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        header {
          padding: 10px;
          background: none;
        }
        #theme {
          display: block;
          float: right;
          color: #d9d9d9;
          font-size: 10px;
          margin-right: 10px;
        }

        #login {
          margin-top: 5px;
          display: block;
          float: right;
          right: 0px;
          display: block;
          color: #d9d9d9;
          font-size: 20px;
          cursor: pointer;
          margin-left: 10px;
        }
        #main {
          position: relative;
          display: block;
          margin: 50px auto 0 auto;
          width: 550px;
          height: 410px;
          background-color: #212529;
          border-radius: 10px;
        }

        
        input {
          position: relative;
          z-index: 2;
          margin-bottom: 10px;
          margin-left: 50px;
          background-color: #343a40;
          border: none;
          width: 80%;
          height: 40px;
          border-radius: 2px;
          padding-left: 10px;
        }
        #join {
          border: none;
          color: #d9d9d9;
          border-radius: 2px;
          display: block;
          text-align: center;
          background-color: #808080;
          margin: 10px auto auto auto;
          height: 40px;
          width: 40%;
          font-size: 16px;
          cursor: pointer;
        }
        .back {
          font-family: "Rubik", sans-serif;
          font-weight: 900;
          position: absolute;
          color: #212529;
          font-size: 100px;
          z-index: 0;
          opacity: 60%;
        }
        #b1 {
          left: 50px;
          top: -45px;
          line-height: 0px;
          transform: rotate(-27deg);
        }
        #b2 {
          left: 350px;
          top: 230px;
          line-height: 0px;
          transform: rotate(20deg);
        }
        #b3 {
          right: 350px;
          top: -60px;
          line-height: 0px;
          transform: rotate(-27deg);
        }
        #b4 {
          right: -20px;
          top: 100px;
          line-height: 0px;
          transform: rotate(-10deg);
        }
        #b5 {
          left: -20px;
          top: 350px;
          line-height: 0px;
          transform: rotate(-20deg);
        }
        #b6 {
          left: 250px;
          top: 500px;
          line-height: 0px;
          transform: rotate(10deg);
        }
        #b7 {
          right: 330px;
          top: 370px;
          line-height: 0px;
          transform: rotate(-30deg);
        }
        #b8 {
          right: -20px;
          top: 500px;
          line-height: 0px;
          transform: rotate(30deg);
        }
        #join {
          display: block;
          text-align: center;
          background-color: #808080;
          margin: 20px auto auto auto;
          height: 40px;
          width: 200px;
          font-size: 16px;
          cursor: pointer;
        }
        .subTitle {
          color: white;
          background: none;
          z-index: 2;
          margin-left: 50px;
        }
        #title {
          text-align: center;
          color: white;
          background: none;
          padding-top: 30px;
          font-size: 20px;
          padding-bottom: 20px;
        }
        #background {
          z-index: -1;
        }
        .check {
          background: none;
          margin-left: 10px;
          line-height: 40px;
          position: absolute;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
