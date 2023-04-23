import React, { useState } from "react";
import "./projectdetails.css";
import CommentBox from "../comments/CommentBox";
import Github from "./assets/github.png";
import Html from "./assets/html.png";
import javascript from "./assets/javascript.png";
import angular from "./assets/angular.png";
import mongo from "./assets/mongodb.png";
import postgres from "./assets/postgresql.png";
import tailwind from "./assets/tailwind-css.png";

function Projectdetails() {
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [isAddingNewMember, setIsAddingNewMember] = useState(false);
  const [isCheckingMembers, setIsCheckingMembers] = useState(false);

  let toggleAddMemberForm = (e) => {
    setIsAddingMember(!isAddingMember);
    e.stopPropagation();
  };

  return (
    <>
      <section id="project-details-container">
        <div id="project-details-header">
          <h1 id="project-name">Protracker Website</h1>
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
            <button id="project-more-options">
              <i className="material-icons">more_horiz</i>
            </button>
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
                <p id="project-desc">
                  Elit laborum consectetur veniam mollit sint consequat duis et
                  culpa ut. Eiusmod ullamco culpa esse ipsum consequat cillum
                  voluptate. Deserunt sint adipisicing do cupidatat consectetur
                  ex qui culpa qui ipsum qui ad laboris. Duis laboris sint
                  occaecat veniam irure et dolore do aliqua consequat quis
                  laborum incididunt mollit. Reprehenderit pariatur dolor
                  eiusmod ea non proident dolor veniam Lorem amet exercitation
                  cupidatat veniam reprehenderit. Nostrud dolore anim dolore
                  amet. Ea incididunt veniam occaecat nostrud occaecat occaecat
                  qui laboris sint consectetur esse velit ad quis. Commodo
                  excepteur fugiat laborum qui est ut reprehenderit laborum
                  ipsum eu Lorem. Adipisicing id consectetur ullamco sint nisi
                  ut. Sunt sint velit sit deserunt Lorem culpa ullamco pariatur
                  nisi quis. Qui ea esse nulla magna pariatur mollit quis
                  mollit. Qui officia deserunt esse anim ad culpa eiusmod.
                </p>
                <img id="github_link" src={Github}></img>
                <br />
                <h6>Technologies Used :</h6>
                <div className="technologies-cont ">
                  <img src={Html}></img>
                  <img src={mongo}></img>
                  <img src={angular}></img>
                  <img src={javascript}></img>
                  <img src={postgres}></img>
                  <img src={tailwind}></img>
                </div>
                <div id="project-owner-box">
                  <div id="owner-pfp">
                    <img src="https://i.pinimg.com/564x/f7/98/0b/f7980b49550ee31940e9fde73ae5cd5c.jpg"></img>
                  </div>
                  <div id="owner-details">
                    <h1>Jeff Maina</h1>
                    <h6>Project Owner</h6>
                  </div>
                </div>
                <div id="project-members-box">
                  <div id="members-container">
                    <div id="group-member-box">
                      <div id="group-member-pfp">
                        <img src="https://i.pinimg.com/736x/57/2f/41/572f41ad6a4208d0fcd5cf75a53ac219.jpg"></img>
                      </div>
                      <div id="group-member-details">
                        <h1>Fred Kamuyu</h1>
                        <h6>Project Member</h6>
                      </div>
                    </div>

                    <div id="group-member-box">
                      <div id="group-member-pfp">
                        <img src="https://i.pinimg.com/564x/9e/86/cb/9e86cb23f11fe88e3c8312ef129eb1d2.jpg"></img>
                      </div>
                      <div id="group-member-details">
                        <h1>Elly Kipchumba</h1>
                        <h6>Project Member</h6>
                      </div>
                    </div>

                    <div id="group-member-box">
                      <div id="group-member-pfp">
                        <img src="https://i.pinimg.com/736x/a1/27/69/a127693edb8836f9a32aa530b08557b3.jpg"></img>
                      </div>
                      <div id="group-member-details">
                        <h1>Paul Mihang'o</h1>
                        <h6>Project Member</h6>
                      </div>
                    </div>
                  </div>

                  <div id="view-more-members">
                    <h1
                      onClick={(e) => {
                        toggleAddMemberForm(e);
                        setIsAddingNewMember(false);
                      }}
                    >
                      View more members (8)
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="details-body-col comments-col">
            <CommentBox />
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
            <form
              onClick={(e) => {
                e.stopPropagation();
                setIsAddingMember(true);
              }}
            >
                <h1>Add member form</h1>
            </form>
          ) : (
            isCheckingMembers || (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAddingMember(true);
                }}
                id="members-modal"
              >
                <h1>Members List</h1>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
}

export default Projectdetails;
