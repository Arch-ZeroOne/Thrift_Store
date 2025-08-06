import React, { useState, useContext } from "react";
const LoadingContext = React.createContext();
const SpinnerContext = React.createContext();

export function useLoader() {
  return useContext(LoadingContext);
}

export function useSpinner() {
  return useContext(SpinnerContext);
}

export default function LoaderContext({ children }) {
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);

  return (
    <div>
      <SpinnerContext.Provider value={{ spinning, setSpinning }}>
        <LoadingContext.Provider value={{ loading, setLoading }}>
          {children}
        </LoadingContext.Provider>
      </SpinnerContext.Provider>
    </div>
  );
}
