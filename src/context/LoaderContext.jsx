import React, { useState, useContext } from "react";
const LoadingContext = React.createContext();

export function useLoader() {
  return useContext(LoadingContext);
}

export default function LoaderContext({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        {children}
      </LoadingContext.Provider>
    </div>
  );
}
