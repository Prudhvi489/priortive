import React, { useState } from 'react'
import { createContext } from 'react'
const Subadmincontext=createContext()
export const Subadminprovider = ({children}) => {
    const [data,setData]=useState({notify:false,activeTab:''})
    return (
  <Subadmincontext.Provider value={{data,setData}}>
    {children}
  </Subadmincontext.Provider>
  )
}
export default Subadmincontext;