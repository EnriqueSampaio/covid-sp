import { Component } from '@angular/core';
import { DataService } from './core/services/data.service';
import { take, finalize } from 'rxjs/operators';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'covid-sp';
  loading = true;

  constructor(private router: Router, private dataService: DataService) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          this.dataService.parseCompleted()
            .pipe(take(1),
              finalize(() => this.loading = false)
            ).subscribe();
          break;
        }

        // case event instanceof NavigationEnd:
        // case event instanceof NavigationCancel:
        // case event instanceof NavigationError: {
        //   this.loading = false;
        //   break;
        // }
        default: {
          break;
        }
      }
    });
  }
  // constructor(private dataService: DataService) {
  //   this.dataService.parseCompleted()
  //     .pipe(take(1),
  //       finalize(() => this.loading = false)
  //     ).subscribe();
  // }
}
