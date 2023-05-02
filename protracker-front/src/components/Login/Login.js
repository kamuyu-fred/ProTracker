import React, { useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import logo from "./assets/protracker-final-logo.png";


function Login() {

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[isLoggedIn, setIsLoggedIn] = useState(false);


    let handleLogin =  () => {

        let obj = {
            email,
            password
        }

        fetch("http://localhost:3000/login",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(obj)
        })
        .then(response => {
          if (response.ok) {
            setIsLoggedIn(true)
            return response.json().then((data) => {
              console.log(data);
              let token = data.token;
              let role = data.user.admin;
              let userId = data.user.id

              localStorage.setItem('jwt', token.toString());
              localStorage.setItem('admin', role.toString());
              localStorage.setItem('userId', userId.toString());
              

              console.log(role)
            });
          } else if (!response.ok) {
            return response.json().then((error) => {
              let notFound = error["message"];
              let invalidCredentials = error["error"];
              let errorMessage = error["message"] === undefined ? invalidCredentials : notFound;
              alert(errorMessage)
            });
          }
        })

    };

    if(isLoggedIn){
      return ( <Redirect to="/cohortlist"/>)
    }


  return (
    <div id="login-form-container">
      <section class="bg-white dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-8 py-10 mx-auto md:h-screen lg:py-0">
        <a href="http://localhost:3000/" class="flex items-start">
            <img
              src={logo}
              class="h-20 mr-1"
              alt="ProTracker Logo"
            />
          
          </a>
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@student.moringaschool.com"
                    value={email}
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-orange-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="remember"
                        class="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  onClick={(e)=>{
                    e.preventDefault();
                    handleLogin()
                  }}
                  type="submit"
                  class="w-full text-red bg-orange-600 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="/signup"
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
