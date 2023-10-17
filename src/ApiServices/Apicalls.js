import axios from "../GomytripClient"

export const Apipost = async(endpoint,data,method)=>{
    // const config = {
    //     method: method, // HTTP method
    //     url: endpoint,
    //     data: data, // Request data
    //     headers: {
    //       "Content-Type": "application/json",
    //     }
    //   };
    //   const res = await axios(config);
    const res =await axios.post(endpoint,data,{headers:{
        "Content-Type": "application/json",
    }})
    return res.data;
}