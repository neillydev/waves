import React, {useMemo, createContext, useReducer} from "react";

export const AuthContext = createContext<any| undefined>(undefined);

const initialState = false;
const reducer = (state: boolean, action: any) => {
  switch(action.type) {
    case 'true':
        return true;
    case 'false':
      return false;
    default:
        return state;
  }
};

export const AuthProvider = (props: any) => {
  const [authState, authDispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => {
    return { authState, authDispatch };
  }, [authState, authDispatch]);
  return (
    <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
  );
}
