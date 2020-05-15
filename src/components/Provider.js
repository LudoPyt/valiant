import React from 'react';

import { Reducer, initialState } from './Reducer';

const Context = React.createContext(initialState);

const Provider = ({children}) => {
    const [state, dispatch] = React.useReducer(Reducer, initialState)

    return (
        <Context.Provider value={{state : state, dispatch: dispatch}}>
            {children}
        </Context.Provider>
    );
}

export {Context, Provider};
