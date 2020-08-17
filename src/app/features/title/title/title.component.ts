import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

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
    this.dataService.getLatestCityData(this.cityId)
      .subscribe((city) => {
        this.cityName = city.get('city');
      });
  }

}
