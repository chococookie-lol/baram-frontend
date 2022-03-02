import React from 'react';
import SummonerInfo from './SummonerInfo';
import MatchList from './MatchList';
import * as Api from '../model/Api';

export default class Info extends React.Component {
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
          this.setState({ userdata: { data: res } });
          return Api.getMatchesBySummoner(res);
        }, (err) => {
          this.setState({ userdata: { error: err } });  //fetch summoner data fail, 여기서 throw 안하면 다음 chain에서 resolve로 넘어감
          throw err;
        }
      )
      .then(
        (res) => {
          this.setState({ matchdata: { data: res } })
        }, (err) => {
          this.setState({ matchdata: { error: err } })
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