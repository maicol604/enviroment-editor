import './App.css';
import { AppProvider } from './Context';
import EnvironmentGrid from './components/EnvironmentGrid';
import Editor from './components/Editor';
import { useState } from 'react';


function App() {
  
  const [view, setView] = useState<any>(0);

  const originalEnviroment = require('./assets/images/sampleImages/Fondo.png');
  const backImage = require('./assets/images/sampleImages/Fondo.png');
  const frontImage = require('./assets/images/sampleImages/Objetos.png');

  const controls = [
    {
      control: {
        x:"20%",
        y:"25%"
      },
      id:"1",
    }, 
    {
      control: {
        x:"60%",
        y:"25%"
      },
      id:"2",
    }, 
    {
      control: {
        x:"40%",
        y:"25%"
      },
      id:"3",
    },
  ]

  const images = [
    {
      id:"0",
      url:require('./assets/images/sampleImages/habitacion_0000_melamina-1-01.png'), 
      textureUrl:require('./assets/images/sampleImages/habitacion_0000_melamina-1-01.png'), 
      title:"text test 1 1 1",
      controlId:"1",
      category:"",
      sizes:{
        h:"",
        w:""
      }
    }, 
    {
      id:"1",
      url:require('./assets/images/sampleImages/habitacion_0001_melamina-1-02.png'), 
      textureUrl:require('./assets/images/sampleImages/habitacion_0001_melamina-1-02.png'), 
      title:"text",
      controlId:"1",
    },
    {
      id:"2",
      url:require('./assets/images/sampleImages/habitacion_0002_melamina-1-03.png'), 
      textureUrl:require('./assets/images/sampleImages/habitacion_0002_melamina-1-03.png'), 
      title:"text",
      controlId:"2",
    },
    {
      id:"3",
      url:require('./assets/images/sampleImages/habitacion_0003_melamina-2-01.png'), 
      textureUrl:require('./assets/images/sampleImages/habitacion_0003_melamina-2-01.png'), 
      title:"text",
      controlId:"2",
    },
    {
      id:"4",
      url:require('./assets/images/sampleImages/habitacion_0004_melamina-2-02.png'), 
      textureUrl:require('./assets/images/sampleImages/habitacion_0004_melamina-2-02.png'), 
      title:"text",
      controlId:"2",
    },
    {
      id:"7",
      url:require('./assets/images/sampleImages/habitacion_0005_melamina-2-03.png'), 
      textureUrl:require('./assets/images/sampleImages/habitacion_0005_melamina-2-03.png'), 
      title:"text",
      controlId:"2",
    },
    {
      id:"5",
      url:require('./assets/images/sampleImages/habitacion_0006_melamina-3-01.png'), 
      textureUrl:require('./assets/images/sampleImages/habitacion_0006_melamina-3-01.png'), 
      title:"text",
      controlId:"3",
    },
    {
      id:"6",
      url:require('./assets/images/sampleImages/habitacion_0007_melamina-3-02.png'), 
      textureUrl:require('./assets/images/sampleImages/habitacion_0007_melamina-3-02.png'), 
      title:"text",
      controlId:"3",
    },
    {
      id:"8",
      url:require('./assets/images/sampleImages/habitacion_0008_melamina-3-03.png'), 
      textureUrl:require('./assets/images/sampleImages/habitacion_0008_melamina-3-03.png'), 
      title:"text",
      controlId:"2",
    },
    {
      id:"9",
      url:require('./assets/images/sampleImages/habitacion_0009_melamina-4-01.png'), 
      textureUrl:require('./assets/images/sampleImages/habitacion_0009_melamina-4-01.png'), 
      title:"text",
      controlId:"2",
    },
    {
      id:"10",
      url:require('./assets/images/sampleImages/habitacion_0010_melamina-4-03.png'), 
      textureUrl:require('./assets/images/sampleImages/habitacion_0010_melamina-4-03.png'), 
      title:"text",
      controlId:"2",
    },
    {
      id:"11",
      url:require('./assets/images/sampleImages/habitacion_0011_melamina-4-02.png'), 
      textureUrl:require('./assets/images/sampleImages/habitacion_0011_melamina-4-02.png'), 
      title:"text",
      controlId:"2",
    },
  ];

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
          <Editor
            data ={{frontImage, backImage, originalEnviroment, images, controls}}
          />
        }
      </div>
    </AppProvider>
  );
}

export default App;
