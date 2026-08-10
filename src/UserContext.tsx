import { createContext, useContext } from "react";
import { IUsers } from "./users/IUsers";

export interface UserContextType {
  user: IUsers | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUsers | undefined>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUserContext(): UserContextType {
  const userContext = useContext(UserContext);
  if (userContext === undefined) throw new Error("context not found");
  return userContext;
}
