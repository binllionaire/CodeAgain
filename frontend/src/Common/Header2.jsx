import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// ReviewPage Header
export default function Header2() {
  const accessToken = localStorage.getItem("access_token")
 
  const [TF, setTF] = useState(false);

  useEffect(() => {
    axios
      .post(
        "https://codeagain.kro.kr/api/study/check",
        {},
        {
          headers: {
            "X-AUTH-TOKEN": accessToken,
          },
        }
      )
      .then((res) => {
        console.log("STUDY PARTICIPATION STATUS SETTING COMPLETE");
        if (res.data.data === true) setTF(true);
        else setTF(false);
      });
  }, [accessToken]);
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get("https://codeagain.kro.kr/api/members/token", {
        headers: {
          "X-AUTH-TOKEN": accessToken,
        },
      })
      .then(function (response) {
        console.log("HEADER USERNAME SETTING COMPLETE");
        setName(response.data.data.name);
        setId(response.data.data.sno);
      });
  }, [accessToken]);


  const [id, setId] = useState("");
  const navigate = useNavigate();
  const mainPage = (e) => {
    console.log("LOGOUT COMPLETE");
    navigate("/");
  };
  const ReviewPage = (e) => {
    console.log("NAVIGATE TO REVIEW PAGE");
    navigate("/review");
  };
  const PlannerPage = (e) => {
    console.log("NAVIGATE TO STUDY PAGE");
    if (TF === true) navigate("/study/" + id);
    else navigate("/study");
  };
  const TodoPage = (e) => {
    console.log("NAVIGATE TO TODO PAGE");
    navigate("/todo");
  };
  return (
    <header>
      <img
        id="logo"
        onClick={ReviewPage}
        src="../../img/logo.png"
        width="150px"
        alt="logo"
      />
      <p id="logout" onClick={mainPage}>
        로그아웃
      </p>
      <p className="bar">|</p>
      <p id="setting">설정</p>
      <p className="bar">|</p>
      <p id="my">{name}</p>
      <p className="bar">|</p>
      <p id="theme">Dark</p>
      <div id="circle"></div>
      <div id="tab">
        <p id="reviewnote" onClick={ReviewPage}>
          오답노트
        </p>
        <p id="todo" onClick={TodoPage}>
          TODO
        </p>
        <p id="planner" onClick={PlannerPage}>
          스터디
        </p>
      </div>
      <hr id="hr1" />
    </header>
  );
}