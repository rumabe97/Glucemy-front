import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RecordsService} from "../../../core/services/records/records.service";

@Component({
    selector: 'app-quick-entry',
    templateUrl: './quick-entry.component.html',
    styleUrls: ['./quick-entry.component.scss']
})
export class QuickEntryComponent implements OnInit {
    glucoseLevel: number | null = null;
    @Output() quickGlucose: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private _recordService: RecordsService) {
    }

    ngOnInit(): void {
    }

    onSubmit() {
        if (this.glucoseLevel !== null) {
            this._recordService.quickGlucose(this.glucoseLevel).subscribe(() => {
                this.quickGlucose.emit(true);
            })
            this.glucoseLevel = null;
        }
    }
}
