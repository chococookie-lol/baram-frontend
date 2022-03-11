import React, { useEffect, useState } from 'react';
import * as Api from '../model/Api';
import '../css/Kda.css';

interface KdaProps{
    k: number,
    d: number,
    a: number,
}

export default function Kda(props: KdaProps){
    const {k,d,a} = props;
    return(
        <div className='kda'>
            <div className='kda-row'>
                <p>{k}</p>
                <a>/</a>
                <p>{d}</p>
                <a>/</a>
                <p>{a}</p>
            </div>
            <div className='kda-average'>
                <p>
                    {((k+a) / (d==0 ? 1:d)).toFixed(2)}:1
                </p>
            </div>
        </div>
    );
}