// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB9xhYU76SNZIZ3E2Nt0zZhJfESLpTJcPg",
    authDomain: "filosofia-libros.firebaseapp.com",
    databaseURL: "https://filosofia-libros.firebaseio.com",
    projectId: "filosofia-libros",
    storageBucket: "filosofia-libros.appspot.com",
    messagingSenderId: "696408735228"
  },
  firestoreSetting: {
  	timestampsInSnapshots: true
  }
};
