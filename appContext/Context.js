import {createContext} from 'react';

export const AppContext = createContext();

const SinglyProvider = ({children}) => {
  const data = {
    name:"",
    date: '',
    dummy:"",
    dummy:"",
  };
  const SignInData  = {
    email : "",
    password :""
  }



  return <AppContext.Provider value={{data}}>{children}</AppContext.Provider>;
};

export default SinglyProvider;
