// Environment.tsx
import React from 'react';
import './styles.scss';

interface EnvironmentProps {
  data: {
    id: number;
    name: string;
    thumbnail: any;
  };
}

const Environment: React.FC<EnvironmentProps> = ({ data }) => {
  return (
    <div className='enviroment-container'>
      <img src={data.thumbnail}/>
      <div className='enviroment-data'>
        <span>{ data.name }</span>
      </div>
    </div>
  );
};

export default Environment;
