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

    console.log(userdata);

    return (
      <div id="userData">
        <div>{userdata.error}</div>
      </div>
    )
  } else if (userdata.data !== undefined) {
    return (
      <div id="userData">
        {Object.keys(userdata.data).map((key) => (
          <p key={key}>
            {key} : {(userdata.data as any)[key]}
          </p>
        ))}
      </div>
    )
  } else {
    return (<></>);
  }

}