import {Component, OnInit} from '@angular/core';
import {IRecords} from "../../shared/models/records.model";
import {ActivatedRoute, Router} from "@angular/router";
import {faArrowRight, faBowlFood, faMugSaucer} from "@fortawesome/free-solid-svg-icons";
import {faUtensils} from "@fortawesome/free-solid-svg-icons/faUtensils";
import {faBreadSlice} from "@fortawesome/free-solid-svg-icons/faBreadSlice";
import {faCoffee} from "@fortawesome/free-solid-svg-icons/faCoffee";
import {RecordsService} from 'src/app/core/services/records/records.service';
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-records',
    templateUrl: './records.component.html',
    styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
    data: IRecords[] = [];
    date: string = new Date().toISOString().slice(0, 10);

    brekfastIcon = faMugSaucer
    lunchIcon = faBowlFood
    dinnerIcon = faUtensils;
    meriendaIcon = faBreadSlice;
    almuerzoIcon = faCoffee

    arrow = faArrowRight;

    showAddRecord: boolean = false;

    constructor(private _route: ActivatedRoute, private _recordsService: RecordsService, private datePipe: DatePipe, private _router: Router) {
    }

    ngOnInit(): void {
        this.data = this._route.snapshot.data['response'];

    }

    changeDate(event: Event) {
        this.date = (event.target as HTMLInputElement).value;

        this._recordsService.findByDay(this.datePipe.transform(new Date(this.date), "yyyy-MM-dd")).subscribe(res => {
            this.data = res;
        });
    }

    newRecord() {
        this._router.navigate(['../records/new'], {relativeTo: this._route,  state: { date: this.date}}).then();
    }

    navigate(item: any) {
        this._router.navigate([`app/records/${item?.id}`]).then();
    }

    getIcon(type: string): any {
        if (type === 'Breakfast') return this.brekfastIcon;
        if (type === 'Mid-Morning Snack') return this.almuerzoIcon;
        if (type === 'Afternoon Snack') return this.meriendaIcon;
        if (type === 'Late-Night Snack') return this.meriendaIcon;
        if (type === 'Dinner') return this.dinnerIcon;
        return this.lunchIcon;
    }
}
