import { Route, RouterProvider, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CommentBox from "./components/comments/CommentBox";
import ReplyBox from "./components/comments/ReplyBox";
import Login from "./components/Login";

function App() {
  return (
    <>
    {/* <CommentBox/> */}
    <Login/>
    {/* <ReplyBox/> */}
      {/* <Navbar />
      <Sidebar /> */}
    </>
  )
}

export default App;
