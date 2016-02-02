import {Component}                          from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES}     from 'angular2/router';

import {InstrumentsComponent}               from './instrument/instruments.component';
import {ChassisComponent}                   from './chassis/chassis.component';
import {SettingsComponent}                  from './setting/settings.component';



@Component({
    selector: 'app',
    templateUrl: '/views/home/',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
        { path: '/instruments/...', name: 'Instruments',    component: InstrumentsComponent, useAsDefault: true },
        { path: '/chassies/...',    name: 'Chassises',      component: ChassisComponent },
        { path: '/settings/...',    name: 'Settings',       component: SettingsComponent },
        { path: '/**', redirectTo: ['Instruments'] }
])
export class AppComponent {
    ShowFullBar: boolean = true;

    toggleSidebar() {
        console.log("Toggle side bar");
        this.ShowFullBar = !this.ShowFullBar;
    }
}