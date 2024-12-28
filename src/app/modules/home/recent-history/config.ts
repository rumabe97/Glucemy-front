import {ChartConfiguration} from "chart.js";

export const lineChartData: ChartConfiguration = {
    type: 'line',
    data: {
        datasets: [
            {
                data: [],
                label: 'Blood glucose',
                backgroundColor: 'rgba(255,255,255,0)',
                borderColor: 'rgba(136,8,8,0.74)',
            }
        ],
        labels: []
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
};