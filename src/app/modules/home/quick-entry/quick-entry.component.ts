import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-quick-entry',
    templateUrl: './quick-entry.component.html',
    styleUrls: ['./quick-entry.component.scss']
})
export class QuickEntryComponent implements OnInit {
    glucoseLevel: number | null = null;

    constructor() {
    }

    ngOnInit(): void {
    }

    onSubmit() {
        if (this.glucoseLevel !== null) {
            console.log('Submitted glucose level:', this.glucoseLevel);
            // Here you would typically send this data to your backend
            this.glucoseLevel = null;
        }
    }
}
