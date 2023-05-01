import { useState } from "react";

function EmailEntry() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  let handleSendingEmail = () => {
    let emailBody = {
      email: email,
    };
    fetch(`http://localhost:3000/password_reset/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailBody),
    }).then((response) => {
      console.log(response.json());
      if (response.ok) {
        alert("Success");
      } else if (!response.ok) {
        alert("Error");
      }
    });
  };

  return (
    <div>
      <form class="space-y-4 md:space-y-6" action="#">
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            name="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            value={email}
            required=""
          />
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            handleSendingEmail();
          }}
          type="submit"
          class="w-full text-red bg-primary-000 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Send Email
        </button>
      </form>
    </div>
  );
}

export default EmailEntry;
