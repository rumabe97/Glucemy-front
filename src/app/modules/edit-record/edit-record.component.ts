import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PhasesDayService} from "../../core/services/phases-day/phases-day.service";
import {IFood} from "../../shared/models/food.model";
import {FoodService} from "../../core/services/food/food.service";

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
    currentFood: IFood[] = [];
    entryError: boolean = false;
    rations: number = 0;

    bolus:FormControl;

    constructor(private _fb: FormBuilder, private _phaseDayService: PhasesDayService, private _foodService: FoodService) {
    }

    ngOnInit(): void {
        this.formInit();
        this.formFoodInit();
        this.bolus = new FormControl('');
    }

    formInit() {
        this.form = this._fb.group({
            phaseDay: [''],
            bloodGlucose: [''],
            annotations: [''],
        });
    }

    searchPhase(value: any) {
        this._phaseDayService.search({search: value, page: 1}).subscribe(response => {
            this.phasesDay = response.results;
        });
    }

    formFoodInit() {
        this.entries = this._fb.array([]);
        this.addEntry();
    }

    addEntry() {
        if (this.entries.invalid) {
            this.entries.markAllAsTouched();
            this.entryError = true;
            return;
        }

        const entry = this._fb.group({
            name: ['', Validators.required],
            usual_measure: ['', Validators.required],
            hc_rations: [''],
            index: [''],
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

}
