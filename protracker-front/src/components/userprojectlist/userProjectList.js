import React, { useState, useEffect } from "react";
import "./userProjectList.css";
import android from "./assets/android.png";
import fullstack from "./assets/code.png";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
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
        setProjects(data);
        console.log(data);
        console.log(userId);
      });
  }, [cohort_id]);

  const dispatch = useDispatch();

  // updating redux state;
  function handleProjectId(newId) {
    console.log(newId);
    dispatch({ type: "SET_PROJECT_ID", payload: newId });
    localStorage.setItem("projectId", newId);
  }

  // handle liking projects

  let handleLikingProject = (id, event, likes, liked,checked_state) => {
    const isChecked = event.target.checked;
    let h6Elem = event.target.nextSibling.nextSibling;
    let isLiked = liked.length > 0;
  
    if (!isLiked) {
      event.target.style.color = "blueViolet !important";
      h6Elem.innerHTML = "";
      h6Elem.innerHTML = likes + 1;
      fetch(`http://localhost:3000/projects/${id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    } else {
      event.target.style.color = "black !important";
      h6Elem.innerHTML = "";
      h6Elem.innerHTML = likes - 1;
      fetch(`http://localhost:3000/projects/${id}/dislike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    }
  };

  // creating an element for each project;

  let userId = localStorage.getItem("userId");
  let role = localStorage.getItem("admin");

  let projectsList = projects.map((project) => {
    let avatar_url =
      project.user.avatar_url === null
        ? "https://i.pinimg.com/736x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg"
        : project.user.avatar_url;

    let indicatorColor =
      project.user.online_status === "offline" ? "red" : "green";

    let member =
      project.members.filter((member) => member.id === 1).length > 0 || project.user.id == userId ? (
        <NavLink
          onClick={() => {
            handleProjectId(project.id);
          }}
          to="/projectdetails"
        >
          <h2>View</h2>
        </NavLink>
      ) : (
        <>{}</>
      );

    let checkout =
      role !== "admin" ? (
        <></>
      ) : (
        <NavLink
          onClick={() => {
            handleProjectId(project.id);
          }}
          to="/projectdetails"
        >
          <h2>checkout</h2>
        </NavLink>
      );


    let likes = project.student_likes.length;

    let liked = project.student_likes.filter((student) => {
      return student.id == userId;
    });
    console.log(liked);
    let color_button = liked.length > 0 ? "blueViolet" : "";
    let checked_state = liked.length > 0 ? true : false;

    return (
      <div className="project-card">
        <div className="image-container">
          <img src={android}></img>
        </div>
        <div className="project-info">
          <h1>{project.project_name}</h1>
          <h6>{member}</h6>
          <h6>{checkout}</h6>
        </div>
        <div id="user-project-info">
          <div id="project-info-menu"></div>
          <div id="project-add-info">
            <span id="fave-span">
              <input
                onChange={(e) => {
                  handleLikingProject(project.id, e, likes, liked,checked_state);
                }}
                type="checkbox"
                id="fave-box"
              />
              <i
                style={{ color: color_button }}
                id="like-button"
                className="material-icons"
              >
                favorite
              </i>
              <h6>{likes}</h6>
            </span>
            <div id="project-owner-details">
              <div id="project-owner-dp">
                <img src={avatar_url} alt="avatar" />
                <div style={{backgroundColor: indicatorColor}}></div>
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

  // adding projects form

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [githubLink, setGithubLink] = useState("");

  function handleCheckBox(value, event) {
    const isChecked = event.target.checked;
    if (isChecked) {
      setTags((tags) => [...tags, value]);
    } else {
      setTags((tags) => tags.filter((tag) => tag !== value));
    }
  }

  let createNewProject = () => {
    let projObj = {
      cohort_id: cohort_id,
      project_name: projectName,
      project_description: projectDescription,
      category: category,
      github_link: githubLink,
      tags: tags,
    };

    fetch("http://localhost:3000/projects/add_project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(projObj),
    }).then((response) => {
      console.log(response.json());
    });
    console.log(projObj);
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
              e.stopPropagation();
              setIsProjectFormActive(true);
            }}
          >
            <h1 id="form-title">Add Project</h1>
            <div className="form-group">
              <label>Name</label>
              <input
                onChange={(e) => {
                  setProjectName(e.target.value);
                }}
                type="text"
                name="title"
                value={projectName}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                onChange={(e) => {
                  setProjectDescription(e.target.value);
                }}
                value={projectDescription}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Gihub link</label>
              <input
                onChange={(e) => {
                  setGithubLink(e.target.value);
                }}
                type="url"
                name="title"
                value={githubLink}
              />
            </div>

            <div className="form-group">
              <label>Categories</label>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option>Fullstack</option>
                <option>Android</option>
              </select>
            </div>

            <div className="form-group">
              <label>Technologies</label>
              <div id="tags-container">
                <div>
                  <input
                    onChange={(e) => {
                      handleCheckBox(e.target.value, e);
                    }}
                    type="checkbox"
                    className="tag-checkbox"
                    value="react"
                  ></input>
                  <h6>React</h6>
                </div>
                <div>
                  <input
                    onChange={(e) => {
                      handleCheckBox(e.target.value, e);
                    }}
                    type="checkbox"
                    className="tag-checkbox"
                    value="tailwind"
                  ></input>
                  <h6>Tailwind</h6>
                </div>
                <div>
                  <input
                    onChange={(e) => {
                      handleCheckBox(e.target.value, e);
                    }}
                    type="checkbox"
                    className="tag-checkbox"
                    value="bootstrap"
                  ></input>
                  <h6>Bootstrap</h6>
                </div>
                <div>
                  <input
                    onChange={(e) => {
                      handleCheckBox(e.target.value, e);
                    }}
                    type="checkbox"
                    className="tag-checkbox"
                    value="html"
                  ></input>
                  <h6>Html</h6>
                </div>
                <div>
                  <input
                    onChange={(e) => {
                      handleCheckBox(e.target.value, e);
                    }}
                    type="checkbox"
                    className="tag-checkbox"
                    value="css"
                  ></input>
                  <h6>Css</h6>
                </div>
                <div>
                  <input
                    onChange={(e) => {
                      handleCheckBox(e.target.value, e);
                    }}
                    type="checkbox"
                    className="tag-checkbox"
                    value="mongo"
                  ></input>
                  <h6>Mongo</h6>
                </div>
                <div>
                  <input
                    onChange={(e) => {
                      handleCheckBox(e.target.value, e);
                    }}
                    type="checkbox"
                    className="tag-checkbox"
                    value="postgres"
                  ></input>
                  <h6>Postgres</h6>
                </div>
                <div>
                  <input
                    onChange={(e) => {
                      handleCheckBox(e.target.value, e);
                    }}
                    type="checkbox"
                    className="tag-checkbox"
                    value="ruby"
                  ></input>
                  <h6>Ruby</h6>
                </div>
                <div>
                  <input
                    onChange={(e) => {
                      handleCheckBox(e.target.value, e);
                    }}
                    type="checkbox"
                    className="tag-checkbox"
                    value="rails"
                  ></input>
                  <h6>Rails</h6>
                </div>
                <div>
                  <input
                    onChange={(e) => {
                      handleCheckBox(e.target.value, e);
                    }}
                    type="checkbox"
                    className="tag-checkbox"
                    value="ruby"
                  ></input>
                  <h6>Ruby</h6>
                </div>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                createNewProject();
              }}
              id="create-project-btn"
            >
              Create project
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

export default UserProjectList;
