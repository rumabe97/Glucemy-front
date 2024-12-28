import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Chart} from "chart.js";
import {DatePipe} from "@angular/common";
import {lineChartData} from "./config";

@Component({
    selector: 'app-recent-history',
    templateUrl: './recent-history.component.html',
    styleUrls: ['./recent-history.component.scss']
})
export class RecentHistoryComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() data: any;

    lineChartData = lineChartData;
    chartConfig: Chart;

    @ViewChild('chart') private chart: ElementRef;

    constructor(private datePipe: DatePipe) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data']) {
            if (this.chartConfig) {
                this.lineChartData['data'].datasets[0].data = this.data.blood_glucose_data;
                this.lineChartData['data'].labels = this.getLabels(this.data.labels);
                this.chartConfig.update();
            }
        }
    }

    ngAfterViewInit(): void {
        this.chartConfig = new Chart(this.chart.nativeElement, this.lineChartData);
    }

    ngOnInit() {
        this.createChart();
    }

    createChart() {
        this.lineChartData['data'].datasets[0].data = this.data.blood_glucose_data;
        this.lineChartData['data'].labels = this.getLabels(this.data.labels);
    }

    getLabels(labels: string[]) {
        const groupedData: string[] = [];
        labels.forEach((label: string) => {
            const date = this.datePipe.transform(new Date(label), 'HH:mm')
            groupedData.push(date);
        });
        return groupedData;
    }
}