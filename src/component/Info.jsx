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

  async refresh(){
    let userdata;
    let matchdata;
    try{
      userdata = await Api.getSummonerData(this.props.params.name);
      this.setState({ userdata: { data: userdata } });
      matchdata = await Api.getMatchesBySummoner(this.props.params.name);
      this.setState({ matchdata: { data: matchdata } });
    }catch(e){
      if(!matchdata){
        this.setState({ matchdata: { error: e } });
      }
      if(!userdata){
        this.setState({ userdata: { error: e.message }});
      }
    }
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