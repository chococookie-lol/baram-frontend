import '../css/Participation.css';

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
            <td>골드:</td>
            <td>{props.gold}</td>
            <td>킬 관여:</td>
            <td>{props.killParticipation.toFixed(2)}</td>
          </tr>
          <tr>
            <td>딜:</td>
            <td>{props.deal}</td>
            <td>cs:</td>
            <td>{props.cs}</td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}