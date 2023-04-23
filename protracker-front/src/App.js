import { Route, RouterProvider, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Projectdetails from "./components/projectdetails/Projectdetails";
import CommentBox from "./components/comments/CommentBox";
import ReplyBox from "./components/comments/ReplyBox";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AdminDashUsers from "./components/AdminDashUsers";
import AdminDashProjects from "./components/AdminDashProjects";
import ProjectsList from "./components/ProjectsList";

import { Provider } from 'react-redux';
import store from './store.js';
import { Switch } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <>
    <Provider store={store}>
      {/* <Projectdetails/> */}
      <Switch>
        <Route path="/projectlist">
          <ProjectsList/>
        </Route>
        <Route path="/projectdetails">
          <Projectdetails/>
        </Route>
      </Switch>
    </Provider>
    {/* <CommentBox/> */}
    {/* <Login/> */}
    {/* <SignUp/> */}
    {/* <ReplyBox/> */}
    {/* <Navbar/> */}
    {/* <Sidebar/> */}
    </>
  )
}
export default App;
