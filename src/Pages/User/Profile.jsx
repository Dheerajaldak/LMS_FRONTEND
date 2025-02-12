import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data);

async function handleCancellation() {
  toast("Initiating cancellation")
  await dispatch(cancelCourseBundle());
  await dispatch(getUserData())
  toast.success("Cancellation completed")
  navigate("/")
}

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center p-4">
        <div className="my-10 flex flex-col gap-6 rounded-lg p-6 text-white w-full max-w-md shadow-xl bg-gray-800">
          {/* Profile Avatar */}
          <img
            src={userData?.avatar?.secure_url}
            className="w-32 h-32 m-auto rounded-full border-4 border-yellow-500"
            alt="User Avatar"
          />
          
          {/* Full Name */}
          <h3 className="text-2xl font-semibold text-center capitalize">{userData?.fullName}</h3>

          {/* User Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="font-medium">Email:</p>
            <p className="text-gray-300">{userData?.email}</p>

            <p className="font-medium">Role:</p>
            <p className="text-gray-300">{userData?.role}</p>

            <p className="font-medium">Subscription:</p>
            <p className={`text-${userData?.subscription?.state === 'active' ? 'green' : 'red'}-500`}>
              {userData?.subscription?.state === "active" ? "Active" : "Inactive"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:gap-4 sm:justify-between">
            <Link
              to="/changepassword"
              className="w-full sm:w-[48%] bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 rounded-md font-semibold py-2 text-center mb-4 sm:mb-0"
            >
              Change Password
            </Link>

            <Link
              to="/user/editprofile"
              className="w-full sm:w-[48%] bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 rounded-md font-semibold py-2 text-center"
            >
              Edit Profile
            </Link>
          </div>

          {/* Cancel Subscription Button //created insted of active */}
          {userData?.subscription?.status === "active" && (
            <button onClick={handleCancellation} className="w-full bg-red-600 hover:bg-red-500 transition-all duration-300 rounded-md font-semibold py-2 text-center mt-4">
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default Profile;
