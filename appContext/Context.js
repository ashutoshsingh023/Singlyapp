import {createContext} from 'react';

export const AppContext = createContext();

const SinglyProvider = ({children}) => {
  const data = {
    name:"",
    dateofbirth: "",
    gender: "",
    passion: "",
    ideal: "",
    photo:"",
    location: "",
  };
  const SignInData  = {
    email : "",
    password :""
  }



  return <AppContext.Provider value={{data}}>{children}</AppContext.Provider>;
};

export default SinglyProvider;
