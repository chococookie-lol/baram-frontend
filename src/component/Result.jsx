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

/*
외부 소스에서 데이터를 불러와서 처리하는 모든 component들은 state에 'error'를 갖고 있다.
render 하기전에 error 유무 확인 -> 불러오는 data의 null 여부 확인 해줘야함.
*/

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      userdata: null,
      matchdata: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.params !== prevProps.params) {
      this.setState({
        matchdata: null,
        userdata: null,
        error: null,
      });
      this.refresh();
    }
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    Api.getSummonerData(this.props.params.name)
      .then((res) => {
        this.setState({ userdata: res });
        return Api.getMatchesBySummoner(res);
      })
      .then((res) => this.setState({ matchdata: res }))
      .catch((err) => this.setState({ error: err }));
  }

  render() {
    const { matchdata, userdata, error } = this.state;
    return (
      <div id="container">
        {error ? <h3>{error.message}</h3> : ''}
        {userdata ? <SummonerInfo userdata={this.state.userdata} /> : <div>Loading...</div>}
        {matchdata ? <MatchList matchdata={this.state.matchdata} /> : <div>Loading...</div>}
      </div>
    );
  }
}

function SummonerInfo(props) {
  const { userdata } = props;
  return (
    <div id="userData">
      {userdata ? (
        Object.keys(userdata).map((k, v) => (
          <p key={k}>
            {k} : {userdata[k]}
          </p>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

function MatchList(props) {
  const { matchdata } = props;
  return (
    <div id="matchData">
      <table>
        <thead>
          <tr>
            {infoKeys.map((k) => (
              <th key={k}>{k}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(matchdata).map((k, v) => (
            <MatchRow key={matchdata[k]} mid={matchdata[k]} />
          ))}
        </tbody>
      </table>
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
        data: null,
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
      (res) => {
        this.setState({ data: res });
      },
      (err) => this.setState(err)
    );
  }

  render() {
    const { data, error } = this.state;

    if (error) {
      return (
        <tr>
          <td>Error</td>
        </tr>
      );
    } else if (!data) {
      return (
        <tr>
          <td>Loading...</td>
        </tr>
      );
    } else {
      return (
        <tr>
          {infoKeys.map((k) => (
            <td key={data.info[k]}>{data.info[k]}</td>
          ))}
        </tr>
      );
    }
  }
}