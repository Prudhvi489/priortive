import React, { useState } from "react";
import { createContext } from "react";
const Admincontext = createContext();

export const Adminprovider = ({ children }) => {
  const [data, setData] = useState({ notify: false });
  return (
    <Admincontext.Provider value={{ data, setData }}>
      {children}
    </Admincontext.Provider>
  );
};

export default Admincontext;