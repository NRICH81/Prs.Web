import "bootstrap/dist/css/bootstrap.min.css";   // back in App now (it left the tree in Lesson 5)
import "./App.css";
import { Outlet } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { IUsers } from "./users/IUsers";

export interface UserContextType {
  user: IUsers | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUsers | undefined>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUserContext(): UserContextType {
  const userContext = useContext(UserContext);
  if (userContext === undefined) throw new Error("context not found");
  return userContext;
}
 function getPersistedUser() {
   const userAsJSON = localStorage.getItem("users");
   if (!userAsJSON) return undefined;
   return JSON.parse(userAsJSON);
 }

 function App() {
   const [users, setUser] = useState<IUsers | undefined>(getPersistedUser());
   return (
     <UserContext.Provider value={{ user: users, setUser }}>
     <Toaster toastOptions={{success: { iconTheme: { primary: "#FF7A00", secondary: "white" } }, style: { maxWidth: 500 }, }} />
       <Outlet />
     </UserContext.Provider>
   );
 }
export default App;
