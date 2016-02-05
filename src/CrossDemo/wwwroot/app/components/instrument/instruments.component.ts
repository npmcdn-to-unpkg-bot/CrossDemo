import {Component}                                      from 'angular2/core';
import {RouteConfig, RouterOutlet, AuxRoute}            from 'angular2/router';



import {InstrumentListComponent}            from './instruments-list.component';
import {InstrumentDetailComponent}          from './instrument-detail.component';
import {SidebarService}                     from '../services/SidebarService';

@Component({
    selector: 'instruments',
    templateUrl: '/views/Instruments/',
    directives: [RouterOutlet],
    providers: [InstrumentListComponent, SidebarService]
})
@RouteConfig([
    { path: '/', name: 'Instruments', component: InstrumentListComponent, useAsDefault: true },
    { path: '/:id', name: 'InstrumentDetail', component: InstrumentDetailComponent }
])
export class InstrumentsComponent {
    
    constructor(private mSidebarService: SidebarService) { }

    toggleSidebar() {
        console.log("toggle instrument ");
        if (this.mSidebarService.IsSidebarVisible)
            this.mSidebarService.HideSidebar();
        else
            this.mSidebarService.ShowSidebar();
        console.log(this.mSidebarService.IsSidebarVisible);
    }
}