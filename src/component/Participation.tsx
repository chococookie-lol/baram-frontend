import '../css/Participation.css';
import ProgressBar from './ProgressBar';

interface ParticipationProps {
  gold: number,
  killParticipation: number,
  deal: number,
  cs: number,
}

export default function Participation(props: ParticipationProps) {
  return (
    <div className='participation'>
      <table>
        <tbody>
          <tr>
            <td className='val'>{props.cs}</td>
            <td className='key'><p>CS</p></td>
          </tr>
          <tr>
            <td className='val'>{props.gold}</td>
            <td className='key'><p>GOLD</p></td>
          </tr>
          <tr>
            <td className='val'>{props.deal}</td>
            <td className='key'><p>DMG</p></td>
          </tr>

          <tr>
            <td colSpan={2}>
              <ProgressBar progress={Math.round(props.killParticipation*100)}/></td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}