import {Component}                          from 'angular2/core';
import {RouteConfig, RouterOutlet}          from 'angular2/router';

import {ChassisListComponent}            from './chassis-list.component';
import {ChassisDetailComponent}          from './chassis-detail.component';

@Component({
    templateUrl: '/views/chassis/',
    directives: [RouterOutlet]
})
    @RouteConfig([
        { path: '/', name: 'Instruments', component: ChassisListComponent, useAsDefault: true },
        { path: '/:id', name: 'InstrumentDetail', component: ChassisDetailComponent }
    ])
export class ChassisComponent { }