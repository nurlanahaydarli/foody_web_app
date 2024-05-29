import { createContext, useContext, useState } from "react";

export const globalContext = createContext();

export const useGlobalStore = () => {
  const value = useContext(globalContext);
  return value;
};

const Provider = ({ children }) => {
  
// -----------------------
  const [orderData, setOrderData] = useState([]);
  const [orderShow, setOrderShow] = useState([]);
  // -----------------------
 


  const Component = globalContext.Provider;

  const values = {
 
// -----------------------
    orderData,
    setOrderData,
    orderShow,
    setOrderShow,
// ------------------------------
  
  };

  return <Component value={values}>{children}</Component>;
};

export default Provider;
