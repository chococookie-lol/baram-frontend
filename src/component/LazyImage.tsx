import {useState} from 'react';
import '../css/LazyImage.css';

interface LazyImageProps{
    src: string,
    className?: string,
}
export default function LazyImage(props: LazyImageProps){
    const [loading, setLoading] = useState<boolean>(true);
    return(
        <div className={'lazy-image-container ' + props?.className}>
            <div className={loading?'visible ':'hidden ' + ' loading lazy-loading ' + props?.className}/>
            <img className={loading?'hidden ':'visible ' + props?.className} style={{visibility:loading?'hidden':'visible'}} src={props.src} onLoad={()=>setLoading(false)}/>
        </div>
    )
}