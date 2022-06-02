import {Component, OnInit} from '@angular/core';
import {IRecords} from "../../shared/models/records.model";
import {ActivatedRoute, Router} from "@angular/router";
import {faArrowRight, faBowlFood, faMugSaucer} from "@fortawesome/free-solid-svg-icons";
import {faUtensils} from "@fortawesome/free-solid-svg-icons/faUtensils";
import {faBreadSlice} from "@fortawesome/free-solid-svg-icons/faBreadSlice";
import {faCoffee} from "@fortawesome/free-solid-svg-icons/faCoffee";
import {FormControl} from "@angular/forms";
import {RecordsService} from 'src/app/core/services/records/records.service';
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-records',
    templateUrl: './records.component.html',
    styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
    data: IRecords[] = [];
    brekfastIcon = faMugSaucer
    lunchIcon = faBowlFood
    dinnerIcon = faUtensils;
    meriendaIcon = faBreadSlice;
    almuerzoIcon = faCoffee

    arrow = faArrowRight;

    date: FormControl;

    constructor(private _route: ActivatedRoute, private _recordsService: RecordsService, private datePipe: DatePipe, private _router: Router) {
    }

    ngOnInit(): void {
        this.data = this._route.snapshot.data['response'];
        this.date = new FormControl(new Date().toISOString().slice(0, 10));

        this.date.valueChanges.subscribe(() => {
            this.changeDate();
        });

    }

    changeDate() {
        this._recordsService.findByday(this.datePipe.transform(new Date(this.date.value), "yyyy-MM-dd")).subscribe(res => {
            this.data = res;
        });
    }

    newRecord() {
        this._router.navigate(['../records/new'], {relativeTo: this._route}).then();
    }

    navigate(item:any){
        this._router.navigate([`app/records/${item?.id}`]).then();
    }
    getIcon(type: string): any {
        if (type === 'Desayuno') return this.brekfastIcon;
        if (type === 'Almuerzo') return this.almuerzoIcon;
        if (type === 'Merienda') return this.meriendaIcon;
        if (type === 'Cena') return this.dinnerIcon;
        return this.lunchIcon;
    }
}
