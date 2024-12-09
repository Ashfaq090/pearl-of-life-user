import { Component, OnInit } from '@angular/core';
import { SIDE_NAVIGATION } from '../constants/app.constant';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  constructor(
    private readonly router: Router
  ){}

  public navList: any = SIDE_NAVIGATION;
  public activeItemLink: string = '/dashboard';
  public activeItem: string = 'All Items';

  public isCollapsed = false;

  ngOnInit(): void{
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveNav(event.urlAfterRedirects);
      }
    });
  }

  updateActiveNav(activeItemLink: string) {
    this.activeItemLink = activeItemLink;
    this.activeItem = this.navList.find((x: any) => x.link == activeItemLink)?.name;
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

}
