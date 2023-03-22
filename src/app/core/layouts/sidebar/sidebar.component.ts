import {Component, Inject, InjectionToken, OnInit} from '@angular/core';
import {ROUTES} from "./sidebar-route-config";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public menuItems: any;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.menuItems = ROUTES;
  }

  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
}
