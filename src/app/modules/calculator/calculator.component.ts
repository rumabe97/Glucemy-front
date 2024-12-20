import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IFood} from "../../shared/models/food.model";
import {FoodService} from "../../core/services/food/food.service";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {IRecords} from "../../shared/models/records.model";

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

    form: FormGroup;
    state: any;

    foods: IFood[];
    entryError: boolean = false;
    deleteIcon = faTrash;

    record: IRecords;

    constructor(private _fb: FormBuilder,
                private _foodService: FoodService) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this._fb.group({
            foodEntries: this._fb.array([this.createFoodEntry()]),
        });
    }

    createFoodEntry(value?: IFood, index?: number, isNew: boolean = true): FormGroup {
        this.searchFood('');
        const usualMeasure = isNew ? value?.usual_measure : this.record.carbohydrates[index];
        return this._fb.group({
            name: [value?.name ?? '', Validators.required],
            usualMeasure: [usualMeasure, [Validators.required, Validators.min(0)]],
            hcRations: [value?.hc_rations ?? '', [Validators.required, Validators.min(0)]],
            index: [value?.glycemic_index ?? ''],
            id: [value?.id ?? ''],
        });
    }

    get foodEntries() {
        return this.form.get('foodEntries') as FormArray;
    }

    addFoodEntry(value?: IFood,) {
        if (this.foodEntries.invalid) {
            this.foodEntries.markAllAsTouched();
            this.entryError = true;
            return;
        }
        this.foodEntries.push(this.createFoodEntry(value));
    }

    removeFoodEntry(index: number) {
        this.foodEntries.removeAt(index);
    }


    searchFood(value: any) {
        const name = value ? value.controls.name.value : '';
        this._foodService.search({search: name, page: 1}).subscribe(response => {
            this.foods = response.results;
        });
    }

    getRecommendedRations(): number {
        return this.foodEntries.controls.reduce((sum, entry) => {
            const rations = entry.get('usualMeasure')?.value / entry.get('hcRations')?.value;
            return sum + (isNaN(rations) ? 0 : rations);
        }, 0);
    }

    setOption(entry: any) {
        this.entryError = false;
        const food = this.foods.find(f => f.name === entry.controls.name.value);
        entry.get('usualMeasure').setValue(food?.usual_measure ?? '');
        entry.get('index').setValue(food?.glycemic_index ?? '');
        entry.get('hcRations').setValue(food?.hc_rations ?? '');
        entry.get('id').setValue(food?.id ?? '');
    }

    getBackground(value: number) {
        if (!value && value !== 0) return '';
        if (value < 60) return 'glycemicIndexLow';
        if (value >= 60 && value < 70) return 'glycemicIndexMedium';
        return 'glycemicIndexHard';
    }
}
