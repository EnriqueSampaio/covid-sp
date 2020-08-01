import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.router.navigate(['city', '3552205']);
    // }, 5000)
  }

  citySelected(city) {
    this.router.navigate(['city', city.id]);
  }
}
