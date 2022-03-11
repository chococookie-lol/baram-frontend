import React, { useEffect, useState } from 'react';
import * as Api from '../model/Api';
import {getChampionPicUrl} from '../model/Ddragon';
import '../css/ChampionPic.css';


interface ChampionPicProps {
    championName?: string;
}

export default function(props: ChampionPicProps){
    return(<div className='champion-pic'>
        <img src={getChampionPicUrl(props.championName!)}/>
    </div>);
}