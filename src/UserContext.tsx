/* eslint-disable @typescript-eslint/no-explicit-any */

//O context do React nada mais é do que uma maneira de passar dados para todos os componentes que forem embrulhados pelo UserContextProvider, nesse caso queremos passar as state variables userInfo e setUserInfo
import { createContext, useState, Dispatch, SetStateAction } from 'react';

// Define the shape of your user info
interface UserInfoType {
  username: any;
  password: any;
}

// Define the shape of your user context
interface UserContextType {
  userInfo: UserInfoType;
  setUserInfo: Dispatch<SetStateAction<UserInfoType>>;
}

// Create the context with an initial empty object
export const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserContextProvider({children}) {
  const [userInfo,setUserInfo] = useState<UserInfoType>({ username: '', password: ''});
  return (
    <UserContext.Provider value={{userInfo,setUserInfo}}>
      {children}
    </UserContext.Provider>
  );
}
