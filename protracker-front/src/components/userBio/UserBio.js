import React, { useEffect } from "react";
import "./UserBio.css";
import { useState } from "react";

function UserBio() {

    // selecting user avatars logic

    const[isAvatarBoxAcive, setAvatarBoxActive] = useState(false);

    let imageArray = []

    const avatarboxclass = isAvatarBoxAcive ? "active" : "inactive";

  return (
    <section onClick={()=>{setAvatarBoxActive(false)}} id="user-bio-section">
      <div id="user-bio-container">
        <div id="user-details">
          <div className="user-details-col profile-col">
            <div id="user-profile-picture">
              <div id="picture-cont">
                <img src="https://i.pinimg.com/564x/51/90/4f/51904fc86411963d8701777a2a983049.jpg"></img>
              </div>
              <div onClick={(e)=>{
                e.stopPropagation()
                setAvatarBoxActive(!isAvatarBoxAcive)}} id="edit-dp-container">
                <h6>Edit</h6>
              </div>
            </div>
            <div onClick={(e)=>{
                e.stopPropagation()
                setAvatarBoxActive(true)}} className={`avatar-container-${avatarboxclass}`} id="avatar-container">
                <div id="bio-pointer"></div>
                <div id="avatar-box">
                    <h6>Choose your avatar</h6>
                    <div id="avatar-grid">

                        <div className="avatar-pod">
                          <div className="pod-img-cont">
                            <img src="https://i.pinimg.com/564x/3a/59/26/3a5926e8a933fe43bbd0b59b4c72d819.jpg" alt="avatar"></img>
                          </div>
                          <div className="avatar-loader"></div>
                        </div>
                        <div className="avatar-pod">
                          <div className="pod-img-cont">
                            <img src="https://i.pinimg.com/564x/3a/59/26/3a5926e8a933fe43bbd0b59b4c72d819.jpg" alt="avatar"></img>
                          </div>
                          <div className="avatar-loader"></div>
                        </div>                        <div className="avatar-pod">
                          <div className="pod-img-cont">
                            <img src="https://i.pinimg.com/564x/3a/59/26/3a5926e8a933fe43bbd0b59b4c72d819.jpg" alt="avatar"></img>
                          </div>
                          <div className="avatar-loader"></div>
                        </div>                        <div className="avatar-pod">
                          <div className="pod-img-cont">
                            <img src="https://i.pinimg.com/564x/3a/59/26/3a5926e8a933fe43bbd0b59b4c72d819.jpg" alt="avatar"></img>
                          </div>
                          <div className="avatar-loader"></div>
                        </div>                        <div className="avatar-pod">
                          <div className="pod-img-cont">
                            <img src="https://i.pinimg.com/564x/3a/59/26/3a5926e8a933fe43bbd0b59b4c72d819.jpg" alt="avatar"></img>
                          </div>
                          <div className="avatar-loader"></div>
                        </div>                        <div className="avatar-pod">
                          <div className="pod-img-cont">
                            <img src="https://i.pinimg.com/564x/3a/59/26/3a5926e8a933fe43bbd0b59b4c72d819.jpg" alt="avatar"></img>
                          </div>
                          <div className="avatar-loader"></div>
                        </div>                        <div className="avatar-pod">
                          <div className="pod-img-cont">
                            <img src="https://i.pinimg.com/564x/3a/59/26/3a5926e8a933fe43bbd0b59b4c72d819.jpg" alt="avatar"></img>
                          </div>
                          <div className="avatar-loader"></div>
                        </div>                        <div className="avatar-pod">
                          <div className="pod-img-cont">
                            <img src="https://i.pinimg.com/564x/3a/59/26/3a5926e8a933fe43bbd0b59b4c72d819.jpg" alt="avatar"></img>
                          </div>
                          <div className="avatar-loader"></div>
                        </div>
                    </div>

                </div>
            </div>
          </div>
          <div className="user-details-col info-col">
            <h1>Jeff Maina</h1>
          </div>
        </div>
        <div id="user-data"></div>
      </div>
    </section>
  );
}

export default UserBio;


