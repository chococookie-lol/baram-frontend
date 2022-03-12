import { getChampionPicUrl } from '../model/Ddragon';
import '../css/ChampionInfo.css';

interface ChampionInfoProps {
  championName?: string,
  level?: number,
}

export default function ChampionInfo(props: ChampionInfoProps) {
  return (<div className='champion-pic'>
    <div className='champion-wrapper'>
      <img src={getChampionPicUrl(props.championName!)} />
      <div className='gradient'></div>
      <div className='level'>
        <p>{props.level}</p>
      </div>
    </div>
  </div>);
}