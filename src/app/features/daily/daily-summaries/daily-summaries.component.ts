import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-daily-summaries',
  templateUrl: './daily-summaries.component.html',
  styleUrls: ['./daily-summaries.component.scss']
})
export class DailySummariesComponent implements OnInit {

  total: number = 0;

  @Input() feature: string = 'occurr';
  @Input() cityId: string
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.parseCompleted()
      .pipe(take(1))
      .subscribe(() => {
        if (this.cityId) {
          const city = this.dataService.getCityData(this.cityId);
          switch (this.feature) {
            case 'deaths':
              this.total = city[city.length - 1].new_deaths;
              break;

            default:
              this.total = city[city.length - 1].new_occurr;
              break;
          }
        }
      })
  }

}
