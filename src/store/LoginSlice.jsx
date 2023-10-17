import { createSlice } from "@reduxjs/toolkit";
const initialState ={loggedin:0}
const Loginslice = createSlice(
    {
        name:'login',
        initialState,
        reducers:{
            userlogin(state,action){
                // console.log(action.payload,"store")
                state.loggedin=action.payload
            }
        }
    }
) 
export const LoginActions= Loginslice.actions;
export default Loginslice;