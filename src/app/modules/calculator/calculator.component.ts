import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {IFood} from "../../shared/models/food.model";
import {FoodService} from "../../core/services/food/food.service";

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

    entries: FormArray;

    foods: IFood[];
    currentFood: IFood[] = [];
    entryError: boolean = false;
    rations: number = 0;

    constructor(private _router: ActivatedRoute, private _fb: FormBuilder, private _foodService: FoodService) {
    }

    ngOnInit(): void {
        this.foods = this._router.snapshot.data['response']?.results;
        this.formInit();
    }

    formInit() {
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
        const values = this.entries.controls.map(e => e.get('usual_measure').value / e.get('hc_rations').value);
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
