const profileIconUrl = 'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/';

export default function getProfileIconUrl(iconNumber: string) {
    return profileIconUrl + iconNumber + '.png';
}