import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './../main';
import { App } from './app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
