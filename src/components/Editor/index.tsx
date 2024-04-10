// Environment.tsx
import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Row, Col, Tooltip } from 'antd';
import {
  CodeSandboxOutlined,
  BlockOutlined,
  TagOutlined,
  CloseOutlined,
  FormOutlined
} from '@ant-design/icons';
import ImageLoader from '../ImageLoader';
import { useAppContext } from '../../Context';

interface Image {
  id: string;
  controlId: string;
  url: string;
  title: string;
  textureUrl: string;
}

interface Control {
  id: string;
  control: {
    x: string; 
    y: string; 
  }
};

interface EnvironmentProps {
  data: {
    frontImage: string;
    backImage: string;
    originalEnviroment: string;
    images: Image[];
    controls: Control[];
  };
}

const Editor: React.FC<EnvironmentProps> = ({ data }) => {
  const [selectedTextures, setSelectedTextures] = useState<Image[]>([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [option, setOption] = useState<any>(null);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [sectionSelected, setSectionSelected] = useState("1");
  const [controls, setControls] = useState<any>([]);
  const [textures, setTextures] = useState<any>([]);

  const { state, dispatch } = useAppContext();

  // {
  //   id:"0",
  //   url:require('./assets/images/sampleImages/habitacion_0000_melamina-1-01.png'), 
  //   textureUrl:require('./assets/images/sampleImages/habitacion_0000_melamina-1-01.png'), 
  //   title:"text test 1 1 1",
  //   controlId:"1",
  //   category:"",
  //   sizes:{
  //     h:"",
  //     w:""
  //   }
  // },

  useEffect(()=>{
    // console.log("enviroments data")
    // let cpy = state.environments.map((env:any) => ({
    //   ...env,
    //   name: env.title,
    //   id: env.id,
    //   thumbnail: env.thumbnail,
    //   coordinates: JSON.parse(env.metadata.custom_post_type_coordinates),
    // }));

    let texturesArray:any = [];
    for(let i=0;i<state.enviromentSelected.textures.length;i++){
      console.log(state.enviromentSelected.textures[i])
      // for(let j=0;j<state.enviromentSelected.textures.textures.length;j++){

      // }
      let texturesCpy = state.enviromentSelected.textures[i].textures.map((texture:any, index:number)=>({
        id: index+""+i,
        title: texture.name,
        textureUrl: state.enviromentSelected.textures[i].texture,
        url:texture.texture,
        controlId:texture.control_id,
        category:"",
        sizes:{
          h:"",
          w:""
        },
        ...texture,
        ...state.enviromentSelected.textures[i],
      }));
      texturesArray = [...texturesArray, ...texturesCpy]
    }

    // let texturesCpy = state.enviromentSelected.textures.map((texture:any, index:number)=>({
    //   id: index,
    //   title: texture.name,
    //   textureUrl: texture.texture,
    //   url:texture.texture,
    //   controlId:1,
    //   category:"",
    //   sizes:{
    //     h:"",
    //     w:""
    //   }
    // }));

    console.log('texture',texturesArray);

    setTextures(texturesArray);
    setControls(JSON.parse(state.enviromentSelected.metadata.custom_post_type_coordinates).map((item:any, index:any)=>({x:item.x, y:item.y, id:(index+1)})));
    // console.log('here',cpy);
  },[state]);

  useEffect(() => {
    let timeoutId: any;

    if(data.controls.length>0)
      setSectionSelected(data.controls[0].id);

    const handleMouseMove = () => {
      setIsMouseMoving(true);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMouseMoving(false);
      }, 2000); 
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  const closeSidebar = () => {
    setOption(null);
    setOpenSidebar(false);
  }

  const handleTexture = (image: Image) => {
    const existingTextureIndex = selectedTextures.findIndex((item) => item.controlId === image.controlId);

    if (existingTextureIndex !== -1) {
      const updatedTextures = [...selectedTextures];
      updatedTextures[existingTextureIndex] = image;
      setSelectedTextures(updatedTextures);
    } else {
      setSelectedTextures([...selectedTextures, image]);
    }
    console.log('selectedTextures',selectedTextures);
  };

  const handleSidebar = () => {
    setOpenSidebar(!openSidebar);
  }

  const handleEnviroment = (data: any) => {
    // console.log(data)
    setSectionSelected(data.id);
    setOption(2);
    setOpenSidebar(true);
  }

  const handleOption = (option: any) => {
    console.log(option)
    setOpenSidebar(true);
    setOption(option);
  }

  const handleSelectedEnviroment = (env:any) => {
    // console.log(env);
    dispatch({ type: 'SET_ENVIRONMENT', payload: env });
    setSelectedTextures([]);
    setSectionSelected("1");
  }

  return (
    <React.Fragment>
      <div className='editor-container'>
        <div className='enviroment-container'>
            <div className='editor-wrapper'>
              <ImageLoader src={data.originalEnviroment} alt="" className='original-enviroment' loading="lazy"/>
              <ImageLoader src={state.enviromentSelected.background_image} alt="Back Image" className='img-bg' loading="lazy"/>
              {selectedTextures.map((item, index) => (
                  <ImageLoader 
                    className='img-layer'
                    src={item.url} 
                    alt={item.title} 
                    key={index} 
                    loading="lazy"
                  />
              ))}
              <ImageLoader src={state.enviromentSelected.front_image} alt="Front Image" loading="lazy" className='front-img'/>
              {
                controls.map((item:any, index:any)=> {
                  return (
                    <button 
                      className = {`enviroment-change-control ${isMouseMoving?"enviroment-change-control-active":""} ${sectionSelected===item.id?"enviroment-change-control-selected":""}`} 
                      key={index} 
                      style={{left:`${item.x}%`,top:`${item.y}%`}}
                      onClick={()=>handleEnviroment(item)}
                    >
                      <FormOutlined />
                    </button>
                  )
                })
              }
            </div>
        </div>
        <div className={`editor-sidebar ${openSidebar?'open-editor-sidebar':''}`}>
          <div className='sidebar-controls'>
            <ul>
              <li onClick={()=>handleOption(1)} className={`${option===1?"active":""}`}>
                  <Tooltip placement="left" title={"Seleccionar ambiente"}>
                    <div>
                      <CodeSandboxOutlined />
                    </div>
                  </Tooltip>
              </li>
              <li onClick={()=>handleOption(2)} className={`${option===2?"active":""}`}>
                  <Tooltip placement="left" title={"Seleccionar decorativo"}>
                    <div>
                      <BlockOutlined />
                    </div>
                  </Tooltip>
              </li>
              <li onClick={()=>handleOption(3)} className={`${option===3?"active":""}`}>
                  <Tooltip placement="left" title={"Resumen"}>
                    <div>
                      <TagOutlined />
                    </div>
                  </Tooltip>
              </li> 
              {
                openSidebar && 
                <li onClick={closeSidebar} className={`${option===4?"active":""}`}>
                  <Tooltip placement="left" title={"Cerrar"}>
                    <div>
                      <CloseOutlined />
                    </div>
                  </Tooltip>
                </li>
              }
            </ul>
          </div>
          <div className='editor-sidebar-content'>
            <div className='textures-container'>
              {
              option === 1 &&
              <Row gutter={[16, 16]} className='w-full'>
                {sectionSelected && state.environments.map((item:any, index:any) => (
                  <Col key={index} xs={24} sm={24} md={24} lg={24}>
                    <div className={`texture-item-container ${selectedTextures.some((texture)=>texture.id===item.id)?"texture-item-selected":""}`} onClick={()=>handleSelectedEnviroment(item)}>
                      <div className='texture-data'>
                        <h5>{item.title}</h5>
                      </div>
                      <img src={item.thumbnail} alt="" loading="lazy"/>
                    </div>
                  </Col>
                ))}
              </Row>
              }
              {
              option === 2 &&
              <Row gutter={[2, 2]} className='w-full'>
                {sectionSelected && textures.filter((texture:any)=>(`${texture.controlId}`===`${sectionSelected}`)).map((item:any, index:any) => (
                  <Col key={index} xs={8} sm={8} md={8} lg={8}>
                    <div className={`texture-item-container ${selectedTextures.some((texture)=>texture.id===item.id)?"texture-item-selected":""}`} onClick={()=>handleTexture(item)}>
                      <div className='texture-data'>
                        <h5>{item.name}</h5>
                      </div>
                      <img src={item.textureUrl} alt="" loading="lazy"/>
                    </div>
                  </Col>
                ))}
              </Row>
              }
              {
              option === 3 &&
              <Row gutter={[16, 16]} className='w-full'>
                {sectionSelected && selectedTextures.map((item:any, index:any) => (
                  <Col key={index} xs={24} sm={24} md={24} lg={24} className='sumary-item'>
                    <div className='sumary-item-img-wrapper rounded-1rem'>
                      <img src={item.textureUrl} alt="" loading="lazy"/>
                    </div>
                    <div className='sumary-item-content'>
                      <span className='texture-title'>{item.title}</span>
                      <span>{item.name}</span>
                    </div>
                  </Col>
                ))}
              </Row>
              }
            </div>
          </div>
        </div>

      </div>  

    </React.Fragment>
  );
};

export default Editor;
