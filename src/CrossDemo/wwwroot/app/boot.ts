import {bootstrap}          from 'angular2/platform/browser';
import {ROUTER_PROVIDERS}   from 'angular2/router';
import {HTTP_PROVIDERS}     from 'angular2/http';

import {AppComponent}       from './components/app.component';
import {SidebarService}     from './components/services/SidebarService';

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, SidebarService])
    .then(
        success => console.log('App Bootstrapped!'),
        error => console.log(error));