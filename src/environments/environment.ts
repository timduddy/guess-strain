// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDpJvsetu51KlTYv-AwcLie0_FqXjdL7s8',
    authDomain: 'dakine-strain-card-game.firebaseapp.com',
    databaseURL: 'https://dakine-strain-card-game.firebaseio.com',
    projectId: 'dakine-strain-card-game',
    storageBucket: 'dakine-strain-card-game.appspot.com',
    messagingSenderId: '346345508911'
  }
};
