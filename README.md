# Create a new Ionic App with Unit Testing and Environment Variables

## 1. The basics

### 1.1 Install Node 7.9.0
https://nodejs.org/download/release/v7.9.0/

### 1.2 Install Npm 4.2.0, Cordova 6.5.0 and Ionic CLI 2.2.3
`sudo npm install -g npm@4.2.0 cordova@6.5.0 ionic@2.2.3`

### 1.3 Create the project with Ionic 3.1.1
`git clone https://github.com/driftyco/ionic2-app-base ./my-app`

`cd ./my-app && git reset --hard c252ef8e2e`

`git clone https://github.com/driftyco/ionic2-starter-blank ./tmp`

`cd ./tmp && git reset --hard d85ded4 && cd ../`

`cp -r ./tmp/* ./ && rm -rf ./tmp`

## 2. Set up Unit Testing

### 2.1 Append this to "devDependencies" inside your package.json :
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

### 2.2 Add Unit Testing conf files (this will add two directory "e2e" and "test-config")
`git clone https://github.com/driftyco/ionic-unit-testing-example.git ./tmp`

`cd ./tmp && git reset --hard f7d45bc && cd ../`

`cp -r ./tmp/{e2e,test-config} ./ && rm -rf ./tmp`

### 2.3 Append this to "scripts" inside your package.json :
```json
"test": "karma start ./test-config/karma.conf.js",
"test-ci": "karma start ./test-config/karma.conf.js --single-run",
"e2e": "webdriver-manager update --standalone false --gecko false; protractor ./test-config/protractor.conf.js"
```

## 3. Set up Environment Variables

### 3.1 Add conf file and Environments Variables json files

`git clone https://github.com/RomainFallet/ionic-start-guide ./tmp`

`cp -r ./tmp/{env,webpack.envars.js} ./ && rm -rf ./tmp`
