import { useNavigate } from "react-router-dom";

// ResisterPage Header
export default function Header4() {
  const navigate = useNavigate();

  const mainPage = (e) => {
    navigate("/",{ state: { Visit: true } });
  };

  const resisterPage = (e) => {
    console.log("NAVIGATE TO RESISTER PAGE");
    navigate("/resister", { state: { Email: "" } });
  };
  return (
    <header>
      <img onClick={mainPage} id="logo" src="../img/logo.png" width="150px" alt="logo"/>
      <p onClick={resisterPage} id="login">
        회원가입
      </p>
      <p id="theme">Dark</p>
      <div id="circle"></div>
    </header>
  );
}
