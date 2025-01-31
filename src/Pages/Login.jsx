import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { login } from "../Redux/Slices/AuthSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  async function onLogin(event) {
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the details ❓", {
        position: "top-right",
      });
      return;
    }
    //dispatch create account action
    const response = await dispatch(login(loginData));

    if (response?.payload?.success) navigate("/");
    setSignupData({
      email: "",
      password: "",
    });
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center p-10">
        <form
          noValidate
          onSubmit={onLogin}
          className="flex flex-col justify-center gap-3 p-4 rounded-lg text-white w-full max-w-sm shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold mb-4">Login Page</h1>

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
              value={loginData.email}
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
                value={loginData.password}
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
            Login
          </button>

          <p className="text-center mt-2">
            Donot have an account?
            <Link to="/signup" className=" link text-accent cursor-pointer">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Login;
