# Create a ful and powerfull worflow with Ionic 3

## (03 May 2017)
## Features : Unit Testing, Environment variables, Automatic documentation

Many code chunks and tutorials are available on the web to configure a Ionic workflow that includes Unit Testing and Environment Variables, but most of it are obsolete or depends on specific dependencies, version or configuration that is hard to maintain through time.

There is also tons of starters git repositories but nobody explain how to build their solution from scratch, so that people can understand and implement it in an existing project.

That's why I make this repository. You will find here a step by step guide, where nearly all implementations are versions specific and based on Ionic official repositories, so that this guide will still be consistent 3 months later and can easily be updated with Ionic updates.

====================================================================================
## Quickstart
You'll find next a step by step guide, but if you want to make this quick, you can simply clone this repository. It contains the exact code that will be created by following the guide.

`git clone https://github.com/RomainFallet/ionic-start-guide/`

====================================================================================

## 1. The basics
I'm specifying Git, Node, Npm, Cordova and Ionic-CLI version in case a new version of these packages would break something or add an error/warning in the future. This will ensure that you'll follow this guide in the exact same conditions, but it may work with different versions of these.

### 1.1 Install Node 7.9.0 and Git 2.12.2
https://nodejs.org/download/release/v7.9.0/

https://git-scm.com/downloads

### 1.2 Install Npm 4.2.0, Cordova 6.5.0 and Ionic CLI 2.2.3
`sudo npm install -g npm@4.2.0 cordova@6.5.0 ionic@2.2.3`

### 1.3 Create the project with Ionic 3.1.1 (replace "my-app" by the name you want for your project)
`git clone https://github.com/driftyco/ionic2-app-base ./my-app`

`cd ./my-app && git reset --hard c252ef8e2e`

`git clone https://github.com/driftyco/ionic2-starter-blank ./tmp`

`cd ./tmp && git reset --hard d85ded4 && cd ../`

`cp -r ./tmp/* ./ && rm -rf ./tmp`

## 2. Set up Unit Testing

### 2.1 Append this to "devDependencies" inside your package.json
```json
"@ionic/cli-build-ionic-angular": "0.0.3",
"@ionic/cli-plugin-cordova": "0.0.9",
"@types/jasmine": "2.5.41",
"@types/node": "7.0.8",
"angular2-template-loader": "0.6.2",
"html-loader": "0.4.5",
"jasmine": "2.5.3",
"jasmine-spec-reporter": "3.2.0",
"karma": "1.5.0",
"karma-chrome-launcher": "2.0.0",
"karma-jasmine": "1.1.0",
"karma-jasmine-html-reporter": "0.2.2",
"karma-sourcemap-loader": "0.3.7",
"karma-webpack": "2.0.3",
"null-loader": "0.1.1",
"protractor": "5.1.1",
"ts-loader": "2.0.3",
"ts-node": "3.0.2"
```

### 2.2 Add Unit Testing conf files (this will add two directory "e2e" and "test-config" in your root folder)
`git clone https://github.com/driftyco/ionic-unit-testing-example.git ./tmp`

`cd ./tmp && git reset --hard f7d45bc && cd ../`

`cp -r ./tmp/{e2e,test-config} ./ && rm -rf ./tmp`

### 2.3 Append this to "scripts" inside your "package.json"
```json
"test": "karma start ./test-config/karma.conf.js",
"test-ci": "karma start ./test-config/karma.conf.js --single-run",
"e2e": "webdriver-manager update --standalone false --gecko false; protractor ./test-config/protractor.conf.js"
```

### 2.4 Install dependencies
`npm install`

### 2.5 Let's add your first test. Create a new file "src/app.component.spec.ts" and add the following
```javascript
import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { PlatformMock } from '../../test-config/mocks-ionic';

describe('MyApp Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        StatusBar,
        SplashScreen,
        { provide: Platform, useClass: PlatformMock }
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
  });

  it ('should be created', () => {
    expect(component instanceof MyApp).toBe(true);
  });

});
```

### 2.6 Run the tests
You can run Unit Tests with :

`npm run test`

![ionic-unit-testing-success](https://cloud.githubusercontent.com/assets/6952638/25657421/1ae06c90-2ffe-11e7-89f8-e2d50e1e4133.png)

If you need a single run execution, use :

`npm run test-ci`

To run end to end test (e2e), use :

`ionic serve`

then :

`npm run e2e`

## 3. Set up Environment Variables

### 3.1 Add conf file and Environments Variables json files

`git clone https://github.com/RomainFallet/ionic-start-guide ./tmp`

`cp -r ./tmp/{env,webpack.envars.js} ./ && rm -rf ./tmp`

### 3.2 Add this inside your "package.json". This will add your environment variables when you'll use Ionic commands to build or serve your app.

```json
"config": {
  "ionic_webpack": "./webpack.envars.js"
}
```

### 3.3 Add this inside your "test-config/karma.conf" to make your environment variables available during your tests.

```javascript
var envarsConfig = require('../webpack.envars.js');
```
### 3.4 To use your ENV global variable, declare it on every file you need it with

```javascript
declare const ENV: any;
```

### 3.5 For example, you can use it that way in your "src/app.component.ts" file (you can add more variables inside your "env/prod.json" and "env/dev.json" files)

```javascript
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

declare const ENV: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
    console.log('isProduction : ' + ENV.PRODUCTION);
  }
}
```

If your serve your app now :

`ionic serve`

You'll see in your browser console :

![ionic-envars-serve](https://cloud.githubusercontent.com/assets/6952638/25657714/89a3c84c-2fff-11e7-9c01-d8ea6eb3813e.png)

### 3.6 Enable programmatically the Angular production mode by adding this to your "src/app/main.ts"

```javascript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { enableProdMode } from '@angular/core';
declare const ENV;

if (ENV.PRODUCTION) { enableProdMode(); }

platformBrowserDynamic().bootstrapModule(AppModule);
```

Then use this to build your app in production :

`ionic build --prod`

This will create static assets of your app inside your "www" directory. Open your "www/index.html" in your browser and you'll see :

![ionic-envars-prod](https://cloud.githubusercontent.com/assets/6952638/25657788/e4c4906c-2fff-11e7-8c24-a9868e463e01.png)

We have a cordova error but that's OK because we are running our app in browser. Now we see that our app is using our production environment variables and that the angular "enableProdMode" warning is gone.

Our app is fully in production mode !
