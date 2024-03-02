import React, { useState } from "react";

function LoginForm({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve user details from local storage
    const userData = JSON.parse(localStorage.getItem("userData"));

    // Check if user exists and password matches
    if (
      !userData ||
      userData.username !== username ||
      userData.password !== password
    ) {
      setErrorMessage("Invalid username or password.");
      return;
    }

    // If validation passes, close the login form
    onClose();
  };

  const handleCancel = () => {
    // Clear form fields and close the login form
    setUsername("");
    setPassword("");
    onClose();
  };

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit} className="w-full p-8">
            <h1 className="self-center font-serif font-bold text-4xl">Login</h1>
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            <div className="mb-4 mt-4">
              <label
                htmlFor="username"
                className="block text-sm font-bold text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 focus:ring-black border-2  border-gray-300 block w-full shadow-sm sm:text-sm  rounded-md px-3 py-2"
                required // Add required attribute
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 focus:ring-black border-2  border-gray-300 block w-full shadow-sm sm:text-sm  rounded-md px-3 py-2"
                required // Add required attribute
              />
            </div>
            <div className="flex justify-between gap-8 items-center">
              <button
                type="button"
                onClick={handleCancel} // Use handleCancel for cancel button
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-700 text-base font-bold text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-700 text-base font-bold text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
