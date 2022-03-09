import React, { useEffect, useState } from 'react';
import * as Api from '../model/Api';
import '../css/MatchList.css';

const infoKeys = [
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
}

export default function MatchList(props: MatchListProps) {
  const { matchdata } = props;
  return (
    <div id="matchData">
      {matchdata != undefined ?
        matchdata.error != undefined ?
          <div>{matchdata.error}</div>
          :
          <table>
            <thead>
              <tr>
                {infoKeys.map((k) => (
                  <th key={k}>{k}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matchdata.data?.map((i) => (
                <MatchRow key={i} mid={i} />
              ))}
            </tbody>
          </table>
        :
        <div>Loading...</div>
      }
    </div>
  );
}

interface MatchRowProps {
  key: string,
  mid: string,
}

function MatchRow(props: MatchRowProps) {
  const [matchData, setMatchData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const { mid } = props;

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
      <tr>
        <td>Error</td>
      </tr>
    );
  } else if (matchData) {
    return (
      <tr>
        {infoKeys.map((k) => (
          <td key={matchData[k]}>{matchData[k]}</td>
        ))}
      </tr>
    );
  } else {
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  }
}
