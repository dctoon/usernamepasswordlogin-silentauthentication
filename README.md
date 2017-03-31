# React `usernamepassword/login` + Silent Authentication


## How it works


1. A call to the endpoint is made `https://{tenantname}.auth0.com/usernamepassword/login`, passing the username and password, resulting in a callback with an `id_token`. Due to the nature of this call an SSO sessions is create in Auth0.
2. A silent Authentication call is executed inside an iFrame, the request includes an `audience` and optionally additional `scopes`. Due to the existing SSO session in Auth0, Auth0 is able to return an `access_token`.

## How to run

### Update settings

- Update in the file `public/index.html` the configuration values `window.config.AUTH0_DOMAIN` and `window.config.AUTH0_CLIENT_ID`.
- Update in the file `public/callback.html` the configuration values `domain` and `clientID`.
- In the file `src/App.js` update the configuration values `audience` and `scopes` for the method `this.webAuth.renewAuth`
- Optionally update the `connection` configuration value for the method `loginWithCredentials`.

### Update Auth0 Client settings

- Add following routes to the allowed callbacks `http://myapp.local:3000` and `http://myapp.local:3000/callback.html`;

### Run

```bash
npm install
npm run start
```

note: running the sample from the localhost domain will cause the silent authentication call to ask for consent, to avoid this you can add a entry like `myapp.local` to your host file and use that url to run the sample.

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free Auth0 Account

1. Go to [Auth0](https://auth0.com) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
