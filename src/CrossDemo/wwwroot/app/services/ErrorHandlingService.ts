import { Injectable} from 'angular2/core';
// Error handling service
@Injectable()
export class ErrorHandlingService {

    constructor() {
    }

    HandleError(error) {
        console.log(error);
    }
}