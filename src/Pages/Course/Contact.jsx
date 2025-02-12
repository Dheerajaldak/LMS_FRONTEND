import React, { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { isEmail } from "../../Helpers/regexMatcher";
import axiosInstance from "../../Helpers/axiosinstance";

const Contact = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(true);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });

    if (name === "email") {
      setIsEmailValid(isEmail(value)); // Real-time email validation
    }
  }

  async function onFormSubmit(e) {
    e.preventDefault();
  
    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("All fields are mandatory 💬");
      return;
    }
  
    if (!isEmailValid) {
      toast.error("Invalid email 🚫");
      return;
    }
  
    try {
      const promise = axiosInstance.post("/miscellaneous/contact", userInput); // This is the promise we want to pass
  
      toast.promise(promise, {
        loading: "Submitting your message...",
        success: "Form submitted successfully",
        error: "Failed to submit the form",
      });
  
      const response = await promise;  // Wait for the response here
  
      if (response?.data?.success) {
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
      }
  
    } catch (err) {
      toast.error("Operation Failed");
      console.error("Error during form submission:", err.response || err);
    }
  }
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        <form
          noValidate
          onSubmit={onFormSubmit}
          className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl shadow-lg bg-gray-800 text-white max-w-sm w-full"
        >
          <h1 className="text-2xl font-semibold text-center text-yellow-400">Contact Us</h1>

          <div className="flex flex-col w-full gap-2">
            <label htmlFor="name" className="text-lg font-semibold text-gray-300">
              Name
            </label>
            <input
              type="text"
              className="bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 px-4 py-2 rounded-md shadow-sm text-white"
              id="name"
              name="name"
              value={userInput.name}
              placeholder="Enter your name"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col w-full gap-2">
            <label htmlFor="email" className="text-lg font-semibold text-gray-300">
              Email
            </label>
            <input
              type="email"
              className={`bg-gray-700 border ${isEmailValid ? "border-gray-600" : "border-red-500"} focus:outline-none focus:ring-2 focus:ring-yellow-500 px-4 py-2 rounded-md shadow-sm text-white`}
              id="email"
              name="email"
              value={userInput.email}
              placeholder="Enter your email"
              onChange={handleInputChange}
            />
            {!isEmailValid && (
              <p className="text-red-500 text-sm mt-1">Please enter a valid email</p>
            )}
          </div>

          <div className="flex flex-col w-full gap-2">
            <label htmlFor="message" className="text-lg font-semibold text-gray-300">
              Message
            </label>
            <textarea
              onChange={handleInputChange}
              className="bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 px-4 py-2 rounded-md shadow-sm resize-none h-32 text-white"
              id="message"
              name="message"
              value={userInput.message}
              placeholder="Enter your message"
            />
          </div>

          <button
            className="w-full bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-md py-2 text-lg font-semibold text-white"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Contact;

