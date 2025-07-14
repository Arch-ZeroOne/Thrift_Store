import React, { useState, useContext } from "react";
const SelectedContext = React.createContext();

export function useSelected() {
  return useContext(SelectedContext);
}

function FormContext({ children }) {
  const [selected, setSelected] = useState();
  return (
    <SelectedContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedContext.Provider>
  );
}

export default FormContext;
