import {Component}                     from 'angular2/core';
import {RouteConfig, RouterOutlet}     from 'angular2/router';

import {HelpListComponent}             from './help-list.component';
import {SidebarService}                from '../services/SidebarService';

@Component({
    templateUrl: '/views/Help/',
    directives: [RouterOutlet]
})
@RouteConfig([
        { path: '/', name: 'Help', component: HelpListComponent, useAsDefault: true }
    
])
export class HelpComponent {
    IsSidebarVisible: boolean;

    constructor(private mSidebarService: SidebarService) {
        this.IsSidebarVisible = mSidebarService.IsSidebarVisible;
    }

    toggleSidebar() {
        if (this.mSidebarService.IsSidebarVisible)
            this.mSidebarService.HideSidebar();
        else
            this.mSidebarService.ShowSidebar();
        this.IsSidebarVisible = this.mSidebarService.IsSidebarVisible;
    }
}