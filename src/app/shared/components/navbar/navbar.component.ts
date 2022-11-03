import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  ruta: string = '/characters/list';
  logo: string = 'assets/logo.png';
  @Input() limit: number = 10;
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.ruta = event.url;
      }
    });
  }

  ngOnInit(): void {}
}
