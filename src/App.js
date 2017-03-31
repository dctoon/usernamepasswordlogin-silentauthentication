import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { WebAuth } from 'auth0-js';

class App extends Component {
  constructor(props) {
    super(props);

    this.origin =
      `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;

    this.webAuth = new WebAuth({
      domain: window.config.AUTH0_DOMAIN,
      clientID: window.config.AUTH0_CLIENT_ID
    });

    this.state = {
      showLogin: false,
      error: null,
      result: null
    };

    this.webAuth.parseHash(window.location.hash, (err, authResult) => {
      if (err) {
        return this.setState({
          error: err
        });
      }

      if (authResult) {
        return this.webAuth.renewAuth({
          usePostMessage: true,
          responseType: 'token id_token',
          scope: 'openid name email read:locations',
          audience: 'urn:worldmappers',
          redirectUri: `${this.origin}/callback.html`
        }, (renewError, renewAuthResult) => {
          this.setState({
            error: renewError,
            result: renewAuthResult
          });
        });
      }
    });
  }

  login = () => {
    this.webAuth.redirect.loginWithCredentials({
      redirectUri: `${this.origin}`,
      connection: 'Username-Password-Authentication',
      username: this.emailField.value,
      password: this.passwordField.value,
      scope: 'openid',
      responseType: 'token'
    }, (err) => {
      this.setState({
        error: err
      });
    });
  }

  render() {
    const { error, result } = this.state;
    const loginComplete = error || result;
    return (
      <div>
        {
          error &&
            <div className="alert alert-danger" role="alert">
              <strong>Error!</strong> {error && (error.message || error.description)}
            </div>
        }

        <div className="row" style={{ marginBottom: '10px' }}>
          <div className="col-xs-3">
            <input
              type="email" className="form-control" placeholder="Email" autoFocus
              ref={(i) => { this.emailField = i; }}
              value="johnfoo@gmail.com"
            />
          </div>
        </div>
        <div className="row" style={{ marginBottom: '10px' }}>
          <div className="col-xs-3">
            <input
              type="password" className="form-control" placeholder="Password"
              ref={(i) => { this.passwordField = i; }}
              value="1234"
            />
          </div>
        </div>
        <div className="row" style={{ marginBottom: '10px' }}>
          <div className="col-xs-12">
            <button id="login" className="btn btn-primary" onClick={this.login}>Login</button>
          </div>
        </div>

        {
          loginComplete &&
            <pre id="auth-result">
              <code>{JSON.stringify(error || result, null, 2)}</code>
            </pre>
        }
      </div>
    );
  }
}

export default App;
