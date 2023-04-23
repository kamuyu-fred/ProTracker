import { Route, RouterProvider, Routes } from "react-router-dom";
import './App.css';
import './Variables.js';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CommentBox from "./components/CommentBox";
import ReplyBox from "./components/ReplyBox";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CohortForm from "./pages/Cohort";



function App() {
  return (
  <>

     {/* <Navbar /> */}
     {/* <Sidebar />  */}
     <CohortForm/>
 {/* <Login /> */}
    
     {/* <SignUp /> */}
    
  
  
 

</>
  );
}

export default App;
