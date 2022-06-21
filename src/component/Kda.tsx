import '../css/Kda.css';

interface KdaProps {
  k?: number;
  d?: number;
  a?: number;
  kda?: number;
  loading?: boolean;
}

export default function Kda(props: KdaProps) {
  const { k, d, a, loading } = props;
  if (loading) {
    return (
      <div className="kda">
        <div className="kda-row">
          <p className="loading" style={{ width: '80px', height: '20px' }}>
            {' '}
          </p>
        </div>
        <div className="kda-average">
          <p className="loading" style={{ width: '40px', height: '20px' }}>
            {' '}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="kda">
      <div className="kda-row">
        <p>{k}</p>
        <p>/</p>
        <p>{d}</p>
        <p>/</p>
        <p>{a}</p>
      </div>
      <div className="kda-average">
        <p>{props.kda!.toFixed(2)}:1</p>
      </div>
    </div>
  );
}
