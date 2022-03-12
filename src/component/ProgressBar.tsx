import '../css/ProgressBar.css';

interface ProgressBarProps{
    progress: number,
}


export default function ProgressBar(props: ProgressBarProps){
    return(<div className='progress-bar'>
        <div className='bar' style={{width: `${props.progress}%`}}/>
        <p>킬관여 {props.progress}%</p>
    </div>)
}