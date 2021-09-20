import React, {useMemo, createContext, useReducer} from "react";

export const LoadingContext = createContext<any | undefined>(undefined);

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
