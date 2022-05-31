import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration} from 'chart.js';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  lineChartOptions = {
    responsive: true,
  };
  lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Blood glucose',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'red',
      },
      {
        data: [],
        label: 'Carbohydrates',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'blue',
      }
    ],
    labels: []
  };

  @ViewChild('chart') chart: any;

  constructor(private _route: ActivatedRoute) {
    window.addEventListener('afterprint', () => {
      this.chart.resize();
    });
  }

  ngOnInit(): void {
    const data = this._route.snapshot.data['response'];
    this.lineChartData.datasets[0].data = data.blood_glucose_data;
    this.lineChartData.datasets[1].data = data.carbohydrates_data;
    this.lineChartData.labels = data.labels;
  }

}
