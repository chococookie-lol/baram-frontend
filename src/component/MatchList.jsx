import React from 'react';
import * as Api from '../model/Api';

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

export default function MatchList(props) {
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