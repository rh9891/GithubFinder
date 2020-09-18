import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  state = {
    text: "",
  };

  static propTypes = {
      searchUsers: PropTypes.func.isRequired,
      clearUsers: PropTypes.func.isRequired
  }; 

  onSubmit = event => {
      event.preventDefault();
      this.props.searchUsers(this.state.text);
      this.setState({ text: "" });
  };

  onChange = event => this.setState({ [event.target.name]: event.target.value });

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form"> 
          <input 
            type="text" 
            name="text" 
            placeholder="Search Users"
            value={this.state.text}
            onChange={this.onChange} />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        <button className="btn btn-light btn-block" onClick={this.props.clearUsers}>Clear</button>
      </div>
    );
  }
}

export default Search;
