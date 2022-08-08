import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isFetching: false,
  isAdd: false,
  isDelete :false,
  isUpdate:false,
  isReset: false,
  isDetail : false,
  error: false,
  users : [] ,
  userdetail : [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserStart: (state) => {
      state.isFetching = true;
    },

    getUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser.push(action.payload);
    },

    getUserFailed: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    getAllUserFetching: (state) => {
      state.isFetching = true;
    },
    getAllUserFail: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    getAllUserSuccess: (state, action) => {
      state.isFetching = false;
      const users = action.payload;
        state.users = users;
      
    },
    getdetailStart: (state) => {
      state.isDetail = true;
    },
    getdetailFailed: (state, action) => {
      state.isDetail = false;
      state.error = true;
    },
    getUserdetail: (state, action) => {
      state.isDetail= false;
        const user = action.payload;
        state.userdetail = user;
    },
    addStart: (state) => {
      state.isAdd = true;
    },
    addFailed: (state, action) => {
      state.isAdd = false;
      state.error = true;
    },
    addSuccess: (state, action) => {
      state.isAdd = false;
      state.users.push(action.payload);
    },
    deleteUserStart: (state) => {
      state.isDelete = true;
    },
    deleteUserFailed: (state, action) => {
      state.isDelete = false;
      state.error = true;
    },
    deleteUserSuccess: (state, action) => {
      state.isAdd = false;
      const removeIdProduct = action.payload;
      state.users = state.users.filter(
        (item) => item.id !== removeIdProduct
      );
    },
    updateStart1: (state, action) => {
      state.isUpdate = true;
    },
    updateError1: (state, action) => {
      state.isUpdate = false;
      state.error = true;
    },
    updateSuccessUser: (state, action) => {
      state.isUpdate = false;
      const newProduct = action.payload;
      const idx = state.users.findIndex((prd) => prd.id === newProduct.id);
      if (idx > 0) {
        state.users[idx] = newProduct;
      }
    },
    resetUser: (state) => {
      state.isReset = true;
    },
    resetUserFailed: (state, action) => {
      state.isReset = false;
      state.error = true;
    },
    resetUserSuccess: (state, action) => {
      state.isReset = false;
    },
    
  },
});

export const {getdetailStart,getdetailFailed, resetUser,resetUserFailed,resetUserSuccess, updateStart1,updateError1, updateSuccessUser,deleteUserFailed,deleteUserStart,deleteUserSuccess, addSuccess,addStart,addFailed, getUserStart, getUserSuccess, getUserFailed,getAllUserFail , getAllUserFetching,getAllUserSuccess,getUserdetail } =
  userSlice.actions;
export default userSlice.reducer;
