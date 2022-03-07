import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams, } from 'react-router-dom';

export default function Search() {
  let navigate = useNavigate();
  return (
    <main>
      <div className='HeaderBox'></div>
      <div className="SearchBoxContainer">
        <SearchBox navigate={navigate} params={useParams()} />
      </div>
      <Outlet />
    </main>
  );
}

function SearchBox(props) {
  const [summonerName, setSummonerName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(e) {
    e.preventDefault();

    if (!isLoading && summonerName != '') {
      setIsLoading(true);
      props.navigate('/search/' + summonerName);
      setIsLoading(false);
    }
  }

  function onChange(e) {
    setSummonerName(e.target.value);
  }

  useEffect(() => {
    setSummonerName(props.params.name);
  }, [props.params.name])

  return (
    <form onSubmit={onSubmit}>
      <input type='text' value={summonerName} onChange={onChange} placeholder="소환사명" />
      <button style={{
        opacity: isLoading ? 0.3 : 1
      }}>검색</button>
    </form>
  );
}

/*
class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.params.name || '', isLoading: false };
    this.navigate = props.navigate;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.isLoading) {
      if (this.state.value == "") {
        return;
      }
      this.setState({
        isLoading: true,
      });

      this.navigate('/search/' + this.state.value);

      this.setState({
        isLoading: false,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.params !== prevProps.params) {
      this.setState({
        value: this.props.params.name
      })
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' value={this.state.value} onChange={this.handleChange} placeholder="소환사명" />
        <button style={{
          opacity: this.state.isLoading ? 0.3 : 1
        }}>검색</button>
      </form>
    );
  }
}
*/