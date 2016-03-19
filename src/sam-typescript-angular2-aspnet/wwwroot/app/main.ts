import { /* enableProdMode,*/ provide } from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {RocketComponent} from './rocket/rocket.component';

bootstrap(RocketComponent)
    .catch((error: Error) => console.error(error));