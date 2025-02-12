import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux"; // Ensure this is imported
import { useLocation, useNavigate } from "react-router-dom";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";
import HomeLayout from "../../Layouts/HomeLayout";

function AddLecture() {
  const courseDetails = useLocation().state; // Get the course details from location state
  const dispatch = useDispatch(); // Initialize dispatch here
  const navigate = useNavigate();

  // If courseDetails is not found, navigate back to the courses list
  useEffect(() => {
    if (!courseDetails || !courseDetails._id) {
      toast.error("Course not found.");
      navigate("/courses");
    }
  }, [courseDetails, navigate]);

  const [userInput, setUserInput] = useState({
    id: courseDetails?._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  function handleVideo(e) {
    const video = e.target.files[0];
    const source = window.URL.createObjectURL(video);
    setUserInput({
      ...userInput,
      lecture: video,
      videoSrc: source,
    });
  }

  // Function to handle the form submission
  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.lecture || !userInput.title || !userInput.description) {
      toast.error("All fields are mandatory");
      return;
    }

    // Dispatch the Redux action to add the lecture
    try {
      const response = await dispatch(addCourseLecture(userInput)); // Dispatching the action

      // Handle the response from the dispatched action
      if (response?.payload?.success) {
        toast.success("Lecture added successfully!");
        navigate(-1); // Navigate back to the previous page after successful upload
        setUserInput({
          id: courseDetails?._id,
          lecture: undefined,
          title: "",
          description: "",
          videoSrc: "",
        });
      } else {
        toast.error(response?.payload?.message || "Failed to add lecture");
      }
    } catch (error) {
      console.error("Error adding lecture:", error);
      toast.error("Failed to add lecture.");
    }
  }

  return (
    <HomeLayout>
      <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16">
        <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
          <header className="flex items-center justify-center relative">
            <button
              className="absolute left-2 text-xl text-green-500"
              onClick={() => navigate(-1)}
            >
              <AiOutlineArrowLeft />
            </button>
            <h1 className="text-xl text-yellow-500 font-semibold">
              Add new lecture
            </h1>
          </header>
          <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              placeholder="Enter the title of the lecture"
              onChange={handleInputChange}
              className="bg-transparent px-3 py-1 border"
              value={userInput.title}
            />
            <textarea
              name="description"
              placeholder="Enter the description of the lecture"
              onChange={handleInputChange}
              className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-36"
              value={userInput.description}
            />
            {userInput.videoSrc ? (
              <video
                muted
                src={userInput.videoSrc}
                controls
                controlsList="nodownload"
                disablePictureInPicture
                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
              />
            ) : (
              <div className="h-48 border flex items-center justify-center cursor-pointer">
                <label className="font-semibold text-cl cursor-pointer" htmlFor="lecture">
                  Choose your video
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="lecture"
                  name="lecture"
                  onChange={handleVideo}
                  accept="video/mp4, video/mkv, video/*" // Restrict to video files
                />
              </div>
            )}
            <button type="submit" className="btn btn-primary py-1 font-semibold text-lg">
              Add new Lecture
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AddLecture;





