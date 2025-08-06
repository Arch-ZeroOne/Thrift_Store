import React, { useState, useContext, useEffect } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useSpinner } from "./LoaderContext";
const SellerContext = React.createContext();
const UserContext = React.createContext();
export function useRole() {
  return useContext(SellerContext);
}

export function useUser() {
  return useContext(UserContext);
}

function RoleContext({ children }) {
  const { setSpinning } = useSpinner();
  const [isSeller, setIsSeller] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  //Handles the loading of the spinner

  useEffect(() => {
    setSpinning(true);
    //will be immediately run and checks for a saved session in localstorage
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setSpinning(false);
    });

    //cleanup function which prevents memory and data leaks
    return () => unsubscribe();
  }, []);

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
