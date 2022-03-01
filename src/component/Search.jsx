import React from 'react';
import { Outlet, useNavigate, useParams, } from 'react-router-dom';

export default function Search() {
  let navigate = useNavigate();
  return (
    <main>
      <div className="SearchBoxContainer">
        <SearchBox navigate={navigate} params={useParams()} />
      </div>
      <Outlet />
    </main>
  );
}

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.params.name || '' };
    this.navigate = props.navigate;
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.navigate('/search/' + this.state.value);
  }

  componentDidUpdate(prevProps) {
    if (this.props.params !== prevProps.params) {
      this.setState({
        value: this.props.params.name
      })
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Search:
          <input type='text' value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type='submit' value='submit' />
      </form>
    );
  }
}