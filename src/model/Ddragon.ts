const versionString = '12.5.1'
const profileIconUrl = `https://ddragon.leagueoflegends.com/cdn/${versionString}/img/profileicon/`;
const championPicUrl = `https://ddragon.leagueoflegends.com/cdn/${versionString}/img/champion/`;
const itemUrl = `https://ddragon.leagueoflegends.com/cdn/${versionString}/img/item/`;

export function getProfileIconUrl(iconNumber: string) {
    return profileIconUrl + iconNumber + '.png';
}

// 120px x 120px
export function getChampionPicUrl(championName: string){
    return championPicUrl+championName+'.png';
}

export function getRunePicUrl(style: string){
    return `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${style}.png`
}

export function getItemPicUrl(id: number){
    return itemUrl+id.toString()+'.png';
}