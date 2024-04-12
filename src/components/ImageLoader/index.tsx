import React, { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Skeleton } from 'antd';
import './styles.scss';

interface ImageLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> { skeleton?: any | null}

const ImageLoader: React.FC<ImageLoaderProps> = (props) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
        // console.log('La imagen se ha cargado completamente');
    };

    return (
        <React.Fragment>
            {
                (!imageLoaded && props.skeleton) ?
                <Skeleton.Image 
                    active={true} 
                    style={{width: '100%', position: 'absolute', height: '100%', left: '0', top: '0', zIndex: "10"}}
                />
            :
                <></>
            }
            <img
                {...props}  
                style={{ opacity: (imageLoaded ? '1' : '0') }}
                onLoad={handleImageLoad}
                className={props.className+' img-loader'}
            />
            {
                // !imageLoaded ?
                //     <LoadingOutlined 
                //         style={{position: 'absolute', }}
                //     />
                // :
                // <></>
            }
        </React.Fragment>
    );
};

export default ImageLoader;
