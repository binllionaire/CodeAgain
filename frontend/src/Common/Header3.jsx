import { useNavigate } from "react-router-dom";

// ResisterPage Header
export default function Header3() {
  const navigate = useNavigate();

  const mainPage = (e) => {
    navigate("/",{ state: { Visit: "true"} });
  };
  const loginPage = (e) => {
    console.log("LOGIN COMPLETE");
    navigate("/login");
  };

  return (
    <header>
      <img onClick={mainPage} id="logo" src="../img/logo.png" width="150px" alt="logo"/>
      <p onClick={loginPage} id="login">
        로그인
      </p>
      <p id="theme">Dark</p>
      <div id="circle"></div>
    </header>
  );
}
