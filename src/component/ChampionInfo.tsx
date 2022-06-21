import { getChampionPic, getMainRunePic, getSubRunePic, getSummonerSpellPic } from '../model/Ddragon';
import '../css/ChampionInfo.css';
import LazyImage from './LazyImage';

interface ChampionInfoProps {
  championName?: string;
  level?: number;
  loading?: boolean;
}

export default function ChampionInfo(props: ChampionInfoProps) {
  if (props.loading) {
    return (
      <div className="champion-pic">
        <div className="champion-wrapper loading">
          <div className="gradient"></div>
        </div>
        <div className="rune-spell">
          <div className="champion-rune-container">
            <div className="champion-main-rune" />
            <div className="sub-rune-container">
              <div className="champion-sub-rune" />
            </div>
          </div>
          <div className="spell-container">
            <div className="spell-wrapper">
              <div className="spell loading" />
            </div>
            <div className="spell-wrapper" style={{ marginLeft: '2px' }}>
              <div className="spell loading" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="champion-pic">
      <div className="champion-wrapper">
        <LazyImage className="champion-pic-container" src={getChampionPic(props.championName!)} />
        <div className="gradient">
          <div className="level">
            <p>{props.level}</p>
          </div>
        </div>
      </div>
      <div className="rune-spell">
        <div className="champion-rune-container">
          <LazyImage className="champion-main-rune" src={getMainRunePic()} />
          <div className="sub-rune-container">
            <LazyImage className="champion-sub-rune" src={getSubRunePic()} />
          </div>
        </div>
        <div className="spell-container">
          <div className="spell-wrapper">
            <LazyImage className="spell" src={getSummonerSpellPic()} />
          </div>
          <div className="spell-wrapper" style={{ marginLeft: '2px' }}>
            <LazyImage className="spell" src={getSummonerSpellPic()} />
          </div>
        </div>
      </div>
    </div>
  );
}
