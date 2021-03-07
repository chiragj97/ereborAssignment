import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
    };
  }
  componentDidMount() {
    console.log('pr', localStorage.getItem('Profile'));
    if (localStorage.getItem('Profile')) {
      this.setState({
        user: JSON.parse(localStorage.getItem('Profile')),
      });
    } else {
      axios.get('http://localhost:5000/user').then((response) =>
        this.setState({
          user: response.data,
        })
      );
    }
  }

  logout = () => {
    if (localStorage.getItem('Profile')) {
      localStorage.removeItem('Profile');
    }
    window.location = 'http://localhost:3000/signup';
  };

  render() {
    console.log(this.state.user);
    return (
      <div className="container">
        {this.state.user && this.state.user._json ? (
          <div>
            <h2>{this.state.user.provider.toUpperCase()}</h2>
            <img src={this.state.user._json.picture} alt="Profile" />
            <p>{this.state.user._json.name}</p>
            <p>{this.state.user._json.email}</p>
          </div>
        ) : (
          <div>
            <h2>EMAIL SIGNUP</h2>
            <p>{this.state.user.name}</p>
            <p>{this.state.user.email}</p>
          </div>
        )}

        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Profile;
