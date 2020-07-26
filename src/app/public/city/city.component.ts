import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit, OnDestroy {
  id: string;
  componentDestroyed: Subject<void>;

  constructor(private route: ActivatedRoute) {
    this.componentDestroyed = new Subject();
    this.route.paramMap
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe(
        (params) => {
          this.id = params.get('id');
        }
      )
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }
}
