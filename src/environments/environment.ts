// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  source: 'https://raw.githubusercontent.com/seade-R/dados-covid-sp/master/data/dados_covid_sp.csv',
  firebase: {
    apiKey: 'AIzaSyD0FbakpUB_TZABnAQh3UAXNXW8RQv8VqM',
    authDomain: 'covid-sp.firebaseapp.com',
    databaseURL: 'https://covid-sp.firebaseio.com',
    projectId: 'covid-sp',
    storageBucket: 'covid-sp.appspot.com',
    messagingSenderId: '666891959353',
    appId: "1:666891959353:web:3d8da7f6817ee8189561e8",
    measurementId: "G-LNTP3RB5HX"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
