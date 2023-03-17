import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header2 from "../../../Common/Header2";
import ReviewNoteList from "./ReviewNoteList";
import Mistake from "./mistake";
import Unsolved from "./unsolved";
import Better from "./better";
import Again from "./again";
import Etc from "./etc";
const ReviewPage = () => {
  const navigate = useNavigate();
  const ReviewAddPage = (e) => {
    console.log("NAVIGATE TO REVIEW ADD PAGE ");
    navigate("/review/add");
  };

  //라디오버튼 checked 오류 해결
  useEffect(() => {
    let All = document.getElementById("typeAll");
    All.checked = true;
  }, []);

  const [checked, setChecked] = useState([]);

  const handleChecked = (e) => {
    setChecked(e.target.value);
  };

  const [value, setValue] = useState("");
  const filter = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="ReviewAddPage">
      <Header2 />
      {/* 유형선택바 */}
      <div id="main">
        <p id="title">오답노트</p>
        <input
          type="radio"
          value="1"
          id="typeAll"
          checked={checked === "1"}
          onChange={handleChecked}
          onClick={filter}
        />
        <label htmlFor="typeAll" className="type" id="typeAll">
          전체
        </label>
        <div id="circle1"></div>
        <input
          type="radio"
          value="2"
          id="typeMistake"
          checked={checked === "2"}
          onChange={handleChecked}
          onClick={filter}
        />
        <label htmlFor="typeMistake" className="type">
          mistake
        </label>
        <div id="circle2"></div>
        <input
          type="radio"
          value="3"
          id="typeBetter"
          checked={checked === "3"}
          onChange={handleChecked}
          onClick={filter}
        />
        <label htmlFor="typeBetter" className="type" id="typeBetter">
          better
        </label>
        <div id="circle3"></div>
        <input
          type="radio"
          value="4"
          id="typeUnsolved"
          checked={checked === "4"}
          onChange={handleChecked}
          onClick={filter}
        />
        <label htmlFor="typeUnsolved" className="type" id="typeUnsolved">
          unsolved
        </label>
        <div id="circle4"></div>
        <input
          type="radio"
          value="5"
          id="typeAgain"
          checked={checked === "5"}
          onChange={handleChecked}
          onClick={filter}
        />
        <label htmlFor="typeAgain" className="type" id="typeAgain">
          again
        </label>
        <div id="circle5"></div>
        <input
          type="radio"
          value="6"
          id="typeEtc"
          checked={checked === "6"}
          onChange={handleChecked}
          onClick={filter}
        />
        <label htmlFor="typeEtc" className="type" id="typeEtc">
          etc
        </label>

        <img
          id="plus"
          onClick={ReviewAddPage}
          src="../../img/plus.png"
          width="20px"alt="plus"
        />

        <hr id="hr2" />
      </div>

      <div id="list">
        {value === 2 ? (
          <Mistake />
        ) : value === 3 ? (
          <Better />
        ) : value === 4 ? (
          <Unsolved />
        ) : value === 5 ? (
          <Again />
        ) : value === 6 ? (
          <Etc />
        ) : (
          <ReviewNoteList />
        )}
      </div>
      <style jsx>{`
        #noNote {
          color: #d9d9d9;
          text-align: center;
          margin-top: 200px;
          font-size: 20px;
        }
        input[type="radio"] {
          display: none;
        }
        * {
        font-family: 'Pretendard-Regular';
          background-color: #343a40;
        }
        #logo {
          margin-left: 5px;
          margin-top: 10px;
          background: none;
          position: relative;
          z-index: 2;
          display: inline-block;
          cursor: pointer;
        }
        #circle {
          margin-top: 7px;
          display: block;
          background-color: black;
          float: right;
          margin-right: 5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        #theme {
          margin-top: 7px;
          display: block;
          float: right;
          color: #d9d9d9;
          font-size: 10px;
          margin-right: 15px;
        }
        #my {
          margin-top: 7px;
          display: block;
          float: right;
          color: #d9d9d9;
          font-size: 10px;
          margin-right: 15px;
        }
        #setting {
          margin-top: 7px;
          display: block;
          float: right;
          color: #d9d9d9;
          font-size: 10px;
          margin-right: 15px;
        }
        header {
          padding: 5px;
        }
        #logout {
          margin-top: 7px;
          display: block;
          float: right;
          color: #d9d9d9;
          font-size: 10px;
          margin-right: 15px;
          cursor: pointer;
        }
        .bar {
          margin-top: 7px;
          display: block;
          float: right;
          color: #d9d9d9;
          font-size: 10px;
          margin-right: 15px;
        }
        #hr1 {
          margin-top: 15px;
          background-color: #808080;
          height: 0.005em;
          border: none;
        }
        #reviewnote {
          text-align: center;
          display: inline-block;
          width: 100px;
          color: #fff;
          text-decoration: underline;
          text-underline-position: under;
          cursor: pointer;
        }
        #todo {
          display: inline-block;
          text-align: center;
          width: 100px;
          color: #fff;
          cursor: pointer;
        }
        #planner {
          display: inline-block;
          text-align: center;
          width: 100px;
          color: #fff;
          cursor: pointer;
        }
        #tab {
          font-size: 18px;
          margin-top: 10px;
          display: inline-block;
          text-align: center;
          left: 50%;
          position: absolute;
          margin-left: -150px;
          background: none;
        }
        #title {
          color: white;
          font-weight: 400;
          font-size: 25px;
          margin-left: 50px;
          margin-top: 50px;
          line-height: 0px;
        }
        #typeAll {
          margin-left: 50px;
          margin-right: 20px;
          float: left;
        }

        input[type="radio"]:checked + label {
          text-decoration: underline;
          text-underline-position: under;
          color: #d9d9d9;
        }
        .type {
          margin-top: 15px;
          margin-bottom : 15px;
          color: #808080;
          float: left;
          margin-right: 20px;
          cursor: pointer;
          transition : color 0.3s ease;
        }
        .type:hover {
          margin-bottom : 15px;
          margin-top: 15px;
          color: #d9d9d9;
          float: left;
          margin-right: 20px;
          cursor: pointer;
        }

        #hr2 {
          background-color: #808080;
          height: 0.005em;
          width: 95%;
          border: none;
        }
        #circle1 {
          margin-top: 20px;
          display: block;
          background-color: #67d5b5;
          float: left;
          margin-right: 5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        #content > #circle1 {
          margin-top: 5px;
          display: block;
          background-color: #67d5b5;
          float: left;
          margin-right: 5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        #circle2 {
          margin-top: 20px;
          display: block;
          background-color: #84b1ed;
          float: left;
          margin-right: 5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        #content > #circle2 {
          margin-top: 5px;
          display: block;
          background-color: #84b1ed;
          float: left;
          margin-right: 5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        #circle3 {
          margin-top: 20px;
          display: block;
          background-color: #ee7785;
          float: left;
          margin-right: 5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        #content > #circle3 {
          margin-top: 5px;
          display: block;
          background-color: #ee7785;
          float: left;
          margin-right: 5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        #circle4 {
          margin-top: 20px;
          display: block;
          background-color: #feee7d;
          float: left;
          margin-right: 5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        #content > #circle4 {
          margin-top: 5px;
          display: block;
          background-color: #feee7d;
          float: left;
          margin-right: 5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        #circle5 {
          margin-top: 20px;
          display: block;
          background-color: #c89ec4;
          float: left;
          margin-right: 5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        #content > #circle5 {
          margin-top: 5px;
          display: block;
          background-color: #c89ec4;
          float: left;
          margin-right: 5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        #sort {
          display: block;
          float: left;
          margin-top: 15px;
        }
        #plus {
          float: right;
          margin-right: 50px;
          margin-top: 10px;

          color: white;
          background: none;

          cursor: pointer;
        }
        #none {
          margin-top: 100px;
          text-align: center;
          color: #d9d9d9;
        }
        #list {
          width: 80%;
          margin: 0 auto 0 auto;
        }
        #content {
          padding: 10px;
          border-radius: 5px;
          width: 21.5%;
          height: 150px;
          background-color: #212529;
          margin: 0.8%;
          cursor: pointer;
          float: left;
          transition : box-shadow 0.3s ease;
        }
        #content:hover {
          padding: 10px;
          border-radius: 5px;
          width: 21.5%;
          height: 150px;
          background-color: #212529;
          margin: 0.8%;
          cursor: pointer;
          float: left;
          box-shadow: 0 0 0 1px #d9d9d9 inset;
        }
        .sticker {
          margin-right: 3px;
        }
        #content > p {
          background: none;
        }
        #content > img {
          background: none;
        }
        #c_circle {
          margin-top: 5px;
          display: block;
          background-color: #67d5b5;
          float: left;
          margin-right: 5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .c_type {
          margin-top: 0px;
          color: #808080;
          float: left;
          margin-right: 20px;
        }
        .date {
          color: #808080;
          float: right;
          margin-top: 0px;
        }
        .number {
          display: block;
          margin-top: 40px;
          margin-left: 0px;
          color: #808080;
          margin-bottom: 5px;
        }
        .title {
          color: white;
          font-size: 25px;
          margin-top: 0;
          margin-bottom: 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        #main {
          width: 90%;
          margin: 0 auto 0 auto;
        }
      `}</style>
    </div>
  );
};

export default ReviewPage;
