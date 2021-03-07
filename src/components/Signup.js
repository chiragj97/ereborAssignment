import React, { Component } from 'react';
import axios from 'axios';

function ValidationMessage(props) {
  if (!props.valid) {
    return (
      <div
        style={{ color: 'red', fontSize: '10px', marginBottom: '20px' }}
        className="error-msg m-0 p-0"
      >
        {props.message}
      </div>
    );
  }
  return null;
}

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      nameValid: false,
      emailValid: false,
      passwordValid: false,
      repeatPasswordValid: false,
      formValid: false,
      errorMsg: {},
      serverResponse: '',
    };
  }
  validateForm = () => {
    const {
      nameValid,
      emailValid,
      passwordValid,
      repeatPasswordValid,
    } = this.state;
    this.setState({
      formValid:
        nameValid && emailValid && passwordValid && repeatPasswordValid,
    });
  };

  updateName = (name) => {
    this.setState({ name }, this.validateName);
  };
  validateName = () => {
    const { name } = this.state;
    let nameValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (name.length < 3) {
      nameValid = false;
      errorMsg.name = 'Must be at least 3 characters long';
    } else if (!/^[a-zA-Z]+$/.test(name)) {
      nameValid = false;
      errorMsg.name = 'Must be alphabets';
    }
    this.setState({ nameValid, errorMsg }, this.validateForm);
  };

  updateEmail = (email) => {
    this.setState({ email }, this.validateEmail);
  };

  validateEmail = () => {
    const { email } = this.state;
    let emailValid = true;
    let errorMsg = { ...this.state.errorMsg };

    // checks for format _@_._
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailValid = false;
      errorMsg.email = 'Invalid email format';
    }

    this.setState({ emailValid, errorMsg }, this.validateForm);
  };

  updatePassword = (password) => {
    this.setState({ password }, this.validatePassword);
  };

  validatePassword = () => {
    const { password } = this.state;
    let passwordValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (password.length < 8) {
      passwordValid = false;
      errorMsg.password = 'Password must be at least 8 characters long';
    } else if (!/\d/.test(password)) {
      passwordValid = false;
      errorMsg.password = 'Password must contain a digit';
    } else if (!/[!@#$%^&*]/.test(password)) {
      passwordValid = false;
      errorMsg.password = 'Password must contain a symbol: !@#$%^&*';
    } else if (!/.*[A-Z].*/.test(password)) {
      passwordValid = false;
      errorMsg.password = 'Password must contain an Uppercase letter: A-Z';
    }

    this.setState({ passwordValid, errorMsg }, this.validateForm);
  };

  updateRepeatPassword = (repeatPassword) => {
    this.setState({ repeatPassword }, this.validateRepeatPassword);
  };

  validateRepeatPassword = () => {
    const { repeatPassword, password } = this.state;
    let repeatPasswordValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (password !== repeatPassword) {
      repeatPasswordValid = false;
      errorMsg.repeatPassword = 'Passwords do not match';
    }

    this.setState({ repeatPasswordValid, errorMsg }, this.validateForm);
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post('http://localhost:5000/user/register', formData)
      .then((response) =>
        this.setState({
          serverResponse: response.data,
        })
      );
  };

  render() {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <h1>Signup</h1>
          {this.state.serverResponse !== '' && (
            <h3>{this.state.serverResponse}</h3>
          )}
          <input
            placeholder="Name"
            type="text"
            className="border rounded p-2"
            value={this.state.name}
            onChange={(e) => this.updateName(e.target.value)}
            name="name"
            required
          />
          <ValidationMessage
            valid={this.state.nameValid}
            message={this.state.errorMsg.name}
          />
          {/* </div> */}

          {/* <div> */}
          <input
            placeholder="Email"
            className="border rounded p-2"
            type="text"
            value={this.state.email}
            onChange={(e) => this.updateEmail(e.target.value)}
            name="email"
            required
          />
          <ValidationMessage
            valid={this.state.emailValid}
            message={this.state.errorMsg.email}
          />
          {/* </div> */}
          {/* <div> */}
          <input
            placeholder="Password"
            className="border rounded p-2"
            type="password"
            value={this.state.password}
            onChange={(e) => this.updatePassword(e.target.value)}
            name="password"
            required
          />
          <ValidationMessage
            valid={this.state.passwordValid}
            message={this.state.errorMsg.password}
          />
          {/* </div> */}
          {/* <div> */}
          <input
            placeholder="Repeat Password"
            type="password"
            className="border rounded p-2"
            value={this.state.repeatPassword}
            onChange={(e) => this.updateRepeatPassword(e.target.value)}
            name="repeatPassword"
            required
          />
          <ValidationMessage
            valid={this.state.repeatPasswordValid}
            message={this.state.errorMsg.repeatPassword}
          />
          <br />
          <div className="text-center">
            <input
              type="Submit"
              onClick={this.onFormSubmit}
              style={{ width: '24%' }}
              className="btn btn-block btn-success"
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

export default Signup;
