import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {ActivatedRoute} from "@angular/router";
import {RecordsService} from "../../core/services/records/records.service";
import {FormControl} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {lineChartData} from "./config";

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, AfterViewInit {
    start_date: FormControl;
    end_date: FormControl;

    lineChartData = lineChartData;
    chartConfig: Chart;

    @ViewChild('chart') private chart: ElementRef;

    constructor(private _route: ActivatedRoute, private _recordsService: RecordsService, private datePipe: DatePipe) {
    }

    ngAfterViewInit(): void {
        this.chartConfig = new Chart(this.chart.nativeElement, this.lineChartData);
    }

    ngOnInit(): void {
        const data = this._route.snapshot.data['response'];
        this.lineChartData['data'].datasets[0].data = data.blood_glucose_data;
        this.lineChartData['data'].datasets[1].data = data.carbohydrates_data;
        this.lineChartData['data'].labels = data.labels;
        const now = new Date();
        const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 7);
        this.start_date = new FormControl(startDate.toISOString().slice(0, 10));
        this.end_date = new FormControl(endDate.toISOString().slice(0, 10));

        this.start_date.valueChanges.subscribe(() => {
            this.updateChart();
        });
        this.end_date.valueChanges.subscribe(() => {
            this.updateChart();

        });
    }

    download() {
        const date = new Date(this.start_date.value);
        const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        this._recordsService.report(this.datePipe.transform(this.end_date.value, "yyyy-MM-dd"),
            this.datePipe.transform(startDate, "yyyy-MM-dd")).subscribe(res => {
            let blob = new Blob([res], {type: 'application/pdf'});
            let pdfUrl = window.URL.createObjectURL(blob);

            let PDF_link = document.createElement('a');
            PDF_link.href = pdfUrl;
            PDF_link.download = `report_${this.datePipe.transform(this.end_date.value, "yyyy-MM-dd")}_${this.datePipe.transform(this.start_date.value, "yyyy-MM-dd")}.pdf`;
            PDF_link.click();
        });
    }

    updateChart() {
        const date = new Date(this.start_date.value);
        const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        this._recordsService.charts(this.datePipe.transform(this.end_date.value, "yyyy-MM-dd"), this.datePipe.transform(startDate, "yyyy-MM-dd"))
            .subscribe(res => {
                this.lineChartData['data'].datasets[0].data = res.blood_glucose_data;
                this.lineChartData['data'].datasets[1].data = res.carbohydrates_data;
                this.lineChartData['data'].labels = res.labels;
                this.chartConfig.update();
            })
    }
}
