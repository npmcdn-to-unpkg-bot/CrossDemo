import {Component, OnInit, Input} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {Instrument}                     from '../../models/Instrument';

@Component({
    selector: 'instrument-detail',
    templateUrl: '/views/instrumentdetail/',

})
export class InstrumentDetailComponent implements OnInit {

    @Input() Instrument: Instrument;

    constructor() { }

    ngOnInit() { }
        
}