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
            },
            {
                data: [],
                label: 'Carbohydrates',
                backgroundColor: 'rgb(255,255,255,0)',
                borderColor: 'rgba(150,175,90,0.75)',
            }
        ],
        labels: []
    }
};