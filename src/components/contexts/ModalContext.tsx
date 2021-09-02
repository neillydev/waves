import React, {useMemo, createContext, useReducer} from "react";

export const ModalContext = createContext<any | undefined>(undefined);

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

export const ModalProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  return (
    <ModalContext.Provider value={contextValue}>
        {props.children}
    </ModalContext.Provider>
  );
}
