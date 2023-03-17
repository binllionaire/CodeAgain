import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage } from "./Pages/index";
import { ResisterPage } from "./Pages/index";
import { LoginPage } from "./Pages/index";
import { ReviewPage } from "./Pages/index";
import { ReviewAddPage } from "./Pages/index";
import { ReviewViewPage } from "./Pages/index";
import { ReviewUpdatePage } from "./Pages/index";
import { StudyPage} from "./Pages/index"
import { StudyMainPage} from "./Pages/index"
import { TodoPage} from "./Pages/index"
import { PlanAddPage} from "./Pages/index"
import { PlanViewPage} from "./Pages/index"
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/resister" element={<ResisterPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/review/add" element={<ReviewAddPage />}></Route>
      <Route path="/review" element={<ReviewPage />}></Route>
      <Route path="/review/:id" element={<ReviewViewPage />}></Route>
      <Route path="/review/:id/update" element={<ReviewUpdatePage />}></Route>
      <Route path="/study" element={<StudyPage />}></Route>
      <Route path="/todo" element={<TodoPage />}></Route>
      <Route path="/study/:id" element={<StudyMainPage />}></Route>
      <Route path="/study/add" element={<PlanAddPage />}></Route>
      <Route path="/study/view/:id" element={<PlanViewPage />}></Route>
    </Routes>
   </Router>
  );
}

export default App;
