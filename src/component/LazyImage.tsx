import {useState} from 'react';
import '../css/LazyImage.css';

interface LazyImageProps{
    src: string,
    className?: string,
}
export default function LazyImage(props: LazyImageProps){
    const [loading, setLoading] = useState<boolean>(true);
    return(
        <div className={'lazy-image-container loading ' + props?.className}>
            <img className={loading?'hidden ':'visible ' + props?.className} src={props.src} onLoad={()=>setLoading(false)}/>
        </div>
    )
}