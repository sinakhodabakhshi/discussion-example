import { createContext } from "react";

export const User = createContext(null);

export default function UserContext({ children }) {
  return (
    <User.Provider value={{ name: "Sina Khodabakhshi" }}>
      {children}
    </User.Provider>
  );
}
