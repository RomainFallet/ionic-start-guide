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
