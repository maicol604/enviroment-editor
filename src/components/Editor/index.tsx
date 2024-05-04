// Environment.tsx
import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Row, Col, Tooltip, Button, Modal, Checkbox, Tag } from 'antd';
import {
  CodeSandboxOutlined,
  BlockOutlined,
  TagOutlined,
  CloseOutlined,
  FormOutlined,
  DesktopOutlined,
  SplitCellsOutlined,
  MoreOutlined,
  FilterOutlined,
  CloseCircleOutlined,
  ClearOutlined,
  ColumnWidthOutlined,
  StarOutlined
} from '@ant-design/icons';
import ImageLoader from '../ImageLoader';
import { useAppContext } from '../../Context';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Select } from 'antd';
import ComparisonSlider from '../ComparisonSlider';

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
}

const Editor: React.FC<EnvironmentProps> = ({}) => {
  const [selectedTextures1, setSelectedTextures1] = useState<Image[]>([]);
  const [selectedTextures2, setSelectedTextures2] = useState<Image[]>([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [option, setOption] = useState<any>(null);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [sectionSelected, setSectionSelected] = useState("1");
  const [controls, setControls] = useState<any>([]);
  const [textures, setTextures] = useState<any>([]);
  const [textureSearch, setTextureSearch] = useState<string>("");
  const [enviromentSearch, setEnviromentSearch] = useState<string>("");
  const [categories, setCategories] = useState<any[]>([]);
  const [categorySelected, setCategorySelected] = useState<any>('-1');
  const [comparator, setComparator] = useState<boolean>(false);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [enviromentSelectedComparator, setEnviromentSelectedComparator] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<any[]>([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [textureDetail, setTextureDetail] = useState<any>(null);
  
  const { state, dispatch } = useAppContext();

  const termIdExists = (termId:any, objectArray:[]) => {
    // console.log("onj",objectArray.find((obj:any) => obj.term_id === termId),termId, objectArray)
    return objectArray.find((obj:any) => obj.term_id === termId)?true:false;
  }

  useEffect(()=>{
    let envCpy = state.environments.map(env => ({
      name: env.title,
      id: env.id,
      thumbnail: env.thumbnail,
      ...env
    }));

    let categoriesCpy:any = [];
    for(let i=0;i<envCpy.length;i++) {
      // console.log(envCpy[i].enviroment_category)
      if(envCpy[i].enviroment_category)
        for(let j=0;j<envCpy[i].enviroment_category.length;j++) {
          if(!termIdExists(envCpy[i].enviroment_category[j].term_id, categoriesCpy)) {
            categoriesCpy.push(envCpy[i].enviroment_category[j]);
          }
        }
    }
    categoriesCpy = categoriesCpy.map((item:any)=>({
      ...item,
      value: item.term_id,
      label: item.name.charAt(0).toUpperCase() + item.name.slice(1)
    }))
    setCategories(categoriesCpy)
  },[])

  useEffect(()=>{

    let texturesArray:any = [];
    for(let i=0;i<state.enviromentSelected.textures.length;i++){
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
    //console.log(texturesArray)
    setTextures(texturesArray);
    setControls(JSON.parse(state.enviromentSelected.metadata.custom_post_type_coordinates).map((item:any, index:any)=>({x:item.x, y:item.y, id:(index+1)})));
    // console.log('here',cpy);
  },[state]);

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
    if(!comparator) {
      const existingTextureIndex = selectedTextures1.findIndex((item) => item.controlId === image.controlId);

      if (existingTextureIndex !== -1) {
        const updatedTextures = [...selectedTextures1];
        updatedTextures[existingTextureIndex] = image;
        setSelectedTextures1(updatedTextures);
      } else {
        setSelectedTextures1([...selectedTextures1, image]);
      }
    }
    if(comparator){
      if(controls[parseInt(sectionSelected)-1].x<sliderPosition) {
        const existingTextureIndex = selectedTextures1.findIndex((item) => item.controlId === image.controlId);

        if (existingTextureIndex !== -1) {
          const updatedTextures = [...selectedTextures1];
          updatedTextures[existingTextureIndex] = image;
          setSelectedTextures1(updatedTextures);
        } else {
          setSelectedTextures1([...selectedTextures1, image]);
        }
      } else {
        const existingTextureIndex = selectedTextures2.findIndex((item) => item.controlId === image.controlId);

        if (existingTextureIndex !== -1) {
          const updatedTextures = [...selectedTextures2];
          updatedTextures[existingTextureIndex] = image;
          setSelectedTextures2(updatedTextures);
        } else {
          setSelectedTextures2([...selectedTextures2, image]);
        }
      }
    }
    // console.log('selectedTextures',selectedTextures);
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
    // console.log(option)
    setOpenSidebar(true);
    setOption(option);
  }

  const handleSelectedEnviroment = (env:any) => {
    // console.log(env);
    dispatch({ type: 'SET_ENVIRONMENT', payload: env });
    setSelectedTextures1([]);
    setSelectedTextures2([]);
    setSectionSelected("1");
  }

  const handleTextureSearch = (e:any) => {
    setTextureSearch(e.target.value);
  }

  const handleChange = (value: string) => {
    setEnviromentSearch("");
    setCategorySelected(value);
  }

  const handleEnviromentSearch = (e:any) => {
    setEnviromentSearch(e.target.value);
    setCategorySelected('-1');
  }

  const handleComparisonChange = (e:any) => {
    setSliderPosition(e.percentage);
  }

  useEffect(()=> {
    // console.log(enviromentSelectedComparator, sectionSelected, controls);
    // console.log(enviromentSelectedComparator, sectionSelected, controls);
    if(comparator && controls[(parseInt(sectionSelected) - 1)]) {
      if(controls[parseInt(sectionSelected)-1].x<sliderPosition){
        setEnviromentSelectedComparator(1);
      } else {
        setEnviromentSelectedComparator(2);
      }
    }
  }, [sliderPosition])

  const handleComparator = () => {
    setComparator(!comparator);
  }

  const handleModal = () => {
    console.log(state.enviromentSelected.all_labels)
    setIsModalOpen(!isModalOpen);
  }

  const verifyCategories = (texture:any) => {
    let i = 0;
    while(texture.texture_information.category[i]){
      if(filters.includes(texture.texture_information.category[i].slug))
        return true;
      i++
    }
    return false;
  }

  const handleDetailModal = () => {
    setIsDetailOpen(!isDetailOpen);
  }
  
  return (
    <React.Fragment>
      <div className='editor-container'>

        <div className='enviroment-container'>
            <div className='editor-wrapper'>
              <ImageLoader src={state.enviromentSelected.background_image} alt="" className='original-enviroment' loading="lazy"/>
              {comparator ?
              <ComparisonSlider 
                leftComponent = {
                  <>
                    <ImageLoader src={state.enviromentSelected.background_image} alt="Back Image" className='img-bg' loading="lazy"/>

                    {selectedTextures1.map((item, index) => (
                      <ImageLoader 
                        className='img-layer absolute-0-0'
                        src={item.url} 
                        alt={""} 
                        key={index+""+item.url} 
                        skeleton={false}
                      />
                    ))}

                    <ImageLoader src={state.enviromentSelected.front_image} alt="" loading="lazy" className='front-img absolute-0-0'/>
                  </>
                }
                rightComponent = {
                  <>
                    <ImageLoader src={state.enviromentSelected.background_image} alt="Back Image" className='img-bg' loading="lazy"/>
                    
                    {selectedTextures2.map((item, index) => (
                      <ImageLoader 
                        className='img-layer absolute-0-0'
                        src={item.url} 
                        alt={""} 
                        key={index+""+item.url} 
                        skeleton={false}
                      />
                    ))}

                    <ImageLoader src={state.enviromentSelected.front_image} alt="" loading="lazy" className='front-img absolute-0-0'/>
                  </>
                }
                onChange={handleComparisonChange}
              />
              :
              <>
                <ImageLoader src={state.enviromentSelected.background_image} alt="Back Image" className='img-bg' loading="lazy"/> 
                {selectedTextures1.map((item, index) => (
                    <ImageLoader 
                      className='img-layer'
                      src={item.url} 
                      alt={""} 
                      key={index+""+item.url} 
                      skeleton={false}
                    />
                ))}
                <ImageLoader src={state.enviromentSelected.front_image} alt="" loading="lazy" className='front-img'/>
              </>
              }

              


              {/* {selectedTextures2.map((item, index) => (
                  <ImageLoader 
                    className='img-layer'
                    src={item.url} 
                    alt={""} 
                    key={index+""+item.url} 
                    skeleton={false}
                  />
              ))}  */}

              
              {
                controls.map((item:any, index:any)=> {
                  return (
                    <button 
                      className = {`enviroment-change-control ${isMouseMoving?"enviroment-change-control-active":""} ${`${sectionSelected}`===`${item.id}`?"enviroment-change-control-selected":""}`} 
                      key={index} 
                      style={{left:`${item.x}%`,top:`${item.y}%`}}
                      onClick={()=>handleEnviroment(item)}
                    >
                      <FormOutlined />
                    </button>
                  )
                })
              }
              {comparator &&
                <div className='enviroment-active-wrapper'>
                  <div className={'envitomen-indicator '+(enviromentSelectedComparator===1?'envitomen-indicator-active':'')}>
                    <DesktopOutlined />
                  </div>
                  <div className={'envitomen-indicator '+(enviromentSelectedComparator===2?'envitomen-indicator-active':'')}>
                    <DesktopOutlined />
                  </div>
                </div>
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
          <div className='compare-enviroments-btn' onClick={handleComparator}>
            <SplitCellsOutlined />
          </div>
          <div className='editor-sidebar-content'>
            <div className='textures-container'>
              {
              option === 1 &&
              <>
                <div className='sidebar-header'>
                  <span>
                    <Input addonBefore={<SearchOutlined />} placeholder="Search asd" onChange={handleEnviromentSearch} value={enviromentSearch}/>
                  </span>
                  <span>
                    <Select
                      value={categorySelected}
                      defaultValue={'-1'}
                      style={{ width: '100%' }}
                      onChange={handleChange}
                      options={[
                        {
                          value:'-1',
                          label: "All"
                        },
                        ...categories
                      ]}
                    />
                  </span>
                </div>
                <div className='sidebar-content '>
                  <Row gutter={[0, 16]} className='w-full'>
                    {
                      (categorySelected !== '-1') ? 
                      state.environments.map((item, index) => (
                        (item.enviroment_category) ?
                        ((item.enviroment_category.find((obj:any)=>(obj.term_id === categorySelected))) ?
                        <Col key={index} xs={24} sm={24} md={24} lg={24}>
                          <div className={`enviroment-item texture-item-container ${selectedTextures1.some((texture)=>texture.id===item.id)?"texture-item-selected":""}`} onClick={()=>handleSelectedEnviroment(item)}>
                            <div className='texture-data'>
                              <h5>{item.title}</h5>
                            </div>
                            <ImageLoader src={item.thumbnail} alt="" skeleton/>
                          </div>
                        </Col>
                        :
                        <></>
                        )
                        :
                        <></>
                      ))
                      :
                      (sectionSelected && state.environments.map((item:any, index:any) => (
                        (enviromentSearch==="") ?
                        <Col key={index} xs={24} sm={24} md={24} lg={24}>
                          <div className={`enviroment-item texture-item-container ${selectedTextures1.some((texture)=>texture.id===item.id)?"texture-item-selected":""}`} onClick={()=>handleSelectedEnviroment(item)}>
                            <div className='texture-data'>
                              <h5>{item.title}</h5>
                            </div>
                            <ImageLoader src={item.thumbnail} alt="" skeleton/>
                          </div>
                        </Col>
                        :
                        (
                          (item.labels && item.labels.find((obj:any)=>(new RegExp(enviromentSearch, "i").test(obj.name)))) ?
                            <Col key={index} xs={24} sm={24} md={24} lg={24}>
                              <div className={`enviroment-item texture-item-container ${selectedTextures1.some((texture)=>texture.id===item.id)?"texture-item-selected":""}`} onClick={()=>handleSelectedEnviroment(item)}>
                                <div className='texture-data'>
                                  <h5>{item.title}</h5>
                                </div>
                                <ImageLoader src={item.thumbnail} alt="" skeleton/>
                              </div>
                            </Col>
                          :
                            <></>
                        )
                      )))
                    }
                  </Row>
                </div>
              </>
              }
              {
              option === 2 &&
              <>
                <div className='sidebar-header sidebar-textures'>
                  <Input addonBefore={<SearchOutlined />} placeholder="Search asd" onChange={handleTextureSearch} />
                  <div className='filter-btn-wrapper'>
                    <Button type="primary" shape="circle" icon={<FilterOutlined />} onClick={handleModal}/>
                  </div>
                </div>
                {filters.length > 0 && 
                <div className='filter-tags-container'>
                  {
                    [...state.enviromentSelected.all_labels.map((category:any)=>({ label:category.name, value:category.slug }))].map((texture)=> {
                      if(filters.includes(texture.value))
                        return (
                          <>
                            <Tag>{texture.label}</Tag>
                          </>
                        )
                      return <></>;
                    })
                  }
                  <Button type="primary" shape="circle" icon={<ClearOutlined />} onClick={()=>setFilters([])}/>
                </div>
                }
                <Row gutter={[2, 2]} className='w-full'>
                  {
                    filters.length > 0 ?
                    <>
                    {(sectionSelected) && textures.filter((texture:any)=>(`${texture.controlId}`===`${sectionSelected}`)).filter((texture:any)=>verifyCategories(texture)).map((item:any, index:any) => (
                        <Col key={index} xs={8} sm={8} md={8} lg={8}>
                          <div 
                            className={`texture-item-container ${(enviromentSelectedComparator===1?(selectedTextures1.some((texture)=>texture.id===item.id)):(selectedTextures2.some((texture)=>texture.id===item.id)))?"texture-item-selected":""}`} 
                          >
                            <div className='texture-data' onClick={()=>handleTexture(item)}>
                              <h5>{item.name}</h5>
                            </div>
                              <div className='texture-more-info' onClick={()=>{setTextureDetail(item); setIsDetailOpen(true)}}>
                              <MoreOutlined />
                            </div>
                            <ImageLoader src={item.textureUrl} alt="" skeleton/>
                          </div>
                        </Col>
                      ))}
                    </>
                    :
                    <>
                    {
                    (textureSearch === "") ?
                      <>
                        {(sectionSelected) && textures.filter((texture:any)=>(`${texture.controlId}`===`${sectionSelected}`)).map((item:any, index:any) => (
                          <Col key={index} xs={8} sm={8} md={8} lg={8}>
                            <div 
                              className={`texture-item-container ${(enviromentSelectedComparator===1?(selectedTextures1.some((texture)=>texture.id===item.id)):(selectedTextures2.some((texture)=>texture.id===item.id)))?"texture-item-selected":""}`} 
                            >
                              <div className='texture-data' onClick={()=>handleTexture(item)}>
                                <h5>{item.name}</h5>
                              </div>
                              <div className='texture-more-info' onClick={()=>{setTextureDetail(item); setIsDetailOpen(true)}}>
                                <MoreOutlined />
                              </div>
                              <ImageLoader src={item.textureUrl} alt="" skeleton/>
                            </div>
                          </Col>
                        ))}
                      </>
                      :
                      <>
                        {(sectionSelected) && textures.filter((texture:any)=>(`${texture.controlId}`===`${sectionSelected}`)).map((item:any, index:any) => (
                          (item.texture_information.category.find((obj:any)=>(new RegExp(textureSearch, "i").test(obj.name)))) ?
                          <Col key={index} xs={8} sm={8} md={8} lg={8}>
                            <div 
                              className={`texture-item-container ${(enviromentSelectedComparator===1?(selectedTextures1.some((texture)=>texture.id===item.id)):(selectedTextures2.some((texture)=>texture.id===item.id)))?"texture-item-selected":""}`} 
                              onClick={()=>handleTexture(item)}
                            >
                              <div className='texture-data'>
                                <h5>{item.name}</h5>
                              </div>
                              <div className='texture-more-info' onClick={()=>{setTextureDetail(item); setIsDetailOpen(true)}}>
                                <MoreOutlined />
                              </div>
                              <ImageLoader src={item.textureUrl} alt="" skeleton/>
                            </div>
                          </Col>
                          :
                          <></>
                        ))}
                      </>
                      }
                    </>
                  }
                </Row>
              </>
              }
              {
              option === 3 &&
              <>
                <div className='sidebar-header sidebar-summary'>
                  <h3>Summary</h3>
                </div>
                <div className='summary-container'>
                  {
                    comparator && 
                    <h3>Left enviroment</h3>
                  }
                  <Row gutter={[16, 16]} className='w-full'>
                    {sectionSelected && selectedTextures1.map((item:any, index:any) => (
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
                  
                  {
                    comparator && 
                    <>
                      <h3>Right enviroment</h3>
                      
                      <Row gutter={[16, 16]} className='w-full'>
                      {sectionSelected && selectedTextures2.map((item:any, index:any) => (
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
                  </>
                  }
                </div>
              </>
              }
            </div>
          </div>
        </div>
        <>
        <Modal title="" open={isModalOpen} onOk={handleModal} onCancel={handleModal} cancelButtonProps={{ style: { display: 'none' } }}>
          <div className='texture-detail'>
              <h3>Categories</h3>
              <div>
                <Checkbox.Group
                  options={[...state.enviromentSelected.all_labels.map((category:any)=>({ label:category.name, value:category.slug }))]}
                  onChange={(e)=>setFilters(e)}
                  value={filters}
                />
              </div>
          </div>
        </Modal>
        <Modal title="" open={isDetailOpen} onOk={handleDetailModal} onCancel={handleDetailModal} cancelButtonProps={{ style: { display: 'none' } }}>
          <div className='texture-detail'>
              {textureDetail &&
              <>
                <h3>{textureDetail.name}</h3>
                <p>{textureDetail.texture_information.description}</p>
                <div>
                  <Tag icon={<ColumnWidthOutlined />} color="success">
                  </Tag>
                  <Tag icon={<StarOutlined />} color="error">
                    New
                  </Tag>
                </div>
              </>
              }
          </div>
        </Modal>
        </>
      </div>  

    </React.Fragment>
  );
};

export default Editor;
