import React, { useState, useContext } from "react";
import { auth } from "../firebase/config";
const SellerContext = React.createContext();
const UserContext = React.createContext();
export function useRole() {
  return useContext(SellerContext);
}

export function useUser() {
  return useContext(UserContext);
}

function RoleContext({ children }) {
  const [isSeller, setIsSeller] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  return (
    <>
      <UserContext value={{ currentUser, setCurrentUser }}>
        <SellerContext.Provider value={{ isSeller, setIsSeller }}>
          {children}
        </SellerContext.Provider>
      </UserContext>
    </>
  );
}

export default RoleContext;
