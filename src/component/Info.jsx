import React, { useEffect, useState } from 'react';
import SummonerInfo from './SummonerInfo';
import MatchList from './MatchList';
import * as Api from '../model/Api';
import { useParams } from 'react-router-dom';

export default function Info(props) {
  const [userData, setUserData] = useState(null);
  const [matchIds, setMatchIds] = useState(null);

  const { name } = useParams();

  useEffect(() => {
    setMatchIds(null);
    setUserData(null);
    refresh();
  }, [name]);

  async function refresh() {
    let userdata;
    let matchdata;
    try {
      userdata = await Api.getSummonerData(name);
      setUserData({ data: userdata });
      matchdata = await Api.getMatchesBySummoner(userdata.puuid);
      setMatchIds({ data: matchdata });
    } catch (e) {
      if (!matchdata) {
        setMatchIds({ error: e });
      }
      if (!userdata) {
        setUserData({ error: e.message })
      }
    }
  }

  return (
    <div id="container">
      <SummonerInfo userdata={userData} />
      <MatchList matchdata={matchIds} />
    </div>
  );
}
