import {Component}                          from 'angular2/core';
import {RouteConfig, RouterOutlet}     from 'angular2/router';

import {SettingsListComponent}            from './settings-list.component';
import {SettingDetailComponent}          from './setting-detail.component';

@Component({
    templateUrl: '/views/Settings/',
    directives: [RouterOutlet]
})
@RouteConfig([
        { path: '/', name: 'Settings', component: SettingsListComponent, useAsDefault: true },
        { path: '/:id', name: 'SettingDetail', component: SettingDetailComponent }
])
export class SettingsComponent { }