import { Route, RouterProvider, Routes } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CommentBox from "./components/CommentBox";
import ReplyBox from "./components/ReplyBox";


function App() {
  return (
  <>

    <Navbar />
    {/* <Sidebar /> */}
    <CommentBox />
    <ReplyBox />
  
 

</>
  );
}

export default App;
