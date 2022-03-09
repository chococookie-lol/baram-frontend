import getProfileIconUrl from 'model/Ddragon';
import { UserData, SummonerData } from '../model/Api';

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
        <img className='profileIcon' src={getProfileIconUrl(userdata.data.profilIconId.toString())} />
        <p>{userdata.data.name}</p>
      </div>
    )
  } else {
    return (<></>);
  }

}