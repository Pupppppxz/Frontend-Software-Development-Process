
// import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ForgotPass from "./Pages/ForgotPass";
import DisplayApt from "./Pages/DisplayApt";
import DetailApt from "./Pages/DetailApt";
import Book from "./Pages/Book"
import Noti from "./Pages/Noti"
import Agenda from "./Pages/Agenda"
import UserInfo from "./Pages/UserInfo"
import Review from "./Pages/Review"
import OwnerMain from "./Pages/OwnerMain"
import ManageApt from "./Pages/ManageApt"
import ManageRooms from "./Pages/ManageRooms";
import OwnerNoti from"./Pages/OwnerNoti";
import OwnerAgenda from"./Pages/OwnerAgenda";
import OwnerInfo from "./Pages/OwnerInfo"
import RequestManage from "./Pages/RequestManage"
import CreateApt from "./Pages/CreateApt";
import CreateRoomType from "./Pages/CreateRoomsType";
import OwnerSignUp from "./Pages/OwnerSignUp";
import Available from "./Pages/ManageAvailable";
import AdminRequest from "./Pages/AdminRequest";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/SignUp" exact element={<SignUp />} />
          <Route path="/ForgotPass" exact element={<ForgotPass />} />
          <Route path="/DisplayApt" exact element={<DisplayApt />} />
          <Route path="/DetailApt" exact element={<DetailApt/>} />
          <Route path="/Book" exact element={<Book/>} />
          <Route path="/Noti" exact element={<Noti/>} />
          <Route path="/Agenda" exact element={<Agenda/>} />
          <Route path="/UserInfo" exact element={<UserInfo/>} />
          <Route path="/Review" exact element={<Review/>} />
          <Route path="/OwnerMain" exact element={<OwnerMain/>} />
          <Route path="/ManageApt" exact element={<ManageApt/>} />
          <Route path="/ManageRooms" exact element={<ManageRooms/>} />
          <Route path="/OwnerNoti" exact element={<OwnerNoti/>} />
          <Route path="/OwnerAgenda" exact element={<OwnerAgenda/>} />
          <Route path="/OwnerInfo" exact element={<OwnerInfo/>} />
          <Route path="/RequestManage" exact element={<RequestManage/>} />
          <Route path="/CreateApt" exact element={<CreateApt/>} />
          <Route path="/CreateRoomType" exact element={<CreateRoomType/>} />
          <Route path="/OwnerSignUp" exact element={<OwnerSignUp/>} />
          <Route path="/AvailableRoom" exact element={<Available/>} />
          <Route path="/Admin" exact element={<AdminRequest/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
