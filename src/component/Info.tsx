import { useEffect, useState } from 'react';
import SummonerInfo from './SummonerInfo';
import MatchList from './MatchList';
import * as Api from '../model/Api';
import { useParams } from 'react-router-dom';
import { Alert, Spinner } from 'react-bootstrap';
import '../css/Info.css';

export default function Info() {
  const [userData, setUserData] = useState<Api.UserData | undefined>(undefined);
  const [matchIds, setMatchIds] = useState<Api.MatchIds | undefined>(undefined);
  const [isErrors, setIsErrors] = useState<boolean>(false);

  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    setMatchIds(undefined);
    setUserData(undefined);
    refresh();
  }, [name]);

  async function refresh() {
    let userdata;
    let matchdata;

    if (!name) return;

    try {
      userdata = await Api.getSummonerData(name);
      if (userdata === undefined) {
        await Api.fetchSummonerData(name);
        userdata = await Api.getSummonerData(name);
      }
      setUserData({ data: userdata });
      matchdata = await Api.getMatchesByPuuid(userdata.puuid);
      if (matchdata === undefined) {
        await Api.fetchMatchData(userdata.puuid);
        matchdata = await Api.getMatchesByPuuid(userdata.puuid);
      }
      setMatchIds({ data: matchdata });
    } catch (e: unknown) {
      if (e instanceof Error) {
        setIsErrors(true);
        if (!matchdata) {
          setMatchIds({ error: e.message });
        }
        if (!userdata) {
          setUserData({ error: e.message })
        }
      }
    }
  }

  if (isErrors) {
    return (
      <div>
        <p>userData or matchIds is undefined</p>
      </div>
    )
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
      <div className='alert-container'>
        <Alert className='alert-loading' variant='primary'>
          <div className='spinner-container'>
            <Spinner animation='border' variant='primary'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
            <p className='loading-text'> 소환사 정보를 가져오는 중...</p>
          </div>
        </Alert>
      </div>
    )
  }
}
