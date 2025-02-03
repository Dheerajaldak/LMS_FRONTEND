import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosinstance";

const initialState = {
  courseData: [],
};

export const getAllCourses = createAsyncThunk("/course/get", async () => {
  try {
    const response = axiosInstance.get("/courses");
    toast.promise(response, {
      loading: "loading course data..",
      success: "Courses loaded successfully",
      error: "Failed to get the courses",
    });
    return (await response).data.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// export const createNewCourse = createAsyncThunk(
//   "/course/create",
//   async (data, { rejectWithValue }) => {
//     try {
//       let formData = new FormData();
//       formData.append("title", data?.title);
//       formData.append("description", data?.description);
//       formData.append("category", data?.category);
//       formData.append("createdBy", data?.createdBy);
//       formData.append("thumbnail", data?.thumbnail);

//       // Send the POST request to create the course
//       const response = await axiosInstance.post("/courses", formData);
//       // Return the response data (course data)
//       return response.data;
//     } catch (error) {
//       // If an error occurs, show a toast and return the error message
//       toast.error(error?.response?.data?.message || "An error occurred!");
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );


export const createNewCourse = createAsyncThunk("/course/create", async (data) => {
  try {
    let formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("category", data?.category);
    formData.append("createdBy", data?.createdBy);
    formData.append("thumbnail", data?.thumbnail);

    const response = axiosInstance.post("/courses", formData);
    toast.promise(response, {
      loading: "Creating new course..",
      success: "Courses created successfully",
      error: "Failed to create course",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "An error occurred!");
  }
});


const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        // console.log(action.payload);
        state.courseData = [...action.payload];
      }
    });
  },
});



export default courseSlice.reducer;
