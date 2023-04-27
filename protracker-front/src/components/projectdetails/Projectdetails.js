import React, { useEffect, useState } from "react";
import "./projectdetails.css";
import CommentBox from "../comments/CommentBox";
import Github from "./assets/github.png";
import html from "./assets/html.png";
import javascript from "./assets/javascript.png";
import angular from "./assets/angular.png";
import mongo from "./assets/mongodb.png";
import postgres from "./assets/postgresql.png";
import redux from "./assets/tailwind-css.png";
import ruby from "./assets/ruby.png";
import next from "./assets/next.png";
import bootstrap from "./assets/bootstrap.png";
import rails from "./assets/rails.png";
import css from "./assets/css3.png";
import tailwind from "./assets/tailwind-css.png";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function Projectdetails() {
  const token = localStorage.getItem("jwt"); //store token in localStorage

  const dispatch = useDispatch();

  // updating redux state;
  function handleProjectId(newId) {
    dispatch({ type: "SET_PROJECT_ID", payload: newId });
  }

  const project_id = useSelector((state) => state.project.id);

  const [id, setId] = useState("");

  // useEffect(() => {
  //   if (storedProjectId) {
  //     setId(storedProjectId);
  //     console.log(storedProjectId)
  //   }
  // }, []);

  const storedProjectId = localStorage.getItem("projectId");

  // states for conditional rendering;
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [isAddingNewMember, setIsAddingNewMember] = useState(false);
  const [isCheckingMembers, setIsCheckingMembers] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);

  let toggleAddMemberForm = (e) => {
    setIsAddingMember(!isAddingMember);
    e.stopPropagation();
  };

  const [projectData, setProjectData] = useState({});




  
  useEffect(() => {
    fetch(`http://localhost:3000/projects/${storedProjectId}/project_details`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("data");
        console.log(data);
        // handleProjectId(data.id);
        setGroupMembers(data.members);
        setProjectData(data);
      });
  }, []);




  // user details;
  let projectName = projectData ? projectData.project_name : "something";
  let projectDescription = projectData
    ? projectData.project_description
    : "something";
  let githubLink = projectData ? projectData.github_link : "something";
  let groupMembers = projectData ? projectData.members : "something";
  let tags = projectData.tags || [];

  const [modalGroupMembers, setGroupMembers] = useState([]);

  // tag images
  let images = {
    html: html,
    javascript: javascript,
    angular: angular,
    mongo: mongo,
    redux: redux,
    postgres: postgres,
    ruby: ruby,
    next: next,
    bootstrap: bootstrap,
    rails: rails,
    css: css,
    tailwind: tailwind,
  };

  let imageArray;
  if (projectData.tags !== null) {
    imageArray = tags.map((item) => ({
      name: item.name,
      image: images[item.name],
    }));
  }

  let tagsList;
  if (projectData.tags !== null) {
    tagsList = imageArray.map((tag) => {
      return <img src={tag.image}></img>;
    });
  }

  // refactoring member component

  const Member = ({ member, avatar_url }) => {
    return (
      <div id="group-member-box">
        <div id="group-member-pfp">
          <img src={avatar_url}></img>
        </div>
        <div id="group-member-details">
          <h1>{member.username}</h1>
          <h6>Project Member</h6>
        </div>
      </div>
    );
  };

  // group members for the details page;
  let membersList;
  if (projectData.members) {
    membersList = groupMembers.map((member) => {
      let avatar_url =
        member.avatar_url === null
          ? "https://i.pinimg.com/736x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg"
          : member.avatar_url;
      return <Member member={member} avatar_url={avatar_url} />;
    });
  }

  // group members for the members modal;
  let groupMembersList;
  if (projectData.members) {
    groupMembersList = modalGroupMembers.map((member) => {
      let avatar_url =
        member.avatar_url === null
          ? "https://i.pinimg.com/736x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg"
          : member.avatar_url;
      return (
        <div className="members-list-member">
          <Member member={member} avatar_url={avatar_url} />
        </div>
      );
    });
  }

  // cohort students;
  useEffect(() => {
    fetch("")
      .then()
      .then((data) => {
        console.log(data);
      });
  }, []);

  const [memberSeachTerm, setMemberSearchTerm] = useState("");
  // searching for group members
  const findGroupMembers = () => {
    console.log(memberSeachTerm);
    let members = projectData.members;

    const searchTerm = memberSeachTerm.trim().toLowerCase();

    if (!searchTerm) {
      // if search term is empty, render all members
      return setGroupMembers(members);
    }

    // filter members by search term
    let results = members.filter((member) => {
      const username = member.username.toLowerCase();
      return username.includes(searchTerm);
    });

    setGroupMembers(results);
  };

  console.log(projectData);

  const [cohortMembers, setCohortMembers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/cohort/1/cohort_members`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCohortMembers(data);
      });
  }, []);

  let cohort_id = localStorage.getItem("cohort_id");

  let handleAddingMember = (id) => {
    console.log(id);

    const memberObj = { id, project_id: storedProjectId };

    fetch(`http://localhost:3000/cohort/${cohort_id}/project/add_member`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(memberObj),
    })
      .then((response) => {
        if (response.ok) {
          toggleAddMemberForm();
          return response.json();
        } else {
          console.log(response.json());
          alert("Couldn't add member");
        }
      })
      .then((data) => {
        console.log(data);
      });
  };

  let cohortMembersList = cohortMembers.map((member) => {
    let avatar_url =
      member.avatar_url === null
        ? "https://i.pinimg.com/736x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg"
        : member.avatar_url;

    let indicatorColor = member.online_status === "offline" ? "red" : "green";

    return (
      <div className="group-cohort-member">
        <div className="cohort-member-pfp">
          <img src={avatar_url} alt="" />
          <div
            style={{ backgroundColor: indicatorColor }}
            className="online-indicator"
          ></div>
        </div>
        <div className="cohort-member-details">
          <h3>{member.username}</h3>
          <button
            onClick={() => {
              handleAddingMember(member.id);
            }}
            id="member-add-btn"
          >
            Add member
          </button>
        </div>
      </div>
    );
  });

  return (
    <>
      <section id="project-details-container">
        <NavLink to="/projectList">
          <i id="backward-btn" className="material-icons">
            arrow_backwards
          </i>
        </NavLink>
        <div id="project-details-header">
          <h1 id="project-name">{projectName}</h1>
          <div id="project-options">
            <button
              onClick={(e) => {
                toggleAddMemberForm(e);
                setIsAddingNewMember(true);
              }}
              id="add-member-btn"
            >
              Add member
            </button>
            <button
              onClick={() => {
                setIsMenuActive(!isMenuActive);
              }}
              id="project-more-options"
            >
              <i className="material-icons">more_horiz</i>
            </button>
            {isMenuActive && <div id="project-menu"></div>}
          </div>
        </div>
        <div id="project-details-body">
          <div className="details-body-col details-col">
            <h1 id="col-title" style={{}}>
              PROJECT DETAILS
            </h1>
            <div id="project-details">
              <div className="project-details-row description-row">
                <h1 id="row-title">Description</h1>
                <p id="project-desc">{projectDescription}</p>
                <a href={githubLink} target="_blank">
                  <img id="github_link" src={Github}></img>
                </a>
                <br />
                <h6>Technologies Used :</h6>
                <div className="technologies-cont ">{tagsList}</div>
                <div id="project-owner-box">
                  <div id="owner-pfp">
                    <img></img>
                  </div>
                  <div id="owner-details">
                    <h1>{}</h1>
                    <h6>Project Owner</h6>
                  </div>
                </div>
                <div id="project-members-box">
                  <div id="members-container">{membersList}</div>

                  <div id="view-more-members">
                    <h1
                      onClick={(e) => {
                        toggleAddMemberForm(e);
                        setIsAddingNewMember(false);
                      }}
                    >
                      View all members ({groupMembers ? groupMembers.length : 0}
                      )
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="details-body-col comments-col">
            <CommentBox project_id={projectData.id} />
          </div>
        </div>
      </section>
      {isAddingMember && (
        <div
          onClick={(e) => {
            toggleAddMemberForm(e);
          }}
          id="add-member-form-cont"
        >
          {isAddingNewMember ? (
            <div
              className="add-members-container"
              onClick={(e) => {
                e.stopPropagation();
                setIsAddingMember(true);
              }}
            >
              <div className="add-members-modal-header">
                <input
                  onChange={() => {
                    findGroupMembers();
                  }}
                  type="text"
                  placeholder="Find members..."
                ></input>
                <i className="material-icons">search</i>
              </div>
              <div className="add-members-modal-body">{cohortMembersList}</div>
            </div>
          ) : (
            isCheckingMembers || (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAddingMember(true);
                }}
                id="members-modal"
              >
                <div className="members-modal-header">
                  <input
                    onChange={(e) => {
                      setMemberSearchTerm(e.target.value);
                      findGroupMembers();
                    }}
                    type="text"
                    placeholder="Find members..."
                    value={memberSeachTerm}
                  ></input>
                  <i className="material-icons">search</i>
                </div>
                <div className="members-modal-body">{groupMembersList}</div>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
}

export default Projectdetails;
