import { Route, RouterProvider, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Projectdetails from "./components/Projectdetails";
import CommentBox from "./components/comments/CommentBox";
import ReplyBox from "./components/comments/ReplyBox";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
    <Projectdetails/>
    {/* <CommentBox/> */}
    {/* <Login/> */}
    {/* <SignUp/> */}
    {/* <ReplyBox/> */}
    {/* <Navbar/> */}
    { /* <Sidebar /> */}
    </>
  )
}
export default App;
