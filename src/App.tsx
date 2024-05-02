import './App.css';
import { AppProvider } from './Context';
import EnvironmentGrid from './components/EnvironmentGrid';
import Editor from './components/Editor';
import { useState } from 'react';


function App() {
  
  const [view, setView] = useState<any>(0);

  const handleEnviroment = () => {
    setView(1);
  }

  return (
    <AppProvider>
      <div className="App">
        {view===0 &&
          <EnvironmentGrid
            onChange = {handleEnviroment}
          />
        }
        {view===1 &&
          <Editor/>
        }
      </div>
    </AppProvider>
  );
}

export default App;
