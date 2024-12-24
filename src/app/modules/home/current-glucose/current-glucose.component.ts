import {Component, Input, OnInit} from '@angular/core';
import {ILastGlucoseModel} from "../../../shared/models/last.glucose.model";

@Component({
    selector: 'app-current-glucose',
    templateUrl: './current-glucose.component.html',
    styleUrls: ['./current-glucose.component.scss']
})
export class CurrentGlucoseComponent implements OnInit {
    @Input() glucoseData: ILastGlucoseModel;


    constructor() {
    }

    ngOnInit(): void {
    }

    getTime(){
        let result = 'Last updated: ';
        if(!this.glucoseData.time_since_creation) return 'No data';
        if(this.glucoseData.time_since_creation.days) result = result + this.glucoseData.time_since_creation.days + ' days ';
        if(this.glucoseData.time_since_creation.hours) result = result + this.glucoseData.time_since_creation.hours + ' hours ';
        if(this.glucoseData.time_since_creation.minutes) result = result + this.glucoseData.time_since_creation.minutes + ' minutes ';
        return result + 'ago';
    }
}
