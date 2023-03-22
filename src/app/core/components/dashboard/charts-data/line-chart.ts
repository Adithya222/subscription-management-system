import {ChartConfiguration} from "chart.js";

export var lineChartData: ChartConfiguration['data'] = {
  datasets: [
    {
      data: [65, 59, 80, 81, 56, 55, 40],
      label: 'Series A',
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      fill: 'origin',
    },
    {
      data: [28, 48, 40, 19, 86, 27, 90],
      label: 'Series B',
      backgroundColor: 'rgb(90,140,255,0.5)',
      borderColor: 'rgba(90,140,255,0.5)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
      fill: 'origin',
    },
    {
      data: [180, 480, 770, 90, 1000, 270, 400],
      label: 'Series C',
      yAxisID: 'y1',
      backgroundColor: 'rgba(128,248,148,0.5)',
      borderColor: 'rgba(128,248,148,0.5)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      fill: 'origin',
    }
  ],
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
};

export var lineChartOptions: ChartConfiguration['options'] = {
  elements: {
    line: {
      tension: 0.5
    }
  },
  scales: {
    // We use this empty structure as a placeholder for dynamic theming.
    y:
      {
        position: 'left',
      },
    y1: {
      position: 'right',
      grid: {
        color: 'rgba(164,162,162,0.3)',
      },
      ticks: {
        color: 'rgb(75,75,75)'
      }
    }
  },

  plugins: {
    legend: {display: true},
    // annotation: {
    //   annotations: [
    //     {
    //       type: 'line',
    //       scaleID: 'x',
    //       value: 'March',
    //       borderColor: 'orange',
    //       borderWidth: 2,
    //       label: {
    //         display: true,
    //         position: 'center',
    //         color: 'orange',
    //         content: 'LineAnno',
    //         font: {
    //           weight: 'bold'
    //         }
    //       }
    //     },
    //   ],
    // }
  }
};
