import React, { useEffect, useState } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function Navbar() {
  let [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/notifications",{
      headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
      }
    })
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

  const markAsRead = () => {
    fetch("http://localhost:3000/mark_as_read",{
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
    }
    }).then(response => {
    console.log(response)})
  };


  let unreadMessages = notifications.filter((notif)=>{return notif.read === false});
  let groupMessages = notifications.filter((notif)=>{return notif.notification_type === "Added to cohort" || notif.notification_type === "Added to project"});
  let interactionMessages = notifications.filter((notif)=>{return notif.notification_type === "Achievements unlocked" || notif.notification_type === "Project comment" || notif.notification_type === "Comment reply"});


  let[isAllNotifications, setAllNotifications] = useState(true);
  let[isGroupNotifications, setGroupNotifications] = useState(false);
  let[isInteractionMessages, setInteractionMessages] = useState(false);


  // NUMBER OF UNREAD MESSAGES;

  let unreadGroup = groupMessages.filter((notif) => {return notif.read === false}).length
  let unreadInteractions = interactionMessages.filter((notif) => {return notif.read === false}).length


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
        <h5 className="comment-link">
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
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" class="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              ProTracker
            </span>
          </a>
          {/* <div class="flex items-center md:order-2">
            <button
              type="button"
              class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span class="sr-only">Open user menu</span>
              <img
                class="w-8 h-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                alt="user photo"
              />
            </button>

            notification

            <button
              id="dropdownNotificationButton"
              data-dropdown-toggle="dropdownNotification"
              class="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
              type="button"
            >
              <svg
                class="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
              </svg>
              <div class="relative flex">
                <div class="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3 dark:border-gray-900"></div>
              </div>
            </button>
            <div
              id="dropdownNotification"
              class="z-20 w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700 absolute -top-2"
              aria-labelledby="dropdownNotificationButton"
            >
              <div class="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                Notifications
              </div>
              <div style={{maxHeight : "3em"}} class="divide-y divide-gray-100 dark:divide-gray-700 overflow-y-scroll">
                {notificationsList}
              </div>
              <a
                href="#"
                class="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
              >
                <div class="inline-flex items-center ">
                  <svg
                    class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                    <path
                      fill-rule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  View all
                  </div>
              </a>
            </div>
            avatar and settings
            <div
              class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              id="user-dropdown"
            >
              <div class="px-4 py-3">
                <span class="block text-sm text-gray-900 dark:text-white">
                  Jeff Maina
                </span>
                <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  jeff.maina@moringaschool.com
                </span>
              </div>
              <ul class="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div> */}
          {/* <form class="flex items-center">
              <label for="simple-search" class="sr-only">
                Search Projects
              </label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                  required
                />
              </div>
              <button
                type="submit"
                class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <span class="sr-only">Search</span>
              </button>
            </form> */}
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
            </div>
            <div id="notif-cont">
           {unreadMessages.length > 0 &&  <div id="notif-count">
                <h6>{unreadMessages.length}</h6>
              </div>}
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
                      <h6 onClick={()=>{
                        markAsRead()
                      }}>Mark all as done</h6>
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
                       {unreadMessages.length > 0 && <h5>{unreadMessages.length}</h5>}
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
                        {unreadGroup > 0 && <h5>{unreadGroup}</h5>}
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
                        {unreadInteractions > 0 && <h5>{unreadInteractions}</h5>}
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
