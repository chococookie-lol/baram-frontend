import key from './Key';
import * as example from './ApiExample';

const server = 'http://api.baram.ga';

/*
모든 api call은 Promise를 리턴한다.
에러처리는 api 밖에서
*/

export function getSummonerData(name) {
  return fetchJson(`${server}/summoners/${name}`).then((res) => {
    switch (res.status) {
      case 404: //summoner not found
        return fetchSummonerData(name);
      case 200: // ok
        return res;
    }
  });
}

export function fetchSummonerData(name) {
  return fetchJson(`${server}/summoners/${name}`).then((res) => {
    switch (res.status) {
      case 200: //fetch success
        return fetchJson(`${server}/summoners/${name}`);
      case 500: //summoner not found
        throw new Error('user not found');
    }
  });
}

export function getMatchesBySummoner(summoner) {
  const { name } = summoner;
  return fetchJson(`${server}/summoners/${name}/matches`).then((res) => {
    switch (res.status) {
      case 200: //ok
        return res.data;
      case 404: //summoner not found
        throw new Error('user not found need fetch');
    }
  });
}

export function getMatchDetail(matchID) {
  return sleep(Math.floor(Math.random() * 3000 + 1000)).then((res) => example.match[matchID]);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function fetchJson(url) {
  return fetch(url).then((res) => res.json());
}