import { Route, RouterProvider, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Projectdetails from "./components/projectdetails/Projectdetails";
import CommentBox from "./components/comments/CommentBox";
import ReplyBox from "./components/comments/ReplyBox";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CohortForm from "./pages/Cohort";
import ProjectsList from "./components/ProjectsList";

import { Provider } from "react-redux";
import store from "./store.js";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import UserProjectList from "./components/userprojectlist/userProjectList";
import AdminDashProjects from "./components/AdminDashProjects";
import AdminDashUsers from "./components/AdminDashUsers";
import CohortList from "./components/CohortList/cohortlist";
import Activities from "./components/Activities";
import AdminDashCohorts from "./components/AdminDashCohorts";

function App() {
  return (
    // <Login/>
    <Provider store={store}>
      <div className="app">
        <div id="sidebar">
          <Sidebar />
        </div>
        <div id="main-body">
          <div id="nav-row">
            <Navbar />
          </div>
          <div id="body-row">
            <Switch>
              <Route path="/projectList">
                <UserProjectList />
              </Route>
              <Route path="/projectdetails">
                <Projectdetails />
              </Route>
              <Route path="/adminprojects">
                <AdminDashProjects />
              </Route>
              <Route path="/adminusers">
                <AdminDashUsers />
              </Route>
              <Route exact path="/">
                <CohortList />
              </Route>
              <Route exact path="/activities">
                <Activities />
              </Route>
              <Route path="/admincohorts">
                  <AdminDashCohorts/>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Provider>
  );
  {
    /* <Projectdetails/> */
  }

  {
    /* <Switch>
        <Route path="/projectlist">
          <ProjectsList/>
        </Route>
        <Route path="/projectdetails">
        </Route>
        <Route path="/cohortform">
          <CohortForm/>
        </Route>
        <Route exact path ="/">
          <Login/>
        </Route>
      </Switch> */
  }

  {
    /* <CommentBox/> */
  }
  {
    /* <Login/> */
  }
  {
    /* <SignUp/> */
  }
  {
    /* <ReplyBox/> */
  }
  {
    /*<UserProjectList/> */
  }
}
export default App;
