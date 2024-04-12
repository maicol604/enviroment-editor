// EnvironmentGrid.tsx
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Select } from 'antd';
import Environment from '../Environment';
import { useAppContext } from '../../Context';
import './styles.scss';

interface EnvironmentProps {
  onChange: any
}
const EnvironmentGrid: React.FC<EnvironmentProps> = ({ onChange }) => {

  const { state, dispatch } = useAppContext();
  const [enviroments, setEnviroments] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [categorySelected, setCategorySelected] = useState<any>('-1');
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(()=> {
    let envCpy = state.environments.map(env => ({
      name: env.title,
      id: env.id,
      thumbnail: env.thumbnail,
      ...env
    }));
    setEnviroments([...envCpy]);
    
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
  },[state])

  const handleClick = (e:any) => {
    onChange(e);
    dispatch({ type: 'SET_ENVIRONMENT', payload: e });
  }
  
  const handleChange = (value: string) => {
    // console.log(`selected ${value}`);
    setSearchValue("");
    setCategorySelected(value);
  }

  const handleSearch = (e:any) => {
    setCategorySelected('-1');
    setSearchValue(e.target.value)
  }

  const termIdExists = (termId:any, objectArray:[]) => {
    // console.log("onj",objectArray.find((obj:any) => obj.term_id === termId),termId, objectArray)
    return objectArray.find((obj:any) => obj.term_id === termId)?true:false;
  }

  return (
    <div className='enviroments-grid-container'>
      <div className='filter-section'>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={8}>
          <Input addonBefore={<SearchOutlined />} placeholder="Search" onChange={handleSearch} value={searchValue}/>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
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
              ...categories,
            ]}
          />
        </Col>
      </Row>
      </div>
      <Row gutter={[16, 16]}>
        {
          (categorySelected !== '-1') ? 
          enviroments.map((environment) => (
            (environment.enviroment_category) ?
            ((environment.enviroment_category.find((obj:any)=>(obj.term_id === categorySelected))) ?
            <Col key={environment.id} xs={24} sm={12} md={8} lg={8}>
              <Environment 
                data={environment} 
                onClick={handleClick}
              />
            </Col>
            :
            <></>
            )
            :
            <></>
          ))
          :
          enviroments.map((environment) => (
            (searchValue==="") ?
            <Col key={environment.id} xs={24} sm={12} md={8} lg={8}>
              <Environment 
                data={environment} 
                onClick={handleClick}  
              />
            </Col>
            :
            (
              (environment.labels && environment.labels.find((obj:any)=>(new RegExp(searchValue, "i").test(obj.name)))) ?
                <Col key={environment.id} xs={24} sm={12} md={8} lg={8}>
                  <Environment 
                    data={environment} 
                    onClick={handleClick}  
                  />
                </Col>
              :
                <></>
            )
          ))
        }
      </Row>
    </div>
  );
};

export default EnvironmentGrid;
