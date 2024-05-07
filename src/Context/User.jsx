import React, {useState, useEffect,createContext } from 'react'
import { jwtDecode } from "jwt-decode";



export const UserContext = createContext();

const UserContextProvider = ({children})=> {
  const [userToken,setUserToken] = useState(localStorage.getItem('userToken'));
  const [User,setUser] = useState(null);
  const [loggedIn ,setLoggedIn]=useState(false);

  const getUserData =async ()=>{
      if(userToken != null){
        setLoggedIn(true);
        setUser(jwtDecode(userToken));  
      }
      else setUser(null);
      
  };
  useEffect(()=> {
    getUserData();
  },[userToken]);
  return <UserContext.Provider value={{User,loggedIn,userToken,setLoggedIn,setUserToken}}>
    {children}
  </UserContext.Provider>
};

export default UserContextProvider;