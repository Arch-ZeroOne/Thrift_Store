import React, { useState, useContext } from "react";

const PopUpContext = React.createContext();

export function usePopUp() {
  return useContext(PopUpContext);
}

export default function PopUpModalContext({ children }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <PopUpContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </PopUpContext.Provider>
  );
}
