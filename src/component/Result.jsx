import React from 'react';
import * as Api from '../model/Api';
import { useParams } from 'react-router-dom';

const infoKeys = [
  'gameEndTimestamp',
  'gameId',
  'gameMode',
  'gameName',
  'gameStartTimestamp',
  'gameType',
  'gameVersion',
  'mapId',
];

export default function Result() {
  return <Info params={useParams()} />;
}

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      userdata: null,
      matchdata: null,
    };
  }

  //userdata, matchdata는 각각 data와 error를 갖고있다. 각 component에서는 error 유무를 확인하고 render한다.

  componentDidUpdate(prevProps) {
    if (this.props.params !== prevProps.params) {
      this.setState({
        matchdata: null,
        userdata: null,
      });
      this.refresh();
    }
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    Api.getSummonerData(this.props.params.name)
      .then(
        (res) => {
          this.setState({ userdata: {data: res} });
          return Api.getMatchesBySummoner(res);
        }, (err) => {
          this.setState({ userdata: {error: err} });  //fetch summoner data fail, 여기서 throw 안하면 다음 chain에서 resolve로 넘어감
          throw err;
        }
      )
      .then(
        (res) => {
          this.setState({ matchdata: {data: res} })
        }, (err) => {
          this.setState({ matchdata: {error: err} })
        }
      );
  }

  render() {
    const { matchdata, userdata } = this.state;
    return (
      <div id="container">
        <SummonerInfo userdata={userdata} />
        <MatchList matchdata={matchdata} />
      </div>
    );
  }
}

function SummonerInfo(props) {
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

function MatchList(props) {
  const { matchdata } = props;
  return (
    <div id="matchData">
      {matchdata ?
        matchdata.error ?
          <div>{matchdata.error.message}</div>
          :
          <table>
            <thead>
              <tr>
                {infoKeys.map((k) => (
                  <th key={k}>{k}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matchdata.data.map((i) => (
                <MatchRow key={i} mid={i} />
              ))}
            </tbody>
          </table>
        :
        <div>Loading...</div>
      }
    </div>
  );
}

class MatchRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      error: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.mid !== prevProps.mid) {
      this.setState({
        mdata: null,
        error: null,
      });
      this.refresh();
    }
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    Api.getMatchDetail(this.props.mid).then(
      (res) => this.setState({ mdata: res }),
      (err) => this.setState({ error: err })
    );
  }

  render() {
    const { mdata, error } = this.state;

    if (error) {
      return (
        <tr>
          <td>Error</td>
        </tr>
      );
    } else if (mdata) {
      return (
        <tr>
          {infoKeys.map((k) => (
            <td key={mdata[k]}>{mdata[k]}</td>
          ))}
        </tr>
      );
    } else {
      return (
        <tr>
          <td>Loading...</td>
        </tr>
      );
    }
  }
}