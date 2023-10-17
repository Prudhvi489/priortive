import axios from "axios"

const gomytripclient= axios.create({
    baseURL:`${process.env.REACT_APP_BASEURL}`,
    // timeout: 5000,
})
export default gomytripclient;