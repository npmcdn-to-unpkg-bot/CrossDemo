import {Component}                                      from 'angular2/core';
import {RouteConfig, RouterOutlet, AuxRoute}            from 'angular2/router';

import {InstrumentListComponent}            from './instruments-list.component';
import {InstrumentDetailComponent}          from './instrument-detail.component';

@Component({
    selector: 'instruments',
    templateUrl: '/views/instruments/',
    directives: [RouterOutlet],
    providers: [InstrumentListComponent]
})
@RouteConfig([
    { path: '/', name: 'Instruments', component: InstrumentListComponent, useAsDefault: true },
    { path: '/:id', name: 'InstrumentDetail', component: InstrumentDetailComponent }
])
export class InstrumentsComponent { }