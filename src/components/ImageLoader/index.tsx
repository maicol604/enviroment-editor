import React, { useState, useEffect } from 'react';
import {
    LoadingOutlined,
} from '@ant-design/icons';

interface ImageLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const ImageLoader: React.FC<ImageLoaderProps> = (props) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(()=>{
    },[])

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <React.Fragment>
            <img
                {...props}  
                style={{ display: imageLoaded ? 'inline-block' : 'none' }}
                onLoad={handleImageLoad}
            />
        </React.Fragment>
    );
};

export default ImageLoader;
