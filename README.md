# nestjs-auth0

Based on the tutorial https://auth0.com/blog/developing-a-secure-api-with-nestjs-models-data-service/

## Auth0 dashboard

Create an API and set the Identifier to `https://menu-api.demo.com` (will be used as the audience setting)
Create an app and set Allowed Callbacks URL, Allowed Logout URLs and Allowed Web Origins to http://localhost:5173 (the vite app)

## Nest service .env file

```
PORT=<choose a port>
AUTH0_AUDIENCE='https://menu-api.demo.com'
AUTH0_ISSUER_URL='https://<tenant id>.us.auth0.com/'
```

## Vite client app .env file

```
VITE_AUTH0_DOMAIN=<tenant id>.us.auth0.com
VITE_AUTH0_CLIENT_ID=<client id of auth0 app>
VITE_AUTH0_AUDIENCE=https://menu-api.demo.com
VITE_API_URL=http://localhost:<port selected for Nest service>
```

## run the Nest service

```
cd nestjs-service
npm run start:dev
```

## run the vite client app

```
cd vite-app
npm run dev
```

## Rules are obsolete

The blog post mentions the need to add a rule in order to handle authorization. Rules in Auth0 are replaced with Actions.

The following Login/Post Login action needs to be created instead:

```
exports.onExecutePostLogin = async (event, api) => {
  const namespace = 'https://menu-api.demo.com';
  if (event.authorization) {
    api.idToken.setCustomClaim(`${namespace}/roles`, event.authorization.roles);
    api.accessToken.setCustomClaim(`${namespace}/roles`, event.authorization.roles);
  }
}
```
