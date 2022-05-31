import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration} from 'chart.js';

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
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Blood glucose',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'red',
      },
      {
        data: [ 40, 78, 10, 21, 25, 27, 40 ],
        label: 'Carbohydrates',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'blue',
      }
    ],
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ]
  };

  @ViewChild('chart') chart: any;

  constructor() {
    window.addEventListener('afterprint', () => {
      this.chart.resize();
    });
  }

  ngOnInit(): void {
  }

}
