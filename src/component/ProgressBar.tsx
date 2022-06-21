import '../css/ProgressBar.css';
import { useState, useEffect } from 'react';

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar(props: ProgressBarProps) {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(false);
  });
  return (
    <div className="progress-bar-static">
      <div className="bar-container" style={{ width: `${props.progress}%` }}>
        <div className="bar" />
      </div>

      <p>킬관여 {props.progress}%</p>
    </div>
  );
}
