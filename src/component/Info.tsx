import { useEffect, useState } from 'react';
import SummonerInfo from './SummonerInfo';
import MatchList from './MatchList';
import * as Api from '../model/Api';
import { useParams } from 'react-router-dom';
import { Alert, Collapse} from 'react-bootstrap';
import RippleSpinner from './RippleSpinner';
import '../css/Info.css';

export default function Info() {
  const [userData, setUserData] = useState<Api.SummonerData | undefined>(undefined);
  const [matchIds, setMatchIds] = useState<string[] | undefined>(undefined);
  const [error, setError] = useState<unknown>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    setMatchIds(undefined);
    setUserData(undefined);
    refresh();
  }, [name]);

  async function refresh() {
    let userdata;
    let matchdata;
    setLoading(true);

    if (!name) return;

    try {
      userdata = await Api.getSummonerData(name);
      if (!userdata) {
        await Api.fetchSummonerData(name);
        userdata = await Api.getSummonerData(name);
      }
      setUserData(userdata);
      matchdata = await Api.getMatchesByPuuid(userdata.puuid);
      if (!matchdata) {
        await Api.fetchMatchData(userdata.puuid);
        matchdata = await Api.getMatchesByPuuid(userdata.puuid);
      }
      setMatchIds(matchdata);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e);
      }
    }

    setLoading(false);
  }

  if (error) {
    return (
      <div>
        <p>userData or matchIds is undefined</p>
      </div>
    )
  }
  return (
    <div id="container">
      <Collapse in={loading}>
        <div className='alert-container'>
          <Alert className='alert-loading' variant='primary'>
              <RippleSpinner/>
              <p className='loading-text'> 소환사 정보를 가져오는 중...</p>
          </Alert>
        </div>
      </Collapse>
      <div>
        <SummonerInfo userdata={userData} />
        <MatchList matchdata={matchIds} puuid={userData?.puuid} />
      </div>
    </div>
  );
}
