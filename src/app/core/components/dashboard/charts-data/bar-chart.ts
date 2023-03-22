import {ChartData} from "chart.js";

export var barChartData: ChartData<'bar'> = {
  labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
  datasets: [
    { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
    { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
  ]
};

export var barChartOptions = {
  responsive: true,
  // We use these empty structures as placeholders for dynamic theming.
  scales: {
    x: {},
    y: {
      min: 10
    }
  },
  plugins: {
    legend: {
      display: true,
    },
    datalabels: {
      anchor: 'end',
      align: 'end'
    }
  }
}
