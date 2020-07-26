import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  cityName: string;

  @Input() cityId: string;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.parseCompleted()
      .pipe(take(1))
      .subscribe(() => {
        this.cityName = this.dataService.getCityName(this.cityId);
      });
  }

}
