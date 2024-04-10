// EnvironmentGrid.tsx
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import Environment from '../Environment';
import { useAppContext } from '../../Context';

interface EnvironmentProps {
  onChange: any
}
const EnvironmentGrid: React.FC<EnvironmentProps> = ({ onChange }) => {

  const { state, dispatch } = useAppContext();
  const [enviroments, setEnviroments] = useState<any[]>([]);

  useEffect(()=> {
    let envCpy = state.environments.map(env => ({
      name: env.title,
      id: env.id,
      thumbnail: env.thumbnail,
      ...env
    }));
    setEnviroments([...envCpy]);
    console.log(state);
  },[state])

  const handleClick = (e:any) => {
    // console.log(e)
    onChange(e);
    dispatch({ type: 'SET_ENVIRONMENT', payload: e });
  }

  return (
    <Row gutter={[16, 16]}>
      {enviroments.map((environment) => (
        <Col key={environment.id} xs={24} sm={12} md={8} lg={8}>
          <Environment 
            data={environment} 
            onClick={handleClick}  
          />
        </Col>
      ))}
    </Row>
  );
};

export default EnvironmentGrid;
