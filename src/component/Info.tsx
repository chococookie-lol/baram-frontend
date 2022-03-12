import { useEffect, useState } from 'react';
import SummonerInfo from './SummonerInfo';
import MatchList from './MatchList';
import * as Api from '../model/Api';
import { useParams } from 'react-router-dom';

export default function Info() {
  const [userData, setUserData] = useState<Api.UserData | undefined>(undefined);
  const [matchIds, setMatchIds] = useState<Api.MatchIds | undefined>(undefined);

  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    setMatchIds(undefined);
    setUserData(undefined);
    refresh();
  }, [name]);

  async function refresh() {
    let userdata;
    let matchdata;

    if (name === undefined) return;

    try {
      userdata = await Api.getSummonerData(name);
      setUserData({ data: userdata });
      matchdata = await Api.getMatchesBySummoner(userdata.puuid);
      setMatchIds({ data: matchdata });
    } catch (e: unknown) {
      if (e instanceof Error) {
        if (!matchdata) {
          setMatchIds({ error: e.message });
        }
        if (!userdata) {
          setUserData({ error: e.message })
        }
      }
    }
  }

  if (userData !== undefined && userData.data !== undefined && matchIds !== undefined) {
    return (
      <div id="container">
        <SummonerInfo userdata={userData} />
        <MatchList matchdata={matchIds} puuid={userData.data.puuid} />
      </div>
    );
  } else {
    return (
      <div>
        <p>userData or matchIds is undefined</p>
      </div>
    )
  }
}
