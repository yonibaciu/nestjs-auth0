# nestjs-auth0

Based on the tutorial https://auth0.com/blog/developing-a-secure-api-with-nestjs-models-data-service/

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
