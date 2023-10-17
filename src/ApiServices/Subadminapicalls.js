import axios from "axios";
import { envdata } from "../components/Envexports";
export const  Subadminapicalls= async(endpoint,data,method,contentType)=>{
  let apidata;
  if(method==="GET"){
      apidata={}
  }
  else{
      apidata=data
  }
    const config = {
        method: method, // HTTP method
        url: `${envdata.baseurl}/${endpoint}`,
        data:apidata, // Request data
        headers: {
          "Content-Type": contentType,
        }
      };
      const res = await axios(config);
    return res.data;
}