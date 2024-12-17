import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js";

@Component({
    selector: 'app-recent-history',
    templateUrl: './recent-history.component.html',
    styleUrls: ['./recent-history.component.scss']
})
export class RecentHistoryComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        this.createChart();
    }

    createChart() {
        const ctx = document.getElementById('glucoseChart') as HTMLCanvasElement;
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['8AM', '10AM', '12PM', '2PM', '4PM'],
                datasets: [{
                    label: 'Glucose Level',
                    data: [120, 140, 110, 130, 125],
                    borderColor: '#007bff',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }
}