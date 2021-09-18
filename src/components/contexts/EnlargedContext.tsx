import React, {useMemo, createContext, useReducer} from "react";

export const EnlargedContext = createContext<any | undefined>(undefined);

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

export const EnlargedProvider = (props: any) => {
  const [state, enlarge_dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => {
    return { state, enlarge_dispatch };
  }, [state, enlarge_dispatch]);
  return (
    <EnlargedContext.Provider value={contextValue}>
        {props.children}
    </EnlargedContext.Provider>
  );
}
