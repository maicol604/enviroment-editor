// EnvironmentGrid.tsx
import React from 'react';
import { Row, Col } from 'antd';
import Environment from '../Environment';

interface EnvironmentData {
  id: number;
  name: string;
  thumbnail: any;
}

const EnvironmentGrid: React.FC = () => {
  const environmentsData: EnvironmentData[] = [
    { id: 1, name: 'Environment 1', thumbnail: require('../../assets/images/A2_MINIATURA.webp') },
    { id: 2, name: 'Environment 1', thumbnail: require('../../assets/images/A2_MINIATURA.webp') },
    { id: 3, name: 'Environment 1', thumbnail: require('../../assets/images/A2_MINIATURA.webp') },
    { id: 4, name: 'Environment 1', thumbnail: require('../../assets/images/A2_MINIATURA.webp') },
    { id: 5, name: 'Environment 1', thumbnail: require('../../assets/images/A2_MINIATURA.webp') },
    { id: 6, name: 'Environment 1', thumbnail: require('../../assets/images/A2_MINIATURA.webp') },
    { id: 7, name: 'Environment 1', thumbnail: require('../../assets/images/A2_MINIATURA.webp') },
    { id: 8, name: 'Environment 1', thumbnail: require('../../assets/images/A2_MINIATURA.webp') },
    // ... más datos
  ];

  return (
    <Row gutter={[16, 16]}>
      {environmentsData.map((environment) => (
        <Col key={environment.id} xs={24} sm={12} md={8} lg={6}>
          <Environment data={environment} />
        </Col>
      ))}
    </Row>
  );
};

export default EnvironmentGrid;
