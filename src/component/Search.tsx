import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import '../css/Search.css';

export default function Search() {
  const [summonerName, setSummonerName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { name } = useParams<{ name: string }>();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoading && summonerName !== '') {
      setIsLoading(true);
      navigate('/search/' + summonerName);
      setIsLoading(false);
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSummonerName(e.target.value);
  }

  useEffect(() => {
    if (name !== undefined) {
      setSummonerName(name);
    }
  }, [name])

  return (
    <>
      <div className='HeaderBox'></div>
      <div className="SearchBoxContainer">
        <form onSubmit={onSubmit}>
          <input type='text' value={summonerName} onChange={onChange} placeholder="소환사명" />
          <button style={{
            opacity: isLoading ? 0.3 : 1
          }}>검색</button>
        </form>
      </div>
      <Outlet />
    </>
  );
}
