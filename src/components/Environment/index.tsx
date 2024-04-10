// Environment.tsx
import React from 'react';
import './styles.scss';

interface EnvironmentProps {
  data: {
    id: number;
    name: string;
    thumbnail: any;
  },
  onClick: any
}

const Environment: React.FC<EnvironmentProps> = ({ data, onClick }) => {
  return (
    <div className='enviroment-grid-item enviroment-container radius-1rem' onClick={()=>onClick(data)}>
      <img src={data.thumbnail}/>
      <div className='enviroment-data'>
        <span>{ data.name }</span>
      </div>
    </div>
  );
};

export default Environment;
