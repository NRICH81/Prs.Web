import "bootstrap/dist/css/bootstrap.min.css";   
import "./App.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { IUser } from "./users/IUser";
import { UserContext } from "./UserContext";

 function getPersistedUser() {
   const userAsJSON = localStorage.getItem("user");
   if (!userAsJSON) return undefined;
   return JSON.parse(userAsJSON);
 }

 function App() {
   const [user, setUser] = useState<IUser | undefined>(getPersistedUser());
   return (
     <UserContext.Provider value={{ user: user, setUser }}>
     <Toaster toastOptions={{success: { iconTheme: { primary: "#312ECB", secondary: "white" } }, style: { maxWidth: 500 }, }} />
       <Outlet />
     </UserContext.Provider>
   );
 }
export default App;
