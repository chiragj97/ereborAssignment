import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      serverResponse: '',
    };
  }

  onInputChange = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post('http://localhost:5000/user/login', submitData)
      .then((response) => {
        if (response.data.user) {
          console.log(response.data.user);
          localStorage.setItem('Profile', JSON.stringify(response.data.user));
          this.props.history.push('/profile');
        } else {
          this.setState({
            serverResponse: response.data,
          });
        }
      });
  };
  render() {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <h1>Login</h1>
          {this.state.serverResponse !== '' && (
            <h4>{this.state.serverResponse}</h4>
          )}
          <input
            placeholder="Email"
            className="border rounded p-2"
            type="text"
            value={this.state.email}
            onChange={this.onInputChange}
            name="email"
            required
          />
          <br />
          <input
            placeholder="Password"
            className="border rounded p-2"
            type="password"
            value={this.state.password}
            onChange={this.onInputChange}
            name="password"
            required
          />
          <br /> <br />
          <div className="text-center">
            <input
              type="Submit"
              style={{ width: '24%' }}
              className="btn btn-block btn-success"
              onClick={this.onSubmit}
            />
          </div>
        </div>
        <br />
        <p className="text-center">or</p>

        <hr />
        <div className="text-center">
          <a
            href="http://localhost:5000/auth/google/login"
            className="btn btn-danger"
          >
            LOGIN USING GOOGLE
          </a>
        </div>
        <br />
        <div className="text-center">
          <a
            href="http://localhost:5000/auth/facebook/login"
            className="btn btn-primary"
          >
            LOGIN USING FACEBOOK
          </a>
        </div>
      </div>
    );
  }
}

export default Login;
