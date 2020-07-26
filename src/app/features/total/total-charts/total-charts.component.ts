import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-total-charts',
  templateUrl: './total-charts.component.html',
  styleUrls: ['./total-charts.component.scss'],
})
export class TotalChartsComponent implements OnInit {

  @Input() cityId: string;
  constructor() { }

  ngOnInit(): void {
  }

}
