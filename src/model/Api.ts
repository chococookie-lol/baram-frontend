//import key from './Key';

const server = 'http://api.baram.ga';
// const server = '/api';

/*
모든 api call은 Promise를 리턴한다.
에러처리는 api 밖에서
*/

export interface SummonerData {
  accountId: string,
  id: string,
  name: string,
  profileIconId: number,
  puuid: string,
  revisionData: string,
  summonerLevel: string,
  recentUpdate: string,
}

export interface MatchData {
  matchId: string,
  gameCreation: string,
  gameDuration: string,
  gameEndTimestamp: string,
  gameId: string,
  gameMode: string,
  gameName: string,
  gameStartTimestamp: string,
  gameType: string,
  gameVersion: string,
  mapId: number,
  platformId: string,
  queueId: number,
  tournamentCode: string,
  participants: ParticipantsData[],
  teams: TeamsData[],
}

export interface ParticipantsData {
  puuid: string,
  goldEarned: string,
  totalMinionsKilled: string,
  kills: number,
  deaths: number,
  assists: number,
  kda: number,
  killParticipation: number,
  championId: number,
  championName: string,
  champLevel: number,
  totalDamageDealtToChampions: string,
  summoner1Id: number,
  summoner2Id: number,
  item0: number,
  item1: number,
  item2: number,
  item3: number,
  item4: number,
  item5: number,
  item6: number,
  summonerName: string,
  teamId: number,
}

export interface TeamsData {
  matchId: string,
  teamId: number,
  win: number,
  totalKill: number,
  totalDeath: number,
  totalAssist: number,
  gameEndedInSurrender: number,
  gameEndedInEarlySurrender: number,
}

const blank_json = {};

export function getSummonerData(name: string) {
  return fetch(`${server}/summoners/${name}`)
    .then((res) => {
      switch (res.status) {
        case 404: //summoner not found
          return undefined;
        case 200: // ok
          return res.json();
        default:
          throw new Error('Error');
      }
    });
}

export function fetchSummonerData(name: string) {
  return fetch(`${server}/summoners/${name}`, {
    method: 'POST',
  }).then((res) => {
    switch (res.status) {
      case 200: //fetch success
        //return fetch(`${server}/summoners/${name}`).then(res => res.json());
        return undefined;
      case 403: //summoner not found
        throw new Error('Summoner not found');
      default:
        throw new Error('Error');
    }
  });
}

export function getMatchesByPuuid(puuid: string) {
  return fetch(`${server}/matches/by-puuid/${puuid}`).then((res) => {
    switch (res.status) {
      case 200: //ok
        return res.json();
      case 404: //summoner(matches) not found
        return undefined;
      default:
        throw new Error('Error');
    }
  });
}

export function getMatchDetail(matchID: string) {
  return fetch(`${server}/matches/${matchID}`).then((res) => {
    switch (res.status) {
      case 200: //ok
        return res.json();
      case 404: //summoner(matches) not found
        throw new Error('Match not found');
      default:
        throw new Error('Error');
    }
  });
}

export function fetchMatchData(puuid: string) {
  return fetch(`${server}/matches/by-puuid/${puuid}`, {
    method: 'POST',
  }).then(res => {
    switch (res.status) {
      case 201:
        return res.json();
      case 403:
        throw new Error('403 Error');
      default:
        throw new Error('Error');
    }
  })
}

export function getMatchesBySummonerAfter(puuid: string, after: number){
  return fetch(`${server}/matches/by-puuid/${puuid}?after=${after}`).then((res) => {
    switch (res.status) {
      case 200: //ok
        return res.json();
      case 404: //summoner(matches) not found
        throw new Error('Match not found');
      default:
        throw new Error('Error');
    }
  });
}

export function fetchMatchDataAfter(puuid: string, after: number){
  return fetch(`${server}/matches/by-puuid/${puuid}?after=${after}`, {
    method: 'POST',
  }).then(res => {
    switch (res.status) {
      case 201:
        return res.json();
      case 403:
        throw new Error('403 Error');
      default:
        throw new Error('Error');
    }
  })
}