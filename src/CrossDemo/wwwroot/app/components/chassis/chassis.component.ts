﻿import {Component}                          from 'angular2/core';
import {RouteConfig, RouterOutlet}          from 'angular2/router';

import {ChassisListComponent}            from './chassis-list.component';
import {ChassisDetailComponent}          from './chassis-detail.component';
import {SidebarService}                  from '../services/SidebarService';

@Component({
    templateUrl: '/views/Chassis/',
    directives: [RouterOutlet]
})
@RouteConfig([
    { path: '/', name: 'Chassises', component: ChassisListComponent, useAsDefault: true },
    { path: '/:id', name: 'ChassisDetail', component: ChassisDetailComponent }
])
export class ChassisComponent {
    IsSidebarVisible: boolean;

    constructor(private mSidebarService: SidebarService) {
        this.IsSidebarVisible = mSidebarService.IsSidebarVisible;
        console.log("chassis constructor");
    }

    toggleSidebar() {
        console.log("chassis");
        if (this.mSidebarService.IsSidebarVisible)
            this.mSidebarService.HideSidebar();
        else
            this.mSidebarService.ShowSidebar();
        this.IsSidebarVisible = this.mSidebarService.IsSidebarVisible;
    }
}