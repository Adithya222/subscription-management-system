import {Component, ElementRef, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {NgxPermissionsService} from "ngx-permissions";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../store/app.state";
import {getLoading} from "../../store/Shared/shared.selector";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  title = 'admindashboard';
  fullPageLinksArray = ['/pages-register', '/pages-login', '/pages-error404']
  analytics: any;
  // owa = new OwaData();
  hideTopMenu = false;
  showLoading: Observable<boolean> | undefined;

  constructor(
    private elementRef: ElementRef,
    public  _router: Router,
    private permissionsService: NgxPermissionsService,
    private http: HttpClient,
    private store: Store<CoreAppState>
  ) { }

  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }

  changeOfRoutes() {

  }

}
