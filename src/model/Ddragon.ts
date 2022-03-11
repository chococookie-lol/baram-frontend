const profileIconUrl = 'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/';
const championPicUrl = 'http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/';

export function getProfileIconUrl(iconNumber: string) {
    return profileIconUrl + iconNumber + '.png';
}

export function getChampionPicUrl(championName: string){
    return championPicUrl+championName+'.png';
}