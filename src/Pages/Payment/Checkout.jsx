import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRazorpayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice";
import toast from "react-hot-toast";
import HomeLayout from "../../Layouts/HomeLayout";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const razorpaykey = useSelector((state) => state?.razorpay?.key);
  const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);
  const isPaymentVerified = useSelector((state) => state?.razorpay?.isPaymentVerified);
  const userData = useSelector((state) => state?.auth?.data);

  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  async function handleSubscription(e) {
    e.preventDefault();

    // Validate Razorpay key and subscription ID
    if (!razorpaykey || !subscription_id) {
      toast.error("Something went wrong, Razorpay data not loaded properly.");
      return;
    }

    const options = {
      key: razorpaykey, 
      subscription_id: subscription_id, 
      name: "Dheeraj lms Pvt. Ltd.",
      description: "Subscription",
      theme: {
        color: "#1DB954",
        backdrop: "#121212",
        header: {
          background_color: "#1A1A1A",
          text_color: "#ffffff",
        },
        button: {
          background_color: "#1DB954",
          text_color: "#ffffff",
          hover_background_color: "#1AAF47",
        },
      },
      prefill: {
        email: userData.email,
        name: userData.fullName,
      },
      handler: async function (response) {
        try {
          if (!response.razorpay_payment_id || !response.razorpay_signature || !response.razorpay_subscription_id) {
            toast.error("Payment response missing required fields.");
            return;
          }

          paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
          paymentDetails.razorpay_signature = response.razorpay_signature;
          paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;

          toast.success("Payment successful🙂");

          await dispatch(verifyUserPayment(paymentDetails));

          if (isPaymentVerified) {
            navigate("/checkout/success");
          } else {
            navigate("/checkout/fail");
          }
        } catch (error) {
          toast.error("Payment verification failed. Please try again.");
          console.error("Error verifying payment:", error);
          navigate("/checkout/fail");
        }
      },
      modal: {
        ondismiss: function() {
          toast.error("Payment window dismissed.");
        },
      },
    };

    try {
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error("Error opening payment window.");
      console.error("Error opening Razorpay:", error);
    }
  }

  async function load() {
    await dispatch(getRazorpayId());
    await dispatch(purchaseCourseBundle());
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <HomeLayout>
      <form onSubmit={handleSubscription} className="min-h-[90vh] flex items-center justify-center text-white">
        <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl)lg rounded-tr-lg">Subscription Bundle</h1>
          <div className="px-4 space-y-5 text-center">
            <p className="text-[17px]">
              This purchase will allow you to access all available course of our platform for{" "}
              <span className="text-yellow-500 font-bold">1 year duration</span>
              {" "} All the existing and newly launched courses will be available.
            </p>
            <p className="flex items-center justify-center gap-1 text-2xl font-semibold">
              RS<span>499/-</span>only
            </p>
            <div className="text-gray-200">
              <p>100% refund on cancellation</p>
              <p>Terms and conditions applied</p>
            </div>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-xl"
            >
              Buy now
            </button>
          </div>
        </div>
      </form>
    </HomeLayout>
  );
}

export default Checkout;