import { getChampionPicUrl } from '../model/Ddragon';
import '../css/ChampionInfo.css';
import LazyImage from './LazyImage';

interface ChampionInfoProps {
  championName?: string,
  level?: number,
  loading? : boolean;
}

export default function ChampionInfo(props: ChampionInfoProps) {
  if(props.loading){
    return(
      <div className='champion-pic loading'>
        <div className='champion-wrapper'>
        </div>
      </div>
    )
  }
  return (<div className='champion-pic'>
    <div className='champion-wrapper'>
        <LazyImage className='champion-pic-container' src={getChampionPicUrl(props.championName!)} />
      <div className='gradient'></div>
      <div className='level'>
        <p>{props.level}</p>
      </div>
    </div>
  </div>);
}