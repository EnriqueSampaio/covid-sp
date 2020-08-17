import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  redirecting: boolean;
  opened: boolean = true;

  private _mobileQueryListener: () => void;

  constructor(private router: Router, private media: MediaMatcher, cdr: ChangeDetectorRef) {
    this.mobileQuery = this.media.matchMedia('(max-width: 599px)');
    this._mobileQueryListener = () => cdr.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  citySelected(city) {
    this.redirecting = true;
    console.log(city);
    setTimeout(() => {
      this.router.navigate(['city', city.id]);
    }, 100);
  }
}
