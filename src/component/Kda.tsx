import '../css/Kda.css';

interface KdaProps {
  k: number,
  d: number,
  a: number,
  kda: number,
}

export default function Kda(props: KdaProps) {
  const { k, d, a } = props;
  return (
    <div className='kda'>
      <div className='kda-row'>
        <p>{k}</p>
        <p>/</p>
        <p>{d}</p>
        <p>/</p>
        <p>{a}</p>
      </div>
      <div className='kda-average'>
        <p>
          {props.kda.toFixed(2)}:1
        </p>
      </div>
    </div>
  );
}