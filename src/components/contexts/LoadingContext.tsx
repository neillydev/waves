import React, {useMemo, createContext, useReducer} from "react";

export const LoadingContext = createContext<any | undefined>(undefined);

const initialState = '';
const reducer = (state: string, action: any) => {
  switch(action.loading) {
    case true:
        return action.type;
    case false:
        return null;
    default:
        return state;
  }
};

export const LoadingProvider = (props: any) => {
  const [load_state, loading_dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => {
    return { load_state, loading_dispatch };
  }, [load_state, loading_dispatch]);
  return (
    <LoadingContext.Provider value={contextValue}>
        {props.children}
    </LoadingContext.Provider>
  );
}
