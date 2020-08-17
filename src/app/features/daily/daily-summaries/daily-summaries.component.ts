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
    this.dataService.getLatestCityData(this.cityId)
      .subscribe((city) => {
        switch (this.feature) {
          case 'deaths':
            this.total = city.get('new_deaths');
            break;

          default:
            this.total = city.get('new_occurr');
            break;
        }
      })
  }

}
