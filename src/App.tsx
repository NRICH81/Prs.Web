import "bootstrap/dist/css/bootstrap.min.css";   
import "./App.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { IUsers } from "./users/IUsers";
import { UserContext } from "./UserContext";

 function getPersistedUser() {
   const userAsJSON = localStorage.getItem("users");
   if (!userAsJSON) return undefined;
   return JSON.parse(userAsJSON);
 }

 function App() {
   const [users, setUser] = useState<IUsers | undefined>(getPersistedUser());
   return (
     <UserContext.Provider value={{ user: users, setUser }}>
     <Toaster toastOptions={{success: { iconTheme: { primary: "#312ECB", secondary: "white" } }, style: { maxWidth: 500 }, }} />
       <Outlet />
     </UserContext.Provider>
   );
 }
export default App;
