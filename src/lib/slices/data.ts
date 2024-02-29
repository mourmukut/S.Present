import { User, tree } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DataState {
  value: number;
  isLoggedIn: boolean;
  user: User;
  editNode: tree
}

const initialState: DataState = {
  value: 100,
  isLoggedIn: false,
  user: {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "",
  },
  editNode: {
    id: "",
  parentId: "",
  label: "",
  content: "",
  createdAt: "",
  updatedAt: "",
  autherId: "",
  autherName: ""
  }
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUser: (state: DataState,action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true
    },
    setIsLoggedOut: (state: DataState) => {
      state.isLoggedIn = false
    },
    setEditNode:(state: DataState,action: PayloadAction<tree>) => {
      console.log("action.payload : ",action.payload)
      state.editNode = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser,setIsLoggedOut,setEditNode } = dataSlice.actions;

export default dataSlice.reducer;
