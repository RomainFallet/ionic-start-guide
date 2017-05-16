![ionic-workflow](https://cloud.githubusercontent.com/assets/6952638/25675179/d46a4700-303d-11e7-8df9-b4d8f0e89741.png)

# Create a full and powerful worflow with Ionic

## (16 May 2017, Ionic 3.2.1)
## Features : Unit Testing, Environment variables, Automatic documentation, Production App Server, Automatic deployment, Dependencies version check

Many code chunks and tutorials are available on the web to configure a Ionic workflow that includes features such as Unit Testing, Environment Variables and others, but most of it are obsolete or depends on specific dependencies, version or configuration that is hard to put together or maintain through time and Ionic core evolution.

There is also tons of starters git repositories but nobody explain how to build their solution from scratch, so that people can understand and implement it in an existing project.

That's why I make this repository. You will find here a step by step guide, where nearly all implementations are versions specific and based on Ionic official repositories, so that this guide will still be consistent 3 months later and can easily be updated with Ionic updates.

====================================================================================
## Quickstart
You'll find next a step by step guide, but if you want to make this quick, you can simply clone this repository. It contains the exact code that will be created by following the guide.

`git clone https://github.com/RomainFallet/ionic-workflow-guide/`

====================================================================================

## 1. The basics
I'm specifying Git, Node, Npm, Cordova and Ionic-CLI version in case a new version of these packages would break something or add an error/warning in the future. This will ensure that you'll follow this guide in the exact same conditions, but it may work with different versions of these.

### 1.1 Install Node 7.10.0 and Git 2.13.0
https://nodejs.org/download/release/v7.10.0/

https://git-scm.com/downloads

### 1.2 Install Npm 4.6.1, Cordova 7.0.1 and Ionic CLI 3.0.0
`sudo npm install -g npm@4.6.1 cordova@7.0.1 ionic@3.0.0`

### 1.3 Create the project with Ionic 3.2.1 (replace "my-app" by the name you want for your folder)
`git clone https://github.com/driftyco/ionic2-app-base ./my-app`

`cd ./my-app && git reset --hard 49e70da`

### 1.4 Create the file 'src/app/app.module.ts' with this

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(AppComponent)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        AppComponent
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
```

### 1.5 Create the file 'src/app/app.component.ts' with this

```javascript
import { Component } from '@angular/core';

@Component({
    templateUrl: 'app.component.html'
})
export class AppComponent {
    rootPage: any;
    
    constructor() {
    }
}
```

### 1.6 Create the file 'src/app/app.component.html' with this

```html
<ion-nav [root]="rootPage"></ion-nav>
```

### 1.7 Append this to "devDependencies" inside your package.json

```json
"@ionic/cli-plugin-cordova": "1.0.0",
"@ionic/cli-plugin-ionic-angular": "1.0.0"
```

## 2. Set up Unit Testing

### 2.1 Append this to "devDependencies" inside your package.json
```json
"@types/jasmine": "2.5.41",
"@types/node": "7.0.8",
"angular2-template-loader": "0.6.2",
"html-loader": "0.4.5",
"jasmine": "2.5.3",
"jasmine-spec-reporter": "4.1.0",
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

### 2.2 Add Unit Testing conf files (this will add two directories "e2e" and "test-config" in your root folder)
`git clone https://github.com/driftyco/ionic-unit-testing-example.git ./tmp`

`cd ./tmp && git reset --hard 7b1f2a6 && cd ../`

`cp -r ./tmp/test-config ./`

`mkdir e2e && cp -r ./tmp/e2e/tsconfig.json ./e2e && rm -rf ./tmp`

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
import { IonicModule } from 'ionic-angular';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent ],
            imports: [
                IonicModule.forRoot(AppComponent)
            ],
            providers: [
            ]
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it ('should create a valid instance of AppComponent', () => {
        expect(component instanceof AppComponent).toBe(true);
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

`git clone https://github.com/RomainFallet/ionic-workflow-guide ./tmp`

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

declare const ENV: any;

@Component({
    templateUrl: 'app.component.html'
})
export class AppComponent {
    rootPage: any;
    
    constructor() {
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

### 3.7 Append this to "scripts" inside your "package.json"

```json
"build": "ionic-app-scripts build --prod"
```
### 3.8 Then use this to build your app in production :

`npm run build`

This will create static assets of your app inside your "www" directory. Open your "www/index.html" in your browser and you'll see :

![ionic-envars-prod](https://cloud.githubusercontent.com/assets/6952638/25657788/e4c4906c-2fff-11e7-8c24-a9868e463e01.png)

We have a cordova error but that's OK because we are running our app in browser. Now we see that our app is using our production environment variables and that the angular "enableProdMode" warning is gone.

Our app is fully in production mode !

## 4. Set up automatic documentation with compodoc

### 4.1 Append this to "devDependencies" inside your "package.json"

```json
"@compodoc/compodoc": "1.0.0-beta.9"
```

### 4.2 Install Compodoc

`npm install`

### 4.3 Append this to "scripts" inside your "package.json"

```json
"compodoc": "./node_modules/.bin/compodoc -d ./docs/ -p ./tsconfig.json"
```

### 4.4 Generate the docs (docs will be available inside your "docs" folder)

`npm run compodoc`

Then, open "docs/index.html" in your browser to see your docs.

### 4.5 Publish docs on Github pages

If you're using Github for your app source control. You can simply publish your docs to Github pages. Go to your project settings and set your page source to your "docs" folder.

![ionic-github-publish-docs](https://cloud.githubusercontent.com/assets/6952638/25664216/3f851e9e-301a-11e7-9a59-cd529fc2c44d.png)

I made it for this repo, you can view it here :
https://romainfallet.github.io/ionic-workflow-guide/

### 4.6 Automatically generate docs on push

What you don't want with your docs is that the published version on Github pages does not match the last changes you made. To automatically update your docs when you push somes changes, append this to "scripts" inside your "package.json" :

```json
"git-push": "npm run compodoc && git add ./docs && git commit -m 'Update docs' && git push -u origin master"
```

Then, use `npm run git-push` instead of `git push` to publish your commits. That way, you are sure that your last commits are fully and automatically documented.

## 5. Set up our Production App Server

We saw in the Environment Variables set up that we can build our app in production mode with :

`npm run build`

That packages our production ready app inside the "www" folder. Now we want to serve it.

### 5.1 Append this to "dependencies" inside your "package.json"

```json
"express": "4.15.2",
"compression": "1.6.2"
```

### 5.2 Install the server dependencies

`npm install`

### 5.3 Create a new "server.js" file in your project root folder and add this to it 

```javascript
const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const ENV = require(path.join(__dirname + '/env/' + (process.env.NODE_ENV ? process.env.NODE_ENV : 'dev') + '.json'));
const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
  }
}

// We force HTTPS and GZIP compression on production
if (ENV.PRODUCTION) {
    app.use(forceSSL());
    app.use(compression());
}

app.use(express.static(__dirname + '/www'));

// We redirect all GET requests to our 'index.html' to let Ionic handle the rooting
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/www/index.html'));
});

app.listen(port, function() {
  console.log('Listening on port ' + port + '. isProduction : ' + ENV.PRODUCTION);
});
```

### 5.4 Then, append this to "scripts" inside our "package.json"

```json
"start": "NODE_ENV=prod node ./server.js"
```

### 5.5 Our production app server can now be started with this command

`npm run start`

![ionic-production-app-server](https://cloud.githubusercontent.com/assets/6952638/25668300/a09c1ec4-3026-11e7-85ce-4a775ac66872.png)

## 6. Automatic deployment on Heroku

Now that we have a production ready server. We need to deploy it somewhere in the web !

### 6.1 Create a free account on Heroku

https://www.heroku.com/

### 6.2 Create a new app

![ionc-heroku-create-app](https://cloud.githubusercontent.com/assets/6952638/25668884/3b90b2c2-3028-11e7-8596-d14a56634b24.png)

### 6.3 Link your app with your Github account

![ionic-heroku-deploy](https://cloud.githubusercontent.com/assets/6952638/25668887/3e98c392-3028-11e7-9b24-6ce0985874f0.png)

### 6.4 Enable automatic deploy

![ionic-heroku-automatic-deploy](https://cloud.githubusercontent.com/assets/6952638/25669407/b55ea59a-3029-11e7-92c3-587c1002da1f.png)

### 6.5 Move "typescript", "@ionic/app-scripts" and "@ionic/cli-build-ionic-angular" from "devDependencies" to "dependencies" inside your "package.json"

```json
  "dependencies": {
    "@ionic/app-scripts": "1.3.7",
    "typescript": "~2.2.1",
    "@types/jasmine": "2.5.41",
```

This will make Heroku able to build our app.

### 6.6 Append this to "scripts" inside your "package.json"

```json
"heroku-postbuild": "npm run build"
```

With this, Heroku will build our app in production mode as soon as our dependencies will be installed. We use "ionic-app-scripts" (which is now packaged in our dependencies) instead of "ionic" because the Ionic CLI is only installed on our computer locally.

### 6.7 Add this inside your "package.json"

This will make Heroku use the same environment in which we develop our app.

```json
"engines": {
  "node": "7.9.0",
  "npm": "4.2.0"
}
```

### 6.8 Deploy to Heroku

To deploy, you just have to commit some changes. The automatic deploy will do the rest.

`git add . && git commit -m 'Add Heroku deployment' && npm run git-push`

I made it for this repo, you can view it here :

https://ionic-workflow-guide.herokuapp.com/

## 7. Set up dependencies version check with npm-check

### 7.1 Append this to "devDependencies" inside your "package.json"

```json
"npm-check": "5.4.4"
```

### 7.2 Install npm-check

`npm install`

### 7.3 Append this to "scripts" inside your "package.json"

```json
"check": "node ./node_modules/npm-check/bin/cli.js -u"
```

### 4.4 Check your dependencies version and update it if necessary

`npm run check`
