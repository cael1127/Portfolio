import React, { createContext, useContext } from 'react';

const RouteContext = createContext('/');

export function RouteProvider({ path, children }) {
  return <RouteContext.Provider value={path}>{children}</RouteContext.Provider>;
}

export function useRoutePath() {
  return useContext(RouteContext);
}
