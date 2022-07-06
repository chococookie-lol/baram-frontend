const versionString = '12.12.1';
const baseUrl = `https://ddragon.leagueoflegends.com/cdn`;
const imageBaseUrl = `${baseUrl}/img`;
const profileIconUrl = `${baseUrl}/${versionString}/img/profileicon/`;
const championPicUrl = `${baseUrl}/${versionString}/img/champion/`;
const itemUrl = `${baseUrl}/${versionString}/img/item/`;
const runesUrl = `${baseUrl}/${versionString}/data/ko_KR/runesReforged.json`;

export interface MainRune {
  icon: string;
  id: number;
  key: string;
  name: string;
  slots: slots[];
}

export interface slots {
  runes: SubRune[];
}

export interface SubRune {
  icon: string;
  key: string;
  id: number;
  longDesc: string;
  name: string;
  shortDesc: string;
}

let runeData: MainRune[] | undefined = undefined;

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

export async function getRunesInfo() {
  await fetch(runesUrl)
    .then(res => {
      return res.json();
    })
    .then(data => {
      runeData = data;
    });
}

export async function getMainRuneURL(primaryStyle: number, primaryId: number[]) {
  let ret: string[] = [];
  if (runeData === undefined) {
    await getRunesInfo();
  }

  for (const d of runeData!) {
    if (d.id === primaryStyle) {
      ret.push(imageBaseUrl + '/' + d.icon);
      for (const slotIdx in d.slots) {
        for (const rune of d.slots[slotIdx].runes) {
          if (rune.id === primaryId[slotIdx]) {
            ret.push(imageBaseUrl + '/' + rune.icon);
          }
        }
      }
      break;
    }
  }

  return ret;
}

export async function getSubRuneURL(subStyle: number, subId: number[]) {
  let ret: string[] = [];
  if (runeData === undefined) {
    await getRunesInfo();
  }

  let curIdx = 0;

  for (const d of runeData!) {
    if (d.id === subStyle) {
      ret.push(imageBaseUrl + '/' + d.icon);
      for (const slotIdx in d.slots) {
        for (const rune of d.slots[slotIdx].runes) {
          if (rune.id === subId[curIdx]) {
            ret.push(imageBaseUrl + '/' + rune.icon);
            curIdx++;
            if (curIdx > 2) {
              break;
            }
          }
        }
      }
      break;
    }
  }

  return ret;
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
