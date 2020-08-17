import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { take, startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  options: { id: string, name: string }[] = [];
  filteredOptions: Observable<{ id: string, name: string }[]>;

  @Output() citySelected: EventEmitter<{ id: string, name: string }> = new EventEmitter();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getLatestData()
      .pipe(take(1))
      .subscribe((cities) => {
        this.options = cities.docs
          .map((city) => {
            return {
              id: city.get('ibge_cod'),
              name: city.get('city')
            };
          });
        this.filteredOptions = this.searchControl.valueChanges
          .pipe(
            startWith(''),
            map((value) => typeof value === 'string' ? value : value.name),
            map((name) => name ? this._filter(name) : this.options)
          );
      });
  }

  display(city) {
    return city && city.name ? city.name : '';
  }

  onClick(event, city) {
    this.citySelected.emit(city)
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) => option.name.toLowerCase().includes(filterValue));
  }

}
