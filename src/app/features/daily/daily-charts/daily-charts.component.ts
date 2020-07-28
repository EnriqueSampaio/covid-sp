import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-daily-charts',
  templateUrl: './daily-charts.component.html',
  styleUrls: ['./daily-charts.component.scss']
})
export class DailyChartsComponent implements OnInit {

  @Input() cityId: string;
  constructor() { }

  ngOnInit(): void {
  }

}
