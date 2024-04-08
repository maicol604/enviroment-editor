import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

interface AppState {
  userChanges: any[]; 
  environments: any[]; 
  enviromentSelected: any;
}

type AppAction = 
  | { type: 'ADD_CHANGE'; payload: any } 
  | { type: 'SET_ENVIRONMENTS'; payload: any[] }
  | { type: 'SET_ENVIRONMENT'; payload: any }; 

interface AppContextProps {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialState: AppState = {
    enviromentSelected: null,
    userChanges: [],
    environments: [], // Inicializamos el estado de environments como un array vacío
  };

  const reducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
      case 'ADD_CHANGE':
        return { ...state, userChanges: [...state.userChanges, action.payload] };
      case 'SET_ENVIRONMENTS':
        return { ...state, environments: action.payload }; 
      case 'SET_ENVIRONMENT':
        return { ...state, enviromentSelected: action.payload }; 
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch al cargar el componente para obtener las environments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://texturizador.estudiomarketech.es/wp-json/custom/v1/environments/");
        if (response.ok) {
          const environments = await response.json();
          let envCpy = [...environments,];
          console.log(environments, envCpy)
          dispatch({ type: 'SET_ENVIRONMENTS', payload: envCpy });
        } else {
          console.error('Error al obtener las environments:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener las environments:', error);
      }
    };
    fetchData();
  }, []); // El array vacío [] asegura que el efecto solo se ejecute una vez al montar el componente

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser utilizado dentro de un AppProvider');
  }
  return context;
};
