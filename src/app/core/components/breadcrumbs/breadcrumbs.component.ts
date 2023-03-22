import { Component, OnInit } from '@angular/core';
import {Breadcrumb} from "../../models/breadcrumb";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AppService} from "../../../app.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  menuItems: Breadcrumb[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public appService: AppService
  ) { }

  ngOnInit() {
    this.menuItems = this.getUrl(this.activatedRoute);
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.menuItems = this.getUrl(this.activatedRoute));
  }

  getUrl(route: ActivatedRoute, url: string = '#') {
    let label: string = '';
    let selectedIndex = -1;
    var arrayData = this.appService.breadcrumbs;
    const returnedData = this.setUrl(route, url, label);
    label = returnedData.label;
    url = returnedData.url;
    if (!this.appService.breadcrumbs.some(x => x.url === url)) {
      this.appService.breadcrumbs.push({label, url});
    } else {
      // get index when click on the breadcrumb links
      selectedIndex = this.appService.breadcrumbs.findIndex((value: { url: string; }) => value.url === url);
      // remove other links when click on the breadcrumb links
      for (let i = 0; i < this.appService.breadcrumbs.length; i++) {
        if (i > selectedIndex) {
          this.appService.breadcrumbs.splice(i);
        }
      }
    }
    return this.appService.breadcrumbs;
  }

  setUrl(route: any, url: string, label: string): any {
    let parentRouteURL: string = '';
    for (const child of route.children) {
      if (child.snapshot.data['title'] != undefined) {
        label = child.snapshot.data['title'];
      }
      parentRouteURL = child.snapshot.url.map((segment: { path: any; }) => segment.path).join('/');
      if (parentRouteURL !== '') {
        url += `/${parentRouteURL}`;
      }
      return this.setUrl(child, url, label);
    }
    return {
      url: url,
      label: label
    };
  }

}
