import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { enableProdMode } from '@angular/core';
declare const ENV;

if (ENV.PRODUCTION) { enableProdMode(); }

platformBrowserDynamic().bootstrapModule(AppModule);
