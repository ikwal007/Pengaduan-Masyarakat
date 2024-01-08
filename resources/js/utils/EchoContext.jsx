import React, { createContext, useContext } from 'react';
import echo from './echo';

const EchoContext = createContext();

export const EchoProvider = ({ children }) => {
  return (
    <EchoContext.Provider value={echo}>{children}</EchoContext.Provider>
  );
};

export const useEcho = () => useContext(EchoContext);
