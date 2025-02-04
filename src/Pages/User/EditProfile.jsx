import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { useState } from "react";
import toast from "react-hot-toast";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state?.auth?.data?._id);

  const [data, setData] = useState({
    previewImage: "",
    fullName: "",
    avatar: undefined,
    userId: userId,
  });

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.onload = function () {
        setData({
          ...data,
          previewImage: fileReader.result,
          avatar: uploadImage,
        });
      };
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
  
    // Validate the form inputs
    if (!data.fullName || !data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }
    if (data.fullName.length < 3) {
      toast.error("Name cannot be of less than 3 characters");
      return;
    }
  
    // Prepare formData
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);
  
    // Dispatch update profile and user data fetching
    try {
      // Correctly pass the userId and formData
      await dispatch(updateProfile([data.userId, formData]));
  
      // Fetch the updated user data
      await dispatch(getUserData());
  
      navigate("/user/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error?.response?.data?.message || "Failed to update profile ⚠");
    }
  }
  

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-semibold">Edit Profile</h1>
          <label htmlFor="image_uploads" className="cursor-pointer">
            {data.previewImage ? (
              <img
                className="w-28 h-28 rounded-full m-auto"
                src={data.previewImage}
                alt="Profile Preview"
              />
            ) : (
              <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
            )}
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="hidden"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .png, .svg, .jpeg"
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="text-lg font-semibold">
              Full Name
            </label>
            <input
              type="text"
              required
              name="fullName"
              id="fullName"
              placeholder="Enter your name"
              className="bg-transparent px-2 py-1 border"
              value={data.fullName}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300"
          >
            Update Profile
          </button>
          <Link to="/user/profile">
            <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
              Go back to profile
            </p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}

export default EditProfile;
