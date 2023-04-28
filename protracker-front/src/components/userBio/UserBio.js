import React, { useEffect } from "react";
import "./UserBio.css";
import { useState } from "react";

function UserBio() {
  // selecting user avatars logic

  const [isAvatarBoxAcive, setAvatarBoxActive] = useState(false);

  let imageArray = [];

  const avatarboxclass = isAvatarBoxAcive ? "active" : "inactive";

  // toggling between viewing bio and updating bio;

  const [isViewingBio, setViewingBioActive] = useState(false);

  return (
    <section
      onClick={() => {
        setAvatarBoxActive(false);
      }}
      id="user-bio-section"
    >
      <div id="user-bio-container">
        <div id="user-details">
          <div className="user-details-col profile-col">
            <div id="user-profile-picture">
              <div id="picture-cont">
                <img src="https://i.pinimg.com/564x/51/90/4f/51904fc86411963d8701777a2a983049.jpg"></img>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setAvatarBoxActive(!isAvatarBoxAcive);
                }}
                id="edit-dp-container"
              >
                <h6>Edit</h6>
              </div>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setAvatarBoxActive(true);
              }}
              className={`avatar-container-${avatarboxclass}`}
              id="avatar-container"
            >
              <div id="bio-pointer"></div>
              <div id="avatar-box">
                <h6>Choose your avatar</h6>
                <div id="avatar-grid">
                  <div className="avatar-pod">
                    <div className="pod-img-cont">
                      <img
                        src="https://i.pinimg.com/564x/3a/59/26/3a5926e8a933fe43bbd0b59b4c72d819.jpg"
                        alt="avatar"
                      ></img>
                    </div>
                    <div className="avatar-loader"></div>
                  </div>
                  <div className="avatar-pod">
                    <div className="pod-img-cont">
                      <img
                        src="https://i.pinimg.com/564x/3a/59/26/3a5926e8a933fe43bbd0b59b4c72d819.jpg"
                        alt="avatar"
                      ></img>
                    </div>
                    <div className="avatar-loader"></div>
                  </div>{" "}
                  <div className="avatar-pod">
                    <div className="pod-img-cont">
                      <img
                        src="https://i.pinimg.com/564x/3a/59/26/3a5926e8a933fe43bbd0b59b4c72d819.jpg"
                        alt="avatar"
                      ></img>
                    </div>
                    <div className="avatar-loader"></div>
                  </div>{" "}
                  <div className="avatar-pod">
                    <div className="pod-img-cont">
                      <img
                        src="https://i.pinimg.com/564x/3a/59/26/3a5926e8a933fe43bbd0b59b4c72d819.jpg"
                        alt="avatar"
                      ></img>
                    </div>
                    <div className="avatar-loader"></div>
                  </div>{" "}
                  <div className="avatar-pod">
                    <div className="pod-img-cont">
                      <img
                        src="https://i.pinimg.com/564x/3a/59/26/3a5926e8a933fe43bbd0b59b4c72d819.jpg"
                        alt="avatar"
                      ></img>
                    </div>
                    <div className="avatar-loader"></div>
                  </div>{" "}
                  <div className="avatar-pod">
                    <div className="pod-img-cont">
                      <img
                        src="https://i.pinimg.com/564x/3a/59/26/3a5926e8a933fe43bbd0b59b4c72d819.jpg"
                        alt="avatar"
                      ></img>
                    </div>
                    <div className="avatar-loader"></div>
                  </div>{" "}
                  <div className="avatar-pod">
                    <div className="pod-img-cont">
                      <img
                        src="https://i.pinimg.com/564x/3a/59/26/3a5926e8a933fe43bbd0b59b4c72d819.jpg"
                        alt="avatar"
                      ></img>
                    </div>
                    <div className="avatar-loader"></div>
                  </div>{" "}
                  <div className="avatar-pod">
                    <div className="pod-img-cont">
                      <img
                        src="https://i.pinimg.com/564x/3a/59/26/3a5926e8a933fe43bbd0b59b4c72d819.jpg"
                        alt="avatar"
                      ></img>
                    </div>
                    <div className="avatar-loader"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="user-details-col info-col">
            {isViewingBio ? (
              <>
                <div id="update-profile-cont">
                  <button>
                    <i className="material-icons">edit</i>
                    Update profile
                  </button>
                </div>
                <h1 id="user-username">Jeff Maina</h1>
                <div id="bio_box">
                  <h2 className="section-header">BIO</h2>
                  <p id="bio-text">
                    Exercitation do minim voluptate consectetur excepteur id.
                    Proident labore labore labore adipisicing adipisicing est
                    sint ad sunt nostrud anim ad irure adipisicing. Ad ea ut
                    voluptate exercitation aute. Incididunt voluptate sint
                    adipisicing incididunt Lorem tempor occaecat enim laboris.
                  </p>
                </div>
                <div id="contacts-box">
                  <h2 className="section-header">CONTACTS</h2>
                  <div id="link-box">
                    <div>
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 128 96"
                        height="17"
                        id="email"
                        fill="#6b6b6b"
                      >
                        <path
                          d="M0 11.283V8a8 8 0 0 1 8-8h112a8 8 0 0 1 8 8v3.283l-64 40zm66.12 48.11a4.004 4.004 0 0 1-4.24 0L0 20.717V88a8 8 0 0 0 8 8h112a8 8 0 0 0 8-8V20.717z"
                          data-name="Layer 2"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="30"
                        data-name="Layer 1"
                        viewBox="0 0 24 24"
                        id="facebook"
                        fill="#6b6b6b"
                      >
                        <path d="M15.12,5.32H17V2.14A26.11,26.11,0,0,0,14.26,2C11.54,2,9.68,3.66,9.68,6.7V9.32H6.61v3.56H9.68V22h3.68V12.88h3.06l.46-3.56H13.36V7.05C13.36,6,13.64,5.32,15.12,5.32Z"></path>
                      </svg>
                    </div>
                    <div>
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 33.867 33.867"
                        id="linkedin"
                        fill="#6b6b6b"
                      >
                        <path
                          d="M5.692 1.058a3.33 3.33 0 0 0-3.308 3.33 3.33 3.33 0 0 0 3.33 3.33 3.33 3.33 0 0 0 3.329-3.33 3.33 3.33 0 0 0-3.33-3.33 3.33 3.33 0 0 0-.02 0zM3.97 10.38c-.88 0-1.588.708-1.588 1.588v19.262c0 .88.708 1.587 1.588 1.587h3.344c.88 0 1.587-.708 1.587-1.587V11.967c0-.88-.708-1.588-1.587-1.588H3.969zm9.732 0c-.88 0-1.588.708-1.588 1.588v19.262c0 .88.708 1.587 1.588 1.587h3.344c.88 0 1.587-.708 1.587-1.587V20.27c2.077-2.761 6.338-1.946 6.338 1.59v9.368c0 .88.708 1.587 1.588 1.587h3.344c.88 0 1.587-.708 1.587-1.587v-12.84c0-6.363-9.752-8.03-12.857-4.851v-1.571c0-.88-.708-1.588-1.587-1.588H13.7z"
                          paint-order="fill markers stroke"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="25"
                        data-name="Layer 1"
                        viewBox="0 0 24 24"
                        id="twitter"
                        fill="#6b6b6b"
                      >
                        <path d="M22,5.8a8.49,8.49,0,0,1-2.36.64,4.13,4.13,0,0,0,1.81-2.27,8.21,8.21,0,0,1-2.61,1,4.1,4.1,0,0,0-7,3.74A11.64,11.64,0,0,1,3.39,4.62a4.16,4.16,0,0,0-.55,2.07A4.09,4.09,0,0,0,4.66,10.1,4.05,4.05,0,0,1,2.8,9.59v.05a4.1,4.1,0,0,0,3.3,4A3.93,3.93,0,0,1,5,13.81a4.9,4.9,0,0,1-.77-.07,4.11,4.11,0,0,0,3.83,2.84A8.22,8.22,0,0,1,3,18.34a7.93,7.93,0,0,1-1-.06,11.57,11.57,0,0,0,6.29,1.85A11.59,11.59,0,0,0,20,8.45c0-.17,0-.35,0-.53A8.43,8.43,0,0,0,22,5.8Z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div id="update-form-container">
                <form >
                  <div className="form-group">
                    <label>Username</label>
                    <input type="text"></input>
                  </div>
                  <div className="form-group">
                    <label>Bio</label>
                    <textarea type="text"></textarea>
                  </div>
                  <div className="form-group">
                    <label>Github link</label>
                    <input type="text"></input>
                  </div>
                  <div id="form-buttons">
                    <button>Save</button>
                    <button>Cancel</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
        <div id="user-data"></div>
      </div>
    </section>
  );
}

export default UserBio;
