import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Moment } from 'moment-timezone';
import { DataService } from 'src/app/core/services/data.service';
import { take } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-last-update',
  templateUrl: './last-update.component.html',
  styleUrls: ['./last-update.component.scss']
})
export class LastUpdateComponent implements OnInit {
  lastUpdate: Moment;

  @Input() cityId: string;
  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.parseCompleted()
      .pipe(take(1))
      .subscribe(() => {
        const city = this.data.getCity(this.cityId);
        this.lastUpdate = city[city.length - 1].datetime;
      })
  }
}
