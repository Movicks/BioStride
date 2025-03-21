import { createSlice } from '@reduxjs/toolkit'; // Import the createSlice utility from Redux Toolkit

// Define the initial state for managing users
const initialState = {
  users: [],        // Array to store the list of users
  isLoading: false, // Boolean to indicate if users are being loaded
  error: null,      // Stores error messages if fetching users fails
};

// Create a slice for user management with a name, initial state, and reducers
const userSlice = createSlice({
  name: 'users',    // Name of the slice, used in actions and state
  initialState,     // Initial state of the user slice
  reducers: {
    // Reducer for initiating the user-fetching process
    fetchUsersRequest(state) {
      state.isLoading = true; // Set loading state to true
    },

    // Reducer for handling successful user fetching
    fetchUsersSuccess(state, action) {
      state.isLoading = false;    // Set loading state to false
      state.users = action.payload; // Update users with data from the action payload
    },

    // Reducer for handling errors during user fetching
    fetchUsersFailure(state, action) {
      state.isLoading = false; // Set loading state to false
      state.error = action.payload; // Update error message with data from the action payload
    },
  },
});

// Export the action creators generated by createSlice
export const { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } = userSlice.actions;

// Export the reducer function for this slice
export default userSlice.reducer;
