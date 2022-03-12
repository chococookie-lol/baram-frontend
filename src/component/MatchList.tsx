import { useEffect, useState } from 'react';
import * as Api from '../model/Api';
import '../css/MatchList.css';
import ChampionPic from './ChampionPic';
import Kda from './Kda';

const infoKeys = [
  'matchId',
  'gameEndTimestamp',
  'gameId',
  'gameMode',
  'gameName',
  'gameStartTimestamp',
  'gameType',
  'gameVersion',
  'mapId',
];

interface MatchListProps {
  matchdata?: Api.MatchIds,
  puuid?: string,
}

export default function MatchList(props: MatchListProps) {
  const { matchdata, puuid } = props;
  return (
    <div id="matchData">
      {matchdata != undefined ?
        matchdata.error != undefined ?
          <div>{matchdata.error}</div>
          :
          <ul className='match-list'>
            {matchdata.data?.map((i) => (
              <MatchRow key={i} mid={i} puuid={puuid!} />
            ))}
          </ul>
        :
        <div>Loading...</div>
      }
    </div>
  );
}

interface MatchRowProps {
  mid: string,
  puuid: string,
}

function MatchRow(props: MatchRowProps) {
  const [matchData, setMatchData] = useState<Api.MatchData>();
  const [error, setError] = useState(undefined);
  const { mid, puuid } = props;

  useEffect(() => {
    setMatchData(undefined);
    setError(undefined);
    refresh();
  }, [mid]);

  function refresh() {
    Api.getMatchDetail(props.mid).then(
      (res) => setMatchData(res),
      (err) => setError(err)
    );
  }

  if (error) {
    return (
      <li className='match-row'>
        <p>Error</p>
      </li>
    );
  } else if (matchData !== undefined && matchData.participants !== [] && matchData.teams !== []) {
    let summoner: Api.ParticipantsData | undefined, team: Api.TeamsData | undefined;
    for (let s in matchData.participants) {
      if (matchData.participants[s].puuid == puuid) {
        summoner = matchData.participants[s];
        team = summoner.teamId === 100 ? matchData.teams[0] : matchData.teams[1];
      }
    }
    if (summoner === undefined || team === undefined) {
      return (<></>);
    }
    return (
      <li className={'match-row ' + (team.win ? 'win' : 'lose')}>
        <ChampionPic championName={summoner.championName} />
        <Kda k={summoner.kills} d={summoner.deaths} a={summoner.assists} kda={summoner.kda} />
      </li>
    );
  } else {
    return (
      <li className='match-row'>
        <p>Loading...</p>
      </li>
    );
  }
}