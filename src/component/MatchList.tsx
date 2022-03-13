import { useEffect, useState, useRef } from 'react';
import * as Api from '../model/Api';
import '../css/MatchList.css';
import ChampionInfo from './ChampionInfo';
import Kda from './Kda';
import Participation from './Participation';
import ItemList from './ItemList';

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
  matchdata?: string[],
  puuid?: string,
}

interface MatchListRef{
  load: number,
  last: number,
}

export default function MatchList(props: MatchListProps) {
  const {puuid} = props;
  const [matchdata, setMatchData] = useState<string[]>(props.matchdata!);
  const [canloadMore, setCanLoadMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const ref = useRef<MatchListRef>({load:0, last:0});

  async function loadMore(){
    setCanLoadMore(false);
    setLoading(true);
    try{
      let res:string[] = await Api.getMatchesBySummonerAfter(puuid!, ref.current.last);
      setMatchData([...matchdata, ...res]);
    }catch(err){
      await fetchMore();
    }
    setCanLoadMore(true);
    setLoading(false);
  }

  useEffect(()=>{
    setMatchData(props!.matchdata!);
  },[props.matchdata])

  async function fetchMore(){
    try{
      await Api.fetchMatchDataAfter(puuid!, ref.current.last);
      let res:string[] = await Api.getMatchesBySummonerAfter(puuid!, ref.current.last);
      setMatchData([...matchdata, ...res]);
    }catch(err){
      console.log(err);
    }
    // setCanLoadMore(true);
    // setLoading(false);
  }

  function loaded(time: number){
    ref.current.load++;
    if(ref.current.last > time || ref.current.last == 0){
      //update last time
      ref.current.last = time;
    }
    setCanLoadMore(ref.current.load >= matchdata!.length);
  }

  return (
    <div id="matchData">
      <ul className='match-list'>
      {matchdata?
        matchdata.map((i) => (
          <MatchRow key={i+puuid} mid={i} load={loaded} puuid={puuid!} />
        ))
        :
        <MatchRow loading={true}/>
      }
      {canloadMore ? <li style={{textAlign:'center'}}><button onClick={loadMore}>더보기</button></li> : ''}
      {loading ? <MatchRow loading={true}/> : ''}
      </ul>
    </div>
  );
}

interface MatchRowProps {
  mid?: string,
  puuid?: string,
  load?: Function,
  loading?: boolean,
}

function MatchRow(props: MatchRowProps) {
  const [matchData, setMatchData] = useState<Api.MatchData>();
  const [error, setError] = useState(undefined);
  const { mid, puuid, loading } = props;

  useEffect(() => {
    setMatchData(undefined);
    setError(undefined);
    refresh();
  }, [mid]);

  function refresh() {
    Api.getMatchDetail(props.mid!).then(
      (res) => {
        setMatchData(res);
        props.load!(res.gameEndTimestamp);
      },
      (err) => setError(err)
    );
  }

  if (loading || matchData?.participants === undefined || matchData.teams === undefined) {
    //loading
    return (
      <li className='match-row neutral'>
        <ChampionInfo loading={true}/>
        <Kda loading={true}/>
        <Participation loading={true}/>
        <ItemList loading={true}/>
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
    if (error || !summoner || !team) {
      return (<>error</>);
    }

    return (
      <li className={'match-row ' + (team.win ? 'win' : 'lose')}>
        <ChampionInfo championName={summoner.championName} level={summoner.champLevel}/>
        <Kda k={summoner.kills} d={summoner.deaths} a={summoner.assists} kda={summoner.kda} />
        <Participation gold={Number(summoner.goldEarned!)} killParticipation={summoner.killParticipation}
          deal={Number(summoner.totalDamageDealtToChampions!)} cs={Number(summoner.totalMinionsKilled!)}/>
        <ItemList items={[summoner.item0, summoner.item1, summoner.item2, summoner.item3, summoner.item4, summoner.item5]}/>
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

function loadingMatchRow(){
  
}
