import React, { useEffect, useState } from "react";
import Header2 from "../../../Common/Header2";
import moment from "moment";
import {useNavigate } from "react-router-dom";
import "moment/locale/ko";

const ReviewPage_add = () => {
  const [code, setCode] = useState("");
  const [memo, setMemo] = useState("");
  const accessToken = localStorage.getItem("access_token")
  const [probTitle, setProbTitle] = useState("");
  const [probIntro, setProbIntro] = useState("");
  const [probNum, setProbNum] = useState(0);
  const [checkedList, setCheckedList] = useState([]);

  const changeCheck = (e) => {
    var today = new Date();
    const id = e.target.id;
    var date = "";
    if (id === "tomorrow") {
      date = new Date(today.setDate(today.getDate() + 1));
    } else if (id === "3day") {
      date = new Date(today.setDate(today.getDate() + 3));
    } else if (id === "7day") {
      date = new Date(today.setDate(today.getDate() + 7));
    } else if (id === "1mon") {
      date = new Date(today.setMonth(today.getMonth() + 1));
    } else if (id === "1mon") {
      date = new Date(today.setMonth(today.getMonth() + 1));
    } else if (id === "2mon") {
      date = new Date(today.setMonth(today.getMonth() + 2));
    } else if (id === "3mon") {
      date = new Date(today.setMonth(today.getMonth() + 3));
    } else if (id === "6mon") {
      date = new Date(today.setMonth(today.getMonth() + 6));
    }
    date = moment(date).format("YYYY-MM-DD");
    if (e.target.checked) {
      setCheckedList([...checkedList, date]);
    } else {
      setCheckedList(checkedList.filter((el) => el !== date));
    }
  };
  //문제설명 상태관리
  const onChangeCode = (e) => {
    setCode(e.target.value);
  };
  //메모 상태관리
  const onChangeMemo = (e) => {
    setMemo(e.target.value);
  };
  const onIntroChange = (e) => {
    setProbIntro(e.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      probSearch()
    }
  };

  var type = "";
  //오답노트 추가
  const addNote = () => {
    if (checked === "2") type = "mistake";
    else if (checked === "3") type = "better";
    else if (checked === "4") type = "unsolved";
    else if (checked === "5") type = "again";
    else if (checked === "6") type = "etc";

    var sp = [];
    for (var i in checkedList) {
      sp.push({ repeat_time: checkedList[i], repeat_complete: false });
    }

    var today = new Date();
    today = moment(today).format("YYYY-MM-DD");
    axios
      .post(
        "https://codeagain.kro.kr/api/notes",
        {
          category: type,
          code: code,
          description: probIntro,
          memo: memo,
          number: probNum,
          subject: probTitle,
          targetDate: today,
          noteReviews: sp,
        },
        {
          headers: {
            "X-AUTH-TOKEN": accessToken,
          },
        }
      )
      .then((res) => {
        console.log("REVIEW NOTE ADD COMPLETE");
        navigate("/review");
      });
  };
  //파싱

  const axios = require("axios");
  const cheerio = require("cheerio");

  const getHtml = async (keyword) => {
    try {
      return await axios.get(
        "https://school.programmers.co.kr/learn/courses/30/lessons/" +
          encodeURI(keyword)
      );
    } catch (error) {
      console.error("PROGRAMMERS PARSER ERROR");
    }
  };
  const getBJ = async (keyword) => {
   
    try {
      return await axios.get(
        "https://localhost:5000/api/problem/" + encodeURI(keyword)
      ).then((data)=>{console.log(data)});
    } catch (error) {
      console.error("PROGRAMMERS PARSER ERROR");
    }
  }
  const parsing = async (keyword) => {
    const html = await getHtml(keyword);
   // const baekjoon = await getBJ(keyword);
    const $ = cheerio.load(html.data);
    console.log($("#problem_title").text())
    setProbTitle(
      $(
        "body > div.navbar.navbar-dark.navbar-expand-lg.navbar-application.navbar-breadcrumb > ol > li.active"
      ).text()
    );
   
    setProbIntro($("#tour2 > div > div > p").text());
    document.getElementById("probSearchTitle").style.display = "block";
  };

  //라우터
  const navigate = useNavigate();

  //체크박스 관리
  const [checked, setChecked] = useState([]);
  const handleChecked = (e) => {
    setChecked(e.target.value);
  };

  //문제검색

  useEffect(() => {
    if (probNum !== "") {
      parsing(probNum);
    }
  }, [probNum]);
  const probSearch = () => {
    setProbNum("");

    setProbNum(document.getElementById("probNum").value);
  };
  //문제 제목,설명 띄우기
  const showProbName = () => {
    console.log(probTitle)
    document.getElementById("probName").value =
      "프로그래머스 " + probNum + "번 " + probTitle;
    document.getElementById("probIntro").value = probIntro;
    document.getElementById("disabled").style.opacity = "100%";
    document.getElementById("probSearchTitle").style.display = "none";
  };

  return (
    <div className="ReviewAddPage">
      <Header2 />
      <div id="add">
        <p id="title">오답노트 추가</p>
        <hr id="hr2" />
        <div id="main">
          <p className="subtitle">문제검색</p>
          <div id="probSearch" onKeyPress={handleKeyPress}>
            <input
              id="probNum"
              type="text"
              placeholder="문제번호를 입력해주세요"
            />
            <button onClick={probSearch} id="search">
              <img id="searchIcon" src="../../img/search.png" width="20px" alt="search"/>
            </button>
          </div>
          <br />
          <br />
          <p id="probSearchTitle" onClick={showProbName}>
             {probTitle !== "" ? "프로그래머스 " + probNum+"번 "+ probTitle : "검색결과가 없습니다"}
          </p>
          <br />
          <div id="disabled">
            <p className="subtitle">문제</p>
            <input
              type="text"
              placeholder="문제를 검색해주세요"
              id="probName"
            />
            <br />
            <p id="subtitle" className="subtitle">
              문제설명
            </p>
            <textarea id="probIntro" onChange={onIntroChange}></textarea>
            <br />
            <p id="wt" className="subtitle">
              오답유형
            </p>
            <br />
            <div id="wrongType">
              <div id="circle1"></div>
              <input
                type="radio"
                value="2"
                id="typeMistake"
                checked={checked === "2"}
                onChange={handleChecked}
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
              />
              <label htmlFor="typeEtc" className="type" id="typeEtc">
                etc
              </label>
            </div>
            <br />
            <br />
            <p className="subtitle">코드</p>
            <textarea id="probCode" onChange={onChangeCode}></textarea>
            <br />
            <br />
            <p className="subtitle">메모</p>
            <textarea id="memo" onChange={onChangeMemo}></textarea>
            <br />
            <br />
            <p className="subtitle">반복설정</p>
            <div id="alarm">
              <input type="checkbox" id="tomorrow" onClick={changeCheck} />
              <label htmlFor="tomorrow" className="type" id="when">
                내일
              </label>
              <input type="checkbox" id="3day" onClick={changeCheck} />
              <label htmlFor="3day" className="type" id="when">
                3일 후
              </label>
              <input type="checkbox" id="7day" onClick={changeCheck} />
              <label htmlFor="7day" className="type" id="when">
                7일 후
              </label>
              <input type="checkbox" id="1mon" onClick={changeCheck} />
              <label htmlFor="1mon" className="type" id="when">
                1개월 후
              </label>
              <input type="checkbox" id="2mon" onClick={changeCheck} />
              <label htmlFor="2mon" className="type" id="when">
                2개월 후
              </label>
              <input type="checkbox" id="3mon" onClick={changeCheck} />
              <label htmlFor="3mon" className="type" id="when">
                3개월 후
              </label>
              <input type="checkbox" id="6mon" onClick={changeCheck} />
              <label htmlFor="6mon" className="type" id="when">
                6개월 후
              </label>
            </div>
            <br />
            <br />
            <button id="save" onClick={addNote}>
              저장
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
      textarea::-webkit-scrollbar {
          width: 10px;
        }
        textarea::-webkit-scrollbar-track {
          border-radius: 100px;
        }
        textarea::-webkit-scrollbar-thumb {
          background-color: #808080;
          border-radius: 100px;
          padding-right: 20px;
        }
        textarea {
          scrollbar-color: #d9d9d9;
          white-space: pre-wrap;
          cursor: auto;
        }
        #disabled {
          opacity: 50%;
        }
        #probSearchTitle {
          cursor: pointer;
          display: none;
          font-size: 13px;
          color: #d9d9d9;
          margin-left:120px;
          margin-top:0px;
        }
         input[type=radio]{
            display:none;
          }
          input[type=radio]:checked + label{
            color: #d9d9d9;
          }
        .type{
            color: #808080;
            float: left;
            margin-right: 20px;
            margin-top:6px;
            background:none;
            }
            [type=checkbox]{
            width: 10px;
              height: 10px;
              float:left;
            margin-right: 7px;
            border-radius: 50%;
            margin-top: 10px;
            border-radius: 50%;
            border: 1px solid #999;
           appearance: none;
            }
            input[type="checkbox"]:checked {
              background: #FFFFFF;
              border: none;
              }
          margin-left: 120px;
        }
        input[type="radio"] {
          display: none;
        }
        input[type="radio"]:checked + label {
          color: #d9d9d9;
        }
        .type {
          color: #808080;
          float: left;
          margin-right: 20px;
          margin-top: 6px;
          background: none;
        }
        [type="checkbox"] {
          width: 10px;
          height: 10px;
          float: left;
          margin-right: 7px;
          border-radius: 50%;
          margin-top: 10px;
          border-radius: 50%;
          border: 1px solid #999;
          appearance: none;
        }
        input[type="checkbox"]:checked {
          background: #ffffff;
          border: none;
        }

        input[type="checkbox"]:checked + label {
          color: #d9d9d9;
        }
        * {
        font-family: 'Pretendard-Regular';
          background-color: #343a40;
        }
        header {
          padding: 5px;
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

        input,
        textarea {
          outline: none;
        }

        textarea {
          padding: 5px;
          box-sizing: border-box;
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
        #logout {
          margin-top: 7px;
          display: block;
          float: right;
          color: #d9d9d9;
          font-size: 10px;
          margin-right: 15px;
          cursor:pointer;
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
          font-family: 'Pretendard-Regular';
          font-size: 25px;
          font-weight: 400;
          margin-top: 80px;
          line-height: 0px;
        }
        #type1 {
          margin-left: 50px;
          margin-right: 20px;
          float: left;
          color: #d9d9d9;
          text-decoration: underline;
          text-underline-position: under;
        }
        .type {
          color: #808080;
          float: left;
          margin-right: 20px;
        }
        #hr2 {
          margin: 0 auto 0 auto;
          display: block;
          text-align: center;
          margin-top: 15px;
          margin-bottom: 50px;
          background-color: #808080;
          height: 0.005em;
          width: 100%;
          border: none;
        }
        #circle1 {
          margin-top: 10px;
          display: block;
          background-color: #67d5b5;
          float: left;
          margin-right: 5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        #circle2 {
          margin-top: 10px;
          display: block;
          background-color: #84b1ed;
          float: left;
          margin-right: 5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        #circle3 {
          margin-top: 10px;
          display: block;
          background-color: #ee7785;
          float: left;
          margin-right: 5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        #circle4 {
          margin-top: 10px;
          display: block;
          background-color: #feee7d;
          float: left;
          margin-right: 5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        #circle5 {
          margin-top: 10px;
          display: block;
          background-color: #c89ec4;
          float: left;
          margin-right: 5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        #none {
          margin-top: 100px;
          text-align: center;
          color: #d9d9d9;
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
          margin-top: 0px;
          font-family: 'Pretendard-Regular';
          margin-bottom: 10px;
        }
        #main {
          width: 95%;
          margin: 0 auto 0 5%;
        }
        #add {
          width: 70%;
          margin: 0 auto 0 auto;
        }

        .subtitle {
          font-family: 'Pretendard-Regular';
          color: #d9d9d9;
          width: 20%;
          float: left;
        }
        #probSearch {
          display: inline-block;
          width: 80%;
          height: 30px;
          margin-top: 5px;
        }
        #probNum {
          outline: none;
          width: 95%;
          padding-right: 0px;
          border: 0px;
          background-color: #212529;
          color: #d9d9d9;
          display: inline-block;
          margin-top: 0px;
          padding-left: 10px;
          font-size: 13px;
          border-radius: 5px 0px 0 5px;
          line-height: 30px;
        }

        #searchIcon {
          background: none;
          line-height: 30px;
        }

            #search{
            position: absolute;
            width: 3%;
            height: 30px;
            padding-bottom: 1px;
            border: none;
            font-size: 13px;
            padding: 1px;
            background-color: #808080;
            margin-left: 0px;
            box-sizing: border-box;
            border-radius: 0px 5px 5px 0px;
            -webkit-appearance: none;
            box-sizing: content-box;
            cursor:pointer;
            }
            #probName {
            font-size: 13px;
            background-color: #212529;
            width: 80%;
            height: 30px;
            border: none;
            border-radius: 5px;
            color: #D9D9D9;
            margin-bottom: 30px;
            margin-top: 0px;
            padding-left: 10px;
            }
            #wt{
            margin-top: 25px;
            }
            #probIntro{
            background-color: #212529;
            width: 80.5%;
            height: 200px;
            border: none;
            border-radius: 5px;
            resize: none;
            color: #D9D9D9;
            line-height:23px;
            margin-top: 5px;
            }
            #wrongType{
            color: #d9d9d9;
            padding-left: 10px;
            background-color: #212529;
            width: 80%;
            border-radius: 5px;
            height: 30px;
            display: inline-block;
            }
            #alarm{
            color: #d9d9d9;
            margin-top: 5px;
            padding-left: 10px;
            background-color: #212529;
            width: 80%;
            border-radius: 5px;
            height: 30px;
            display: inline-block;
            }
            #wrongType > p{
            background: none;
            margin-top: 5px;
            }
            #probCode{
            margin-top: 5px;
            background-color: #212529;
            width: 80.5%;
            height: 250px;
            border: none;
            border-radius: 5px;
            resize: none;
            color: #D9D9D9;
            line-height: 23px;
            }
            #addCode{
            display: block;
            text-align: center;
            color: #d9d9d9;
            margin-top: 0;
            margin-bottom: 30px;
            }
            #memo{
            background-color: #212529;
            width: 80.5%;
            height: 100px;
            border: none;
            border-radius: 5px;
            resize: none;
            color: #D9D9D9;
            line-height: 23px;
            }
            .subtitle{
            font-size: 13px;
            display: inline-block;
            margin-right: 5px;
            width: 100px;
            }
            #save{
              cursor:pointer;
            display: inline-block;
            background-color: #212529;
            border: none;
            color:#D9D9D9;
            border-radius: 5px;
            height: 40px;
            width: 100px;
            margin-left: 81%;
            margin-top: 50px;
            margin-bottom: 100px;
            }
        `}</style>
    </div>
  );
};

export default ReviewPage_add;
