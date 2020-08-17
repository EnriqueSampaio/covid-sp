import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-total-summaries',
  templateUrl: './total-summaries.component.html',
  styleUrls: ['./total-summaries.component.scss']
})
export class TotalSummariesComponent implements OnInit {

  total: number = 0;

  @Input() feature: string = 'occurr';
  @Input() cityId: string;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getLatestCityData(this.cityId)
      .subscribe((city) => {
        switch (this.feature) {
          case 'deaths':
            this.total = city.get('deaths');
            break;

          case 'pop':
            this.total = city.get('est_pop');
            break;

          default:
            this.total = city.get('occurr');
            break;
        }
      });
  }

}
