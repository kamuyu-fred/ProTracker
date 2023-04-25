import React, { useState, useEffect } from "react";
import "./userProjectList.css";
import android from "./assets/android.png";
import fullstack from "./assets/code.png";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch } from "react-redux";

function UserProjectList() {
  // handling project filter dropdown logic

  const [isDropDownActive, setDropDownActive] = useState(false);
  const [filterField, setFilterField] = useState("All projects");

  let dropDownClass = isDropDownActive
    ? "dropdown-active"
    : "dropdown-disabled";
  let dropDownIcon = isDropDownActive ? "expand_less" : "expand_more";

  // fetching projects;

  const token = localStorage.getItem("jwt"); //store token in localStorage

  const [projects, setProjects] = useState([]);

  const cohort_id = localStorage.getItem("cohort_id");

  useEffect(() => {
    fetch(`http://localhost:3000/cohort/${cohort_id}/all_projects`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProjects(data);
      });
  },[]);

  console.log(projects);


  const dispatch = useDispatch();

  // updating redux state;
  function handleProjectId(newId) {
    console.log(newId)
    dispatch({ type: "SET_PROJECT_ID", payload: newId });
    localStorage.setItem('projectId', newId);
  }


  // creating an element for each project;

  let projectsList = projects.map((project) => {
    let avatar_url =
      project.user.avatar_url === null
        ? "https://i.pinimg.com/736x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg"
        : project.user.avatar_url;

    let indicatorColor =
      project.user.online_status === "offline" ? "red" : "green";
    return (
      <div className="project-card">
        <div className="image-container">
          <img src={android}></img>
        </div>
        <div className="project-info">
          <h1 onClick={()=>{
            handleProjectId(project.id)
          }}>

          <NavLink to="/projectdetails">{project.project_name}</NavLink>  

          </h1>
          <h6>Android</h6>
        </div>
        <div id="user-project-info">
          <div id="project-info-menu"></div>
          <div id="project-add-info">
            <span>
              <i className="material-icons">favorite</i>
              <h6>{project.student_likes.length}</h6>
            </span>
            <div id="project-owner-details">
              <div id="project-owner-dp">
                <img src={avatar_url} alt="avatar" />
                <div></div>
              </div>
              <span>
                <h1>{project.user.username}</h1>
                <h6>Project owner</h6>
              </span>
            </div>
          </div>
        </div>
        <div id="project-card-menu-icon">
          <i className="material-icons">more_horiz</i>
          <input type="checkbox" id="menu-checkbox"></input>
          <div id="card-menu-box"></div>
        </div>
      </div>
    );
  });

  // toggling add projects form;

  const [isProjectFormActive, setIsProjectFormActive] = useState(false);

  let handleProjectForm = () => {
    setIsProjectFormActive(!isProjectFormActive);
  };

  return (
    <section id="user-project-list">
      <div id="project-list-header">
        <div id="path-col">
          <h6>Cohort > Projects</h6>
          <h2>All Projects</h2>
        </div>
        <div id="project-list-options-col">
          <button
            onClick={() => {
              setDropDownActive(!isDropDownActive);
            }}
          >
            <h6>{filterField}</h6>
            <i className="material-icons">{dropDownIcon}</i>
          </button>
          <div className={dropDownClass} id="projects-drop-down">
            <div
              onClick={() => {
                setFilterField("Android");
                setDropDownActive(!isDropDownActive);
              }}
            >
              <h6>Android</h6>
            </div>
            <div
              onClick={() => {
                setFilterField("Fullstack");
                setDropDownActive(!isDropDownActive);
              }}
            >
              <h6>Fullstack</h6>
            </div>
          </div>
          <button
            onClick={() => {
              handleProjectForm();
            }}
          >
            Add Project
          </button>
          <button>
            <i
              onClick={() => {
                handleProjectForm();
              }}
              className="material-icons"
            >
              more_horiz
            </i>
          </button>
        </div>
      </div>
      <div id="main-project-body">
        <div id="projects-body">{projectsList}</div>
      </div>
      {isProjectFormActive && (
        <div
          onClick={() => {
            handleProjectForm();
          }}
          id="add-project-cont"
        >
          <form
            onClick={(e) => {
              e.stopPropagation()
              setIsProjectFormActive(true);
            }}
          >
            <h1 id="form-title">Add Project</h1>
            <div className="form-group">
              <label>Title</label>
              <input type="text" name="title" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea></textarea>
            </div>

            <div className="form-group">
              <label>Categories</label>
              <select>
                <option>Fullstack</option>
                <option>Android</option>
              </select>
            </div>

            <div className="form-group">
              <label>Technologies</label>
              <div id="tags-container">
                <div>
                  <input type="checkbox" className="tag-checkbox"></input>
                  <h6>React</h6>
                </div>
                <div>
                  <input type="checkbox" className="tag-checkbox"></input>
                  <h6>Tailwind</h6>
                </div>
                <div>
                  <input type="checkbox" className="tag-checkbox"></input>
                  <h6>Bootstrap</h6>
                </div>
                <div>
                  <input type="checkbox" className="tag-checkbox"></input>
                  <h6>Html</h6>
                </div>
                <div>
                  <input type="checkbox" className="tag-checkbox"></input>
                  <h6>Css</h6>
                </div>
                <div>
                  <input type="checkbox" className="tag-checkbox"></input>
                  <h6>Mongo</h6>
                </div>
                <div>
                  <input type="checkbox" className="tag-checkbox"></input>
                  <h6>Postgres</h6>
                </div>
                <div>
                  <input type="checkbox" className="tag-checkbox"></input>
                  <h6>Ruby</h6>
                </div>
                <div>
                  <input type="checkbox" className="tag-checkbox"></input>
                  <h6>Rails</h6>
                </div>
                <div>
                  <input type="checkbox" className="tag-checkbox"></input>
                  <h6>Ruby</h6>
                </div>
              </div>
            </div>
            <button id="create-project-btn">Create project</button>
          </form>
        </div>
      )}
    </section>
  );
}

export default UserProjectList;
