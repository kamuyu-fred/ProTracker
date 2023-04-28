import React, { useEffect, useState } from "react";

function AdminDashUsers() {
  // retrieving all users in the database;
  const token = localStorage.getItem("jwt"); //store token in localStorage

  const [allUsers, setallUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/all_users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setallUsers(data);
      });
  }, []);

  let usersList = allUsers.map((user)=>{

    let userRole = user.admin ? 'Admin' : 'Student';
    let online_status = user.online_status === "online" ? "green" : "red";
    let avatar_url =
    user.avatar_url === null
      ? "https://i.pinimg.com/736x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg"
      : user.avatar_url;


    let handleMakingAdmin = (id) => {
      console.log(id)
    }

    let handleBanning = (id) => {
      console.log(id)
    }

    return(
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th
          scope="row"
          class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <img
            class="w-10 h-10 rounded-full"
            src={avatar_url}
            alt="Jese image"
          />
          <div class="pl-3">
            <div class="text-base font-semibold">{user.username}</div>
            <div class="font-normal text-gray-500">
              {user.email}
            </div>
          </div>
        </th>
        <td class="px-6 py-4">{userRole}</td>
        <td class="px-6 py-4">
          <div class="flex items-center">
            <div class={`h-2.5 w-2.5 rounded-full bg-${online_status}-500 mr-2`}></div>{" "}
            {user.online_status}
          </div>
        </td>
        <td class="px-6 py-4">
          <button
            onClick={()=>{
                handleMakingAdmin(user.id)
            }}
            class="font-medium text-green-600 dark:text-blue-500 hover:underline"
          >
            Make admin
          </button>
        </td>
        <td class="px-6 py-4">
          <button
          onClick={()=>{
            handleBanning(user.id)
          }}
            class="font-medium text-red-600 dark:text-blue-500 hover:underline"
          >
            Ban User
          </button>
        </td>
      </tr>
    )
  })

  return (
    <div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div>

            {/* Dropdown */}

            <div
              id="dropdownAction"
              class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
              <ul
                class="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownActionButton"
              >
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Ban
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Promote to Admin
                  </a>
                </li>
              </ul>
              <div class="py-1">
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Delete User
                </a>
              </div>
            </div>
          </div>
          <label for="table-search" class="sr-only">
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
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
              id="table-search-users"
              class="block p-2 pl-10 text-sm text-gray-900 border border-white rounded-lg w-80 bg-white focus:ring-orange-600 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
            />
          </div>
        </div>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="p-4">
                <div class="flex items-center">
                  {/* <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> */}
                  <label for="checkbox-all-search" class="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Position
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
        <tbody>
            {usersList}
        </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashUsers;
