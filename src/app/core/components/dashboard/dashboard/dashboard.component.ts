import {Component, ElementRef, OnInit} from '@angular/core';
import {lineChartData, lineChartOptions} from "../charts-data/line-chart";
import {ChartEvent, ChartType} from "chart.js";
import {barChartData, barChartOptions} from "../charts-data/bar-chart";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  lineChartData = lineChartData;
  lineChartOptions = lineChartOptions;
  lineChartType: ChartType = 'line';
  barChartData = barChartData;
  barChartOptions = barChartOptions;
  barChartPlugins = [];

  constructor(
      private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
``  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

}
