import key from './Key';
import * as example from './ApiExample';

const server = 'http://api.baram.ga';
//const server = '/api';

/*
모든 api call은 Promise를 리턴한다.
에러처리는 api 밖에서
*/

export function getSummonerData(name) {
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

export function fetchSummonerData(name) {
  return fetch(`${server}/summoners/${name}`, {
    method: 'POST',
  }).then((res) => {
    switch (res.status) {
      case 200: //fetch success
        return fetch(`${server}/summoners/${name}`).then(res => res.json());
      case 403: //summoner not found
        throw new Error('Summoner not found');
      default:
        throw new Error('Error');
    }
  });
}

export function getMatchesBySummoner(summoner) {
  const { name } = summoner;
  return fetch(`${server}/summoners/${name}/matches`).then((res) => {
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

export function getMatchDetail(matchID) {
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