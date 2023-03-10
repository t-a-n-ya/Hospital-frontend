import React from "react";

const GlobalContext = React.createContext({});

export function GlobalContextProvider({ children }) {
  const [isTableUpdate, setIsTableUpdate] =
    React.useState(false);

  return (
    <GlobalContext.Provider
      value={{
        isTableUpdate,
        setIsTableUpdate,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
export default GlobalContext;
