import React, { useEffect, useState } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import logo from "./assets/protracker-final-logo.png";

function Navbar() {
  let [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/notifications")
      .then((response) => response.json())
      .then((data) => {
        setNotifications(data);
      });
  }, []);

  console.log(notifications);

  let formatTimestamp = (timestamp) => {
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " yrs ago";
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hrs ago";
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 60) {
      return "1 hour ago";
    } else if (interval === 0) {
      return "just now";
    } else {
      return interval + " mins ago";
    }

    return Math.floor(seconds) + " s ago";
  };

  const markAsRead = (notifId) => {
    console.log(notifId);
  };


  let unreadMessages = notifications.filter((notif)=>{return notif.read === false});
  let groupMessages = notifications.filter((notif)=>{return notif.notification_type === "Added to cohort" || notif.notification_type === "Added to project"});
  let interactionMessages = notifications.filter((notif)=>{return notif.notification_type === "Achievements unlocked" || notif.notification_type === "Project comment" || notif.notification_type === "Comment reply"});


  let[isAllNotifications, setAllNotifications] = useState(true);
  let[isGroupNotifications, setGroupNotifications] = useState(false);
  let[isInteractionMessages, setInteractionMessages] = useState(false);


  console.log(unreadMessages.length)
  console.log(groupMessages.length)
  console.log(interactionMessages.length)

  let allNotificationsList = notifications.map((notification) => {
    let timestamp = formatTimestamp(notification.created_at);
    let readStatus = notification.read ? "green" : "red";
    return (
      <div className="notification-pod">
      <div style={{backgroundColor : readStatus}} id="read-status"></div>
      <div id="notif-details">
        <h5>
          {notification.message}
        </h5>
        <h6>{timestamp}</h6>
      </div>
    </div>
    );
  });


  let groupNotificationsList = groupMessages.map((notification) => {
    let timestamp = formatTimestamp(notification.created_at);
    let readStatus = notification.read ? "green" : "red";
    return (
      <div className="notification-pod">
      <div style={{backgroundColor : readStatus}} id="read-status"></div>
      <div id="notif-details">
        <h5>
          {notification.message}
        </h5>
        <h6>{timestamp}</h6>
      </div>
    </div>
    );
  });

  let interactionMessagesList = interactionMessages.map((notification) => {
    let timestamp = formatTimestamp(notification.created_at);
    let readStatus = notification.read ? "green" : "red";
    return (
      <div className="notification-pod">
      <div style={{backgroundColor : readStatus}} id="read-status"></div>
      <div id="notif-details">
        <h5>
          {notification.message}
        </h5>
        <h6>{timestamp}</h6>
      </div>
    </div>
    );
  });

  // toggling user notifications

  const [areNotificationsVisible, setNotificationsVisible] = useState();
  const [isUserProfileVisible, setUserProfileVisible] = useState();

  const profileClass = isUserProfileVisible ? "active" : "disabled";
  const notifClass = areNotificationsVisible ? "active" : "disabled";

  document.addEventListener("click", () => {
    setNotificationsVisible(false);
    setUserProfileVisible(false);
  });

  // toggling user category;

  let handleToggleNofitCategory = (left, width) => {
    let indicator = document.getElementById("notif-indicator");
    indicator.style.left = `${left}em`;
    indicator.style.width = `${width}em`;
  };


  let handleAllMessages = ()=>{
    setAllNotifications(true)
    setGroupNotifications(false)
    setInteractionMessages(false)
  };
  let handleGroupMessages = ()=>{
    setAllNotifications(false)
    setGroupNotifications(true)
    setInteractionMessages(false)
  };
  let handleInteractionMessages = ()=>{
    setAllNotifications(false)
    setGroupNotifications(false)
    setInteractionMessages(true)
  };


  return (
    <>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex justify-items-center mx-4 p-4">
        <div class="navbar-container">
          <a href="http://localhost:3000/" class="flex items-start">
            <img
              src={logo}
              class="h-12 mr-1"
              alt="ProTracker Logo"
            />
          
          </a>
        </div>
          <div id="my_profile">
            <div
              onClick={(e) => {
                e.stopPropagation();
                setNotificationsVisible(false);
                setUserProfileVisible(!isUserProfileVisible);
              }}
              id="current-user-pfp"
            >
              <NavLink to="/userprofile">
                <img src="https://i.pinimg.com/564x/0b/46/fd/0b46fd8d2bc862ada06df6ce760da981.jpg"></img>
              </NavLink>
              {/* <div
                className={`container-${profileClass}`}
                id="user-profile-bar"
              >
                <div id="profile-pointer"></div> */}
                {/* <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserProfileVisible(true);
                  }}
                  id="my-profile-bar"
                ></div> */}
              {/* </div> */}
            </div>
            <div id="notif-cont">
              <div id="notif-count">
                <h6>{unreadMessages.length}</h6>
              </div>
              <i
                onClick={(e) => {
                  e.stopPropagation();
                  setNotificationsVisible(!areNotificationsVisible);
                  setUserProfileVisible(false);
                }}
                className="material-icons"
              >
                notifications
              </i>
              <div
                className={`container-${notifClass}`}
                id="notifications-container"
              >
                <div id="pointer"></div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setNotificationsVisible(true);
                  }}
                  id="notif-container"
                >
                  <div id="notif-cont-header">
                    <div id="mark-as-done">
                      <h5>Notifications</h5>
                    </div>
                    <div id="notif-category">
                      <span
                        onClick={() => {
                          handleToggleNofitCategory(0.5, 6);
                          handleAllMessages()
                        }}
                      >
                        <i className="material-icons">all_inclusive</i>
                        <h6>All</h6>
                        <h5>{unreadMessages.length}</h5>
                      </span>
                      <h6>.</h6>
                      <span
                        onClick={() => {
                          handleToggleNofitCategory(7, 7.2);
                          handleGroupMessages()
                        }}
                      >
                        <i className="material-icons">groups</i>
                        <h6>Groups</h6>
                        <h5>{groupMessages.length}</h5>
                      </span>{" "}
                      <h6>.</h6>
                      <span
                        onClick={() => {
                          handleToggleNofitCategory(15, 9.2);
                          handleInteractionMessages()
                        }}
                      >
                        <i>@</i>
                        <h6>Interactions</h6>
                        <h5>{interactionMessages.length}</h5>
                      </span>{" "}
                    </div>
                    <div id="notif-indicator"></div>
                  </div>
                  <div id="notifications-box">
                  {isAllNotifications && allNotificationsList}
                  {isGroupNotifications && groupNotificationsList}
                  {isInteractionMessages && interactionMessagesList}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
