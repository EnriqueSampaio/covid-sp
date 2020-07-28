import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { take, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent implements OnInit {
  loading: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loading = true;
    this.dataService.parseCompleted()
    .pipe(take(1),
      finalize(() => this.loading = false)
    ).subscribe();
  }

}
