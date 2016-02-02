import {Component, OnInit, Injectable}    from 'angular2/core';
import {Router, RouteParams, RouteConfig, RouterOutlet}              from 'angular2/router';

import {DataService}                    from '../../services/DataService';
import {ErrorHandlingService}           from '../../services/ErrorHandlingService';
import {Instrument}                     from '../../models/Instrument';
import {InstrumentDetailComponent}      from './instrument-detail.component';

@Component({
    selector: 'instrument-list',
    templateUrl: '/views/instrumentlist/',
    directives: [RouterOutlet, InstrumentDetailComponent],
    providers: [DataService, ErrorHandlingService]
})

@Injectable()
export class InstrumentListComponent implements OnInit {

    Instruments: Instrument[];
    SelectedInstrument: Instrument;

    constructor(private mDataService: DataService,
        private mRouter: Router) { }


    ngOnInit() {
        var command = { Name: "GetInstruments", Parameters: {} };
        this.mDataService.Post("/api/commands", command, response=> {
            this.Instruments = response;
            console.log(this.Instruments[0]);
            if (this.Instruments.length)
                this.SelectedInstrument = this.Instruments[0];
        });
    }

    showDetail(instrument: Instrument): void {
        //this.mRouter.navigate(['InstrumentDetail', { id: instrument.Id }]);
        this.loadInstrument(instrument.Id);
    }
    loadInstrument(id: number) {
        if (id) {
            var command = { Name: "GetInstrument", Parameters: { Id: id } };
            this.mDataService.Post("/api/commands", command, response=> {
                this.SelectedInstrument = response;

                console.log(this.SelectedInstrument);
            });
        }
    }
}