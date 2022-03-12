//import key from './Key';
import * as example from './ApiExample';

const server = 'http://api.baram.ga';
//const server = '/api';

/*
모든 api call은 Promise를 리턴한다.
에러처리는 api 밖에서
*/

export interface UserData {
  data?: SummonerData,
  error?: string,
}

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

export interface MatchIds {
  data?: [string],
  error?: string,
}

export function getSummonerData(name: string) {
  return fetch(`${server}/summoners/${name}`)
    .then((res) => {
      switch (res.status) {
        case 404: //summoner not found
          return fetchSummonerData(name);
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

export function getMatchesBySummoner(puuid: string) {
  return fetch(`${server}/matches/by-puuid/${puuid}`).then((res) => {
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