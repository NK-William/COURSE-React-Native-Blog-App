import React, { useReducer } from "react";
// Using this implementation we don't need to use redux
// This is useful if we gonna have different contexts/resources
// Here use generic names since this component is gonna cater for different contexts
export default (reducer, actions, initialState) => {
  // Context works just like a pipe between screens/components for providing data.
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // actions === { addBlogPost: (dispatch) => {return() => {} }}
    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
