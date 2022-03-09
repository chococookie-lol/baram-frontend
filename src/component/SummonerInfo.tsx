import getProfileIconUrl from 'model/Ddragon';
import { UserData } from '../model/Api';
import '../css/SummonerInfo.css';

interface SummonerInfoProps {
  userdata?: UserData
}

export default function SummonerInfo(props: SummonerInfoProps) {
  const { userdata } = props;

  if (userdata === undefined) {
    return (
      <div id="userData">
        <div>Loading...</div>
      </div>
    )

  } else if (userdata.error !== undefined) {
    return (
      <div id="userData">
        <div>{userdata.error}</div>
      </div>
    )
  } else if (userdata.data !== undefined) {
    return (
      <div id="userData">
        <div id='profileIconContainer'>
          <img className='profileIcon' src={getProfileIconUrl(String(userdata.data.profileIconId))} />
        </div>
        <div id='summonerNameContainer'>
          {userdata.data.name}
        </div>
      </div>
    )
  } else {
    return (<></>);
  }

}