import {Component, OnInit, Injectable}    from 'angular2/core';
import {Router, RouteParams}                    from 'angular2/router';

import {DataService}                    from '../../services/DataService';
import {ErrorHandlingService}           from '../../services/ErrorHandlingService';
import {Instrument}                     from '../../models/Instrument';

@Component({
    selector: 'instrument-list',
    templateUrl: '/views/instrumentlist/',
    providers: [DataService, ErrorHandlingService]
})
@Injectable()
export class InstrumentListComponent implements OnInit {

    Instruments: Instrument[];

    constructor(private mDataService: DataService
    ) { }


    ngOnInit() {
        var command = { Name: "GetInstruments", Parameters: {} };
        this.mDataService.Post("/api/commands", command, response=> {
            this.Instruments = response;
            console.log(this.Instruments);
        });
    }
}