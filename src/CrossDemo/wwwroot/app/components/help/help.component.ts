import {Component}                     from 'angular2/core';
import {RouteConfig, RouterOutlet}     from 'angular2/router';

import {HelpListComponent}             from './help-list.component';

@Component({
    templateUrl: '/views/Help/',
    directives: [RouterOutlet]
})
@RouteConfig([
        { path: '/', name: 'Help', component: HelpListComponent, useAsDefault: true }
    
])
export class HelpComponent { }