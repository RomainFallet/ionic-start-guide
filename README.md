# Create a new Ionic App with Unit Testing and Environment Variables

## The basics

### Install Node 7.9.0
https://nodejs.org/download/release/v7.9.0/

### Install Npm 4.2.0, Cordova 6.5.0 and Ionic CLI 2.2.3
sudo npm install -g npm@4.2.0 cordova@6.5.0 ionic@2.2.3

### Create the project with Ionic 3.1.1
git clone https://github.com/driftyco/ionic2-app-base ./my-app

cd ./my-app && git reset --hard c252ef8e2e

git clone https://github.com/driftyco/ionic2-starter-blank ./tmp

cd ./tmp && git reset --hard d85ded4 && cd ../

cp -r ./tmp/* ./ && rm -rf ./tmp

## Set up Unit Testing

### Add this to "devDependencies" inside your package.json :
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

### Install your dependencies
npm install
