const versionString = '12.5.1';
const profileIconUrl = `https://ddragon.leagueoflegends.com/cdn/${versionString}/img/profileicon/`;
const championPicUrl = `https://ddragon.leagueoflegends.com/cdn/${versionString}/img/champion/`;
const itemUrl = `https://ddragon.leagueoflegends.com/cdn/${versionString}/img/item/`;

export function getProfileIconUrl(iconNumber: string) {
  return profileIconUrl + iconNumber + '.png';
}

// 120px x 120px
export function getChampionPic(championName: string) {
  return championPicUrl + championName + '.png';
}

export function getItemPic(id: number) {
  return itemUrl + id.toString() + '.png';
}

export function getMainRunePic() {
  return 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Conqueror/Conqueror.png';
}

export function getSubRunePic() {
  return 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7204_Resolve.png';
}

export function getSummonerSpellPic() {
  return 'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/SummonerFlash.png';
}
