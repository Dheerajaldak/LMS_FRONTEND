import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { createAccount } from "../Redux/Slices/AuthSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  function getImage(event) {
    event.preventDefault();
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }

  async function createNewAccount(event) {
    event.preventDefault();
    if (!signupData.email || !signupData.password || !signupData.fullName) {
      toast.error("Please fill all the details ❓", {
        position: "top-right",
      });
      return;
    }

    if (signupData.fullName.length < 3) {
      toast.error("Name should be at least 3 characters", {
        position: "top-right",
      });
      return;
    }

    if (
      !signupData.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("Invalid email id💥", {
        position: "top-right",
      });
      return;
    }

    if (
      !signupData.password.match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      )
    ) {
      toast.error(
        "Invalid password, it should be 6-16 characters long with at least a number and special character",
        {
          position: "top-right",
        }
      );
      return;
    }

    if (!signupData.avatar) {
      toast.error("Please upload an image🤳", {
        position: "top-right",
      });
      return;
    }

    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    const response = await dispatch(createAccount(formData));

    if (response?.payload?.success) navigate("/");
    setSignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });
    setPreviewImage("");
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center p-10">
        <form
          noValidate
          onSubmit={createNewAccount}
          className="flex flex-col justify-center gap-3 p-4 rounded-lg text-white w-full max-w-sm shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold mb-4">
            Registration Page
          </h1>

          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                className="w-24 h-24 rounded-full mx-auto"
                src={previewImage}
                alt="Preview"
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full mx-auto" />
            )}
          </label>
          <input
            onChange={getImage}
            type="file"
            name="image_uploads"
            className="hidden"
            id="image_uploads"
            accept=".jpg, .png, .svg, .jpeg"
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              required
              name="fullName"
              id="fullName"
              placeholder="Enter your name.."
              className="bg-transparent px-3 py-2 border rounded-md"
              onChange={handleUserInput}
              value={signupData.fullName}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter your email.."
              className="bg-transparent px-3 py-2 border rounded-md"
              onChange={handleUserInput}
              value={signupData.email}
            />
          </div>

          <div className="flex flex-col gap-1 relative">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                name="password"
                id="password"
                placeholder="Enter your password.."
                className="bg-transparent px-3 py-2 border rounded-md w-full pr-10"
                onChange={handleUserInput}
                value={signupData.password}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold mt-4"
          >
            Create account
          </button>

          <p className="text-center mt-2">
            Already have an account?
            <Link to="/login" className=" link text-accent cursor-pointer">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Signup;
