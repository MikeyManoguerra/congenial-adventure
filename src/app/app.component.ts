import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'art-and-arbor';
  isAdminPage$: Observable<boolean>;

  constructor(private _router: Router) { }

  ngOnInit() {
    this.isAdminPage$ = this._router.events.pipe(
      filter((evt: any) => {
        return evt instanceof NavigationEnd;
      }),
      map((evt: NavigationEnd) => {
        return evt.url.includes('/admin');
      }),
    );
    // window.addEventListener('scroll', this.scroll, true); //third parameter
  }

  // scroll = ($event: any): void => {
  //   console.log($event);
  //   //handle your scroll here
  //   //notice the 'odd' function assignment to a class field
  //   //this is used to be able to remove the event listener
  // };




}
