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

interface Image {
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
  const [enviromentSelected, setEnviromentSelected] = useState(null);

  useEffect(() => {
    let timeoutId: any;

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
    setSelectedTextures([...selectedTextures, image]);
  };

  const handleSidebar = () => {
    setOpenSidebar(!openSidebar);
  }

  const handleEnviroment = (data: any) => {
    setEnviromentSelected(data.id);
    setOption(2);
    setOpenSidebar(true);
  }

  const handleOption = (option: any) => {
    setOpenSidebar(true);
    setOption(option);
  }

  return (
    <React.Fragment>
      <div className='editor-container'>
        <div className='enviroment-container'>
            <div className='editor-wrapper'>
              <img src={data.originalEnviroment} alt="" className='original-enviroment'/>
              <img src={data.backImage} alt="Back Image" className='img-bg'/>
              {selectedTextures.map((item, index) => (
                  <img 
                    className='img-layer'
                    src={item.url} 
                    alt={item.title} 
                    key={index} 
                  />
              ))}
              <img src={data.frontImage} alt="Front Image" />
              {
                data.controls.map((item, index)=> {
                  return (
                    <button 
                      className = {`enviroment-change-control ${isMouseMoving?"enviroment-change-control-active":""} ${enviromentSelected===item.id?"enviroment-change-control-selected":""}`} 
                      key={index} 
                      style={{left:`${item.control.x}`,top:`${item.control.y}`}}
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
              <Row gutter={[16, 16]}>
                {enviromentSelected && data.images.filter((item)=>(item.controlId===enviromentSelected)).map((item, index) => (
                  <Col key={index} xs={8} sm={8} md={8} lg={8}>
                    <div className='texture-item-container' onClick={()=>handleTexture(item)}>
                      <img src={item.textureUrl} alt=""/>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>

      </div>  

    </React.Fragment>
  );
};

export default Editor;
