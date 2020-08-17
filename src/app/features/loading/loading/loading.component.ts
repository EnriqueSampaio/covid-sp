import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { take, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  loading: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // this.loading = true;
    // this.dataService.parseCompleted()
    // .pipe(take(1),
    //   finalize(() => this.loading = false)
    // ).subscribe();
  }

}
