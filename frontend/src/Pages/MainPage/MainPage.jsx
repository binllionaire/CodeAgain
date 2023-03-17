import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import "../pages.css";
import Header1 from "../../Common/Header1";

const MainPage = () => {
  const [email, setEmail] = useState("");
  const [isvisited, setVisited] = useState(useLocation().state?.Visit ?? false);
  console.log(isvisited)
  var result = false;
  const [emailValid, setEmailValid] = useState(false); //이메일 유효성
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("access_token")!==null && !isvisited){
      navigate("/login")
    }
  }, []);
  
  const resisterPage = (e) => {
    axios
      .post(
        "https://codeagain.kro.kr/api/check/email",
        { email: email },
        {
          headers: {
            "Content-Type": `application/json`,
          },
        }
      )
      .then((res) => {

        if (res.data.data === true) {
          result = !result;
        }
        navigate("/resister", {
          state: { Email: email, Check: result, EmailValid: emailValid },
        });
      });
  };

  //input에 입력될 때마다 account state값 변경되게 하는 함수 & 이메일 검증
  const onChangeEmail = (e) => {
    setEmail(e.target.value);

    const emailValue = e.target.value;
    var regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/; //이메일 검증 bnf
    if (regExp.test(emailValue)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  return (
    <div className="MainPage">
      <Header1 />
      <div id="main">
        <p id="p1">성장하는 개발자의 좋은 습관</p>
        <p id="p2">코드어게인으로 시작하세요</p>
        <p id="p3">코드어게인은</p>
        <p id="p4">
          알고리즘 문제풀이 사이트에서 틀린문제나
          <br />더 좋은 풀이를 기록하고 반복할 수 있는 곳입니다 <br/>
          
        </p>
        <input
          type="text"
          placeholder="이메일 주소 입력"
          id="emailInput"
          onChange={onChangeEmail}
        />

        <button id="join" onClick={resisterPage}>
          회원가입
        </button>
      </div>

      <style jsx>{`
        body {
          margin-left: 0px;
        }
        .MainPage {
          background-image: url("/img/background.png");
          background-size: 110%;
          background-repeat: no-repeat;
          background-position: center top;
          padding-bottom: 200px;
        }

        * {
        font-family: 'Pretendard-Regular';
          background-color: #343a40;
        }

        header {
          padding: 10px;
          background: none;
        }

        #logo {
          margin-left: 5px;
          background: none;
          position: relative;
          z-index: 2;
          display: inline-block;
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
          width: 550px;

          display: block;
          margin-top: 150px;
          margin-left: auto;
          margin-right: auto;

          height: 100%;
          padding-bottom: 30px;
          text-align: center;

          background: none;
        }

        #p1 {
          color: #ffffff;
          align-items: center;

          font-size: 30px;
          line-height: 10px;
        }

        #p2 {
          color: #fff;
          font-size: 45px;
          line-height: 0px;
          font-weight: 500;
        }

        #p3 {
          text-decoration: underline;
          text-underline-position: under;
          margin-top: 100px;
          color: #d9d9d9;
          font-size: 15px;
        }

        #p4 {
          background: none;
          color: #d9d9d9;
          font-size: 15px;
          line-height: 25px;
          position: relative;
          z-index: 2;
        }

        #emailInput {
          color: #212529;
          position: relative;
          z-index: 2;
          margin-top: 30px;
          margin-right: 5px;
          background-color: #d9d9d9;
          border: none;
          width: 350px;
          height: 55px;
          border-radius: 2px;
          padding-left: 10px;
          outline: none;
        }

        #join {
          position: relative;
          background-color: #212529;
          border: none;
          color: #d9d9d9;
          border-radius: 2px;
          height: 59px;
          width: 100px;
          z-index: 2;
          cursor: pointer;
          margin-bottom: 10%;
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

       

        #background {
          z-index: -1;
        }

        p {
          background: none;
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default MainPage;
