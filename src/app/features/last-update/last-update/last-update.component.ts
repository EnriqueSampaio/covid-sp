import { Component, OnInit, Input } from '@angular/core';
import { Moment } from 'moment-timezone';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-last-update',
  templateUrl: './last-update.component.html',
  styleUrls: ['./last-update.component.scss']
})
export class LastUpdateComponent implements OnInit {
  lastUpdate: Moment;

  @Input() cityId: string;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getLatestCityData(this.cityId)
      .subscribe((city) => {
        this.lastUpdate = city.get('datetime').toDate();
      })
  }
}
