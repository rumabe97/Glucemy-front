import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PhasesDayService} from "../../core/services/phases-day/phases-day.service";
import {IFood} from "../../shared/models/food.model";
import {FoodService} from "../../core/services/food/food.service";
import {IRecords} from "../../shared/models/records.model";
import {RecordsService} from "../../core/services/records/records.service";
import {HotToastService} from "@ngneat/hot-toast";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-edit-record',
    templateUrl: './edit-record.component.html',
    styleUrls: ['./edit-record.component.scss']
})
export class EditRecordComponent implements OnInit {

    form: FormGroup;
    currentPhaseDay: any;
    phasesDay: any[] = [];

    entries: FormArray;

    foods: IFood[];
    currentFood: any = [];
    entryError: boolean = false;
    rations: number;

    record: IRecords;
    bolus: FormControl;

    constructor(private _fb: FormBuilder, private _phaseDayService: PhasesDayService,
                private _foodService: FoodService, private _recordService: RecordsService,
                private _toastService: HotToastService, private _router: Router, private _route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.record = this._route.snapshot.data['response'];
        this.currentPhaseDay = this.record?.phasesDay?.name ?? '';
        console.log(this.record);
        this.formInit();
        this.formFoodInit();
        this.searchPhase('');
        this.bolus = new FormControl(this.record?.bolus ?? '');
        this.rations = this.record?.hc_rations ?? 0;

    }

    formInit() {
        this.form = this._fb.group({
            phaseDay: [this.record?.phasesDay?.name ?? ''],
            blood_glucose: [this.record?.blood_glucose ?? ''],
            annotations: [this.record?.annotations ?? ''],
        });
    }

    searchPhase(value: any) {
        this._phaseDayService.search({search: value, page: 1}).subscribe(response => {
            this.phasesDay = response.results;
        });
    }

    formFoodInit() {
        this.entries = this._fb.array([]);
        if (!this.record) return this.addEntry();
        this.record?.foods.map((f, index) => this.addEntry(f, index));
    }

    addEntry(value?: IFood, index?: number) {
        if (this.entries.invalid) {
            this.entries.markAllAsTouched();
            this.entryError = true;
            return;
        }
        if (value) this.currentFood[index] = value?.name;
        const entry = this._fb.group({
            name: [value?.name ?? '', Validators.required],
            usual_measure: [value?.usual_measure ?? '', Validators.required],
            hc_rations: [value?.hc_rations ?? '', Validators.required],
            index: [value?.glycemic_index ?? ''],
            id: [value?.id ?? ''],
        });
        this.entryError = false;
        this.entries.push(entry);
        this.searchFood('');
    }

    setOption(entry: any, option: any) {
        this.entryError = false;
        const food = this.foods.find(f => f.name === option);
        entry.get('usual_measure').setValue(food?.usual_measure ?? '');
        entry.get('index').setValue(food?.glycemic_index ?? '');
        entry.get('hc_rations').setValue(food?.hc_rations ?? '');
        entry.get('id').setValue(food?.id ?? '');
    }

    searchFood(value: any) {
        this._foodService.search({search: value, page: 1}).subscribe(response => {
            this.foods = response.results;
        });
    }

    getId(index: number): string {
        return 'productList' + index;
    }

    getRations() {
        let values = this.entries.controls.map(e => e.get('usual_measure').value / e.get('hc_rations').value);
        values = values.map(v => isNaN(v) ? 0 : v);
        this.rations = values.reduce((a, b) => a + b, 0);
        if (isNaN(this.rations)) return 0;
        return this.rations;
    }

    getBackground(value: number) {
        if (!value && value !== 0) return '';
        if (value < 60) return 'glycemicIndexLow';
        if (value >= 60 && value < 70) return 'glycemicIndexMedium';
        return 'glycemicIndexHard';
    }

    save() {
        if (this.form.valid && this.entries.value) {
            const carbohydrates = this.entries.controls.map(e => e.get('usual_measure').value);
            const record: IRecords = {
                idPhaseDay: this.phasesDay.find(p => p.name === this.currentPhaseDay)?.id,
                carbohydrates: carbohydrates.reduce((a, b) => a + b, 0),
                hc_rations: this.rations,
                bolus: this.bolus.value,
                idFoods: this.entries.controls.map(e => e.get('id').value),
                id: this.record?.id ?? '',
                ...this.form.value
            }
            const $action = this.record ? this._recordService.update(record) : this._recordService.create(record);
            $action.subscribe(() => {
                this._toastService.success(`Record ${this.record ? 'updated' : 'created'} successfully`);
                this._router.navigate(['../'], {relativeTo: this._route}).then();
            });
        }
    }
}
