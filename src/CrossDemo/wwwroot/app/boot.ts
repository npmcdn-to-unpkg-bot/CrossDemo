import {bootstrap}        from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {AppComponent}     from './components/app.component';

bootstrap(AppComponent, [ROUTER_PROVIDERS])
    .then(
        success => console.log('App Bootstrapped!'),
        error => console.log(error));