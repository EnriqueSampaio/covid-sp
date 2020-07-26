import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-inner-pages',
  templateUrl: './inner-pages.component.html',
  styleUrls: ['./inner-pages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InnerPagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
