import {useState} from 'react';
import '../css/LazyImage.css';

interface LazyImageProps{
    src: string,
    className?: string,
    width?: string,
    height?: string,
}
export default function LazyImage(props: LazyImageProps){
    const [loading, setLoading] = useState<boolean>(true);
    return(
        <div className={'lazy-image-container loading ' + props?.className}>
            <img width={props?.width} height={props?.height} className={loading?'hidden ':'visible ' + props?.className} src={props.src} onLoad={()=>setLoading(false)}/>
        </div>
    )
}