import './App.css';
import { AppProvider } from './Context';
import EnvironmentGrid from './components/EnvironmentGrid';
import Editor from './components/Editor';


function App() {
  
  const originalEnviroment = require('./assets/images/sampleImages/i1.png');
  const backImage = require('./assets/images/sampleImages/i1.png');
  const frontImage = require('./assets/images/sampleImages/i4-s.png');

  const controls = [
    // {
    //   control: {
    //     x:"10%",
    //     y:"25%"
    //   },
    //   id:"1",
    // },
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
      url:require('./assets/images/sampleImages/i2.png'), 
      textureUrl:require('./assets/images/sampleImages/t2.png'), 
      title:"text test 1 1 1",
      controlId:"2",
      category:"",
      sizes:{
        h:"",
        w:""
      }
    }, 
    {
      id:"1",
      url:require('./assets/images/sampleImages/i3.png'), 
      textureUrl:require('./assets/images/sampleImages/t3.png'), 
      title:"text",
      controlId:"2",
    },
    {
      id:"2",
      url:require('./assets/images/sampleImages/i4.png'), 
      textureUrl:require('./assets/images/sampleImages/t4.png'), 
      title:"text",
      controlId:"3",
    },
    {
      id:"3",
      url:require('./assets/images/sampleImages/i5.png'), 
      textureUrl:require('./assets/images/sampleImages/t5.png'), 
      title:"text",
      controlId:"3",
    },
    {
      id:"4",
      url:require('./assets/images/sampleImages/i6.png'), 
      textureUrl:require('./assets/images/sampleImages/t6.png'), 
      title:"text",
      controlId:"3",
    },
    {
      id:"7",
      url:require('./assets/images/sampleImages/i7.png'), 
      textureUrl:require('./assets/images/sampleImages/t7.png'), 
      title:"text",
      controlId:"2",
    },
    {
      id:"5",
      url:require('./assets/images/sampleImages/i8.png'), 
      textureUrl:require('./assets/images/sampleImages/t8.png'), 
      title:"text",
      controlId:"3",
    },
    {
      id:"6",
      url:require('./assets/images/sampleImages/i10.png'), 
      textureUrl:require('./assets/images/sampleImages/t10.png'), 
      title:"text",
      controlId:"3",
    },
    {
      id:"8",
      url:require('./assets/images/sampleImages/i9.png'), 
      textureUrl:require('./assets/images/sampleImages/t9.png'), 
      title:"text",
      controlId:"2",
    }
  ];

  return (
    <AppProvider>
      <div className="App">
        {/* <EnvironmentGrid/> */}
        <Editor
          data ={{frontImage, backImage, originalEnviroment, images, controls}}
        />
      </div>
    </AppProvider>
  );
}

export default App;
