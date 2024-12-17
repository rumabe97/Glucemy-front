import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-current-glucose',
    templateUrl: './current-glucose.component.html',
    styleUrls: ['./current-glucose.component.scss']
})
export class CurrentGlucoseComponent implements OnInit {
    currentGlucose = 120;

    constructor() {
    }

    ngOnInit(): void {
    }

}
