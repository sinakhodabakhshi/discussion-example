import { createContext, useReducer, useState } from "react";
import { reducer } from "./reducer";
import init from "./initData";


export const CommentsContext = createContext(null);
export const CommentsDispatchContext = createContext(null);
export const User = createContext(null);
export const Focus = createContext(null);
export const FocusSetter = createContext(null);

export default function DiscussionContext({ children }) {
  const [state, dispatch] = useReducer(reducer, init);
  const [focuseId, setFocuseId] = useState(null);

  return (
    <User.Provider value={{ name: "Sina Khodabakhshi" }}>
      <CommentsContext.Provider value={state}>
        <CommentsDispatchContext.Provider value={dispatch}>
          <Focus.Provider value={{ focuseId, setFocuseId }}>
            <FocusSetter.Provider value={setFocuseId}>
              {children}
            </FocusSetter.Provider>
          </Focus.Provider>
        </CommentsDispatchContext.Provider>
      </CommentsContext.Provider>
    </User.Provider>
  );
}
