import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourseLecture, getCourseLectures } from "../../Redux/Slices/LectureSlice";

function DisplayLectures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(courseId, lectureId) {
    console.log("Deleting lecture:", courseId, lectureId);  // Log values for debugging
    await dispatch(deleteCourseLecture({ courseId, lectureId }));

    // Re-fetch the updated lectures after deletion (ensure your API is syncing the data correctly)
    await dispatch(getCourseLectures(courseId));
  }

  useEffect(() => {
    if (!state) navigate("/courses");
    dispatch(getCourseLectures(state._id)); // Get the lectures for the course
  }, [dispatch, state, navigate]);

  // Debugging: Check if the lecture URLs are valid
  const getVideoUrl = () => {
    const videoUrl = lectures[currentVideo]?.lectures?.secure_url;
    // console.log("Current Video URL:", videoUrl); // Debugging step to log the URL
    return videoUrl;
  };

  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
        <div className="text-center text-2xl font-semibold text-yellow-500">
          Course Name: {state?.title}
        </div>

        {lectures && lectures.length > 0 ? (
          <div className="flex justify-center gap-10 w-full">
            {/* Left section for playing videos and displaying course details */}
            <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
              {/* Check if video URL exists before rendering */}
              {getVideoUrl() ? (
                <video
                  src={getVideoUrl()}
                  className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                  controls
                  disablePictureInPicture
                  muted
                  controlsList="nodownload"
                  onError={(e) => {
                    console.error("Error loading video for URL: ", e.target.src);
                    alert("There was an error loading the video. Please try again later.");
                  }}
                >
                  <source
                    src={getVideoUrl()}
                    type="video/mp4"
                    onError={(e) => {
                      console.error("Error loading video:", e.target.src);
                      alert("Error loading video.");
                    }}
                  />
                </video>
              ) : (
                <div>Video could not be loaded. Please try again later.</div>
              )}

              <div>
                <h1>
                  <span className="text-yellow-500">Title: </span>
                  {lectures[currentVideo]?.title}
                </h1>
                <p>
                  <span className="text-yellow-500 line-clamp-4">Description: </span>
                  {lectures[currentVideo]?.description}
                </p>
              </div>
            </div>

            {/* Right section for displaying list of lectures */}
            <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
              <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                <p>Lectures list</p>
                {role === "ADMIN" && (
                  <button
                    onClick={() => navigate("/course/addlecture", { state: { ...state } })}
                    className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                  >
                    Add new lecture
                  </button>
                )}
              </li>
              {lectures &&
                lectures.map((lecture, idx) => {
                  return (
                    <li className="space-y-2" key={`${lecture._id}-${idx}`}> {/* Unique key with _id and idx */}
                      <p className="cursor-pointer" onClick={() => setCurrentVideo(idx)}>
                        <span>Lecture {idx + 1}: </span>
                        {lecture?.title}
                      </p>
                      {role === "ADMIN" && (
                        <button
                          onClick={() => onLectureDelete(state?._id, lecture._id)} // Corrected lectureId passing
                          className="btn-accent px-2 py-1 rounded-md font-semibold text-sm"
                        >
                          Delete lecture
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        ) : (
          role === "ADMIN" && (
            <button
              onClick={() => navigate("/course/addlecture", { state: { ...state } })}
              className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
            >
              Add new lecture
            </button>
          )
        )}
      </div>
    </HomeLayout>
  );
}

export default DisplayLectures;







