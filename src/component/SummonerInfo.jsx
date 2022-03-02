import React from 'react';
export default function SummonerInfo(props) {
  const { userdata } = props;
  return (
    <div id="userData">
      {userdata ?
        userdata.error ?
          <div>{userdata.error.message}</div>
          :
          Object.keys(userdata.data).map((k, v) => (
            <p key={k}>
              {k} : {userdata.data[k]}
            </p>
          ))
        : 
        <div>Loading...</div>
      }
    </div>
  );
}