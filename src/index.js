import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../src/assets/styles/globalStyles.css'
import App from './App';
import {Provider} from 'react-redux'
import store from './store/index'
import { BrowserRouter, HashRouter  } from 'react-router-dom';
import axios from './GomytripClient';
import { PersistGate } from 'redux-persist/es/integration/react';
import { persistStore } from 'redux-persist';
import {  createTheme } from "@mui/material/styles";
const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(store)

// Interceptors with axios
// interceptors request
axios.interceptors.request.use((request)=>{
  const token=localStorage.getItem("authorization")
  let authorizationkey;
  // console.log(request)
  if(token){
    authorizationkey=token
  }else{
    authorizationkey=process.env.REACT_APP_DEFAULT_TOKEN;
  }
  request.headers['Authorization']=authorizationkey
  return request;
})
// interceptors response
axios.interceptors.response.use((response)=>{
  return response;
})
const mdTheme = createTheme({
  palette: {
    primary: {
      main: "#003556"
    },
    // secondary: {
    //   main: "#2C2F84"
    // }
  }
});
root.render(
  // <React.StrictMode> 
    <BrowserRouter>
   <Provider store={store}> 
   <PersistGate persistor={persistor}>
   <App />
   </PersistGate></Provider>
   </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
