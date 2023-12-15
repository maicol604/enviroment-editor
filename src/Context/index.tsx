// AppContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface AppState {
  userChanges: any[]; // Ajusta el tipo según la estructura real de los cambios del usuario
}

type AppAction = { type: 'ADD_CHANGE'; payload: any }; // Ajusta el tipo según las acciones necesarias

interface AppContextProps {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialState: AppState = {
    userChanges: [],
  };

  const reducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
      case 'ADD_CHANGE':
        return { ...state, userChanges: [...state.userChanges, action.payload] };
      // Agrega más casos según sea necesario

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser utilizado dentro de un AppProvider');
  }
  return context;
};
