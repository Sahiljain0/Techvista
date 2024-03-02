import React, { useState } from "react";
import SignUpForm from "./Dashsignup";
import LoginForm from "./Dashlogin";
import TaskManager from "./Todolist";

function Dashboard() {
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleSignUpForm = () => {
    setShowSignUpForm(!showSignUpForm);
    setShowLoginForm(false);
  };

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
    setShowSignUpForm(false);
    setIsLoggedIn(false); // Reset isLoggedIn state when login form is toggled
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center">
      {/* Header */}
      <header className="absolute px-10 top-0 left-0 right-0 bg-black rounded-xl shadow border-2 border-solid border-white flex justify-between items-center py-6">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="flex gap-4">
          {!isLoggedIn && (
            <>
              <button
                onClick={toggleSignUpForm}
                className="bg-white font-bold rounded-xl border-2 text-black py-2 px-4 hover:bg-gray-800 hover:text-white transition duration-300"
              >
                Sign Up
              </button>
              <button
                onClick={toggleLoginForm}
                className="bg-white font-bold rounded-xl border-2 text-black py-2 px-4 hover:bg-gray-800 hover:text-white transition duration-300"
              >
                Login
              </button>
            </>
          )}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-white font-bold rounded-xl border-2 text-black py-2 px-4 hover:bg-gray-800 hover:text-white transition duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      {/* Welcome Message */}
      {!isLoggedIn && (
        <h2 className="text-2xl font-bold text-white mt-20">
          Welcome to the Task Manager
        </h2>
      )}

      {/* TaskManager */}
      {isLoggedIn && (
        <div className="flex justify-center items-center mt-20">
          <TaskManager />
        </div>
      )}

      {/* Modal for SignUp Form */}
      {showSignUpForm && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center">
          <SignUpForm onClose={toggleSignUpForm} />
        </div>
      )}

      {/* Modal for Login Form */}
      {showLoginForm && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center">
          <LoginForm
            onClose={() => {
              toggleLoginForm();
              setIsLoggedIn(true);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
