import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../../store/app.state";
import {getFilterOptions, getSelectedOption} from "../state/filter.selector";
import {setFilterOptions} from "../state/filter.actions";

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  selectedOption: Observable<any> | undefined;
  filterOptions: Observable<any> | undefined;
  filters: any = {};

  constructor(
      private store: Store<CoreAppState>,
  ) { }

  ngOnInit(): void {
    this.selectedOption = this.store.select(getSelectedOption);
    this.filterOptions = this.store.select(getFilterOptions);
    this.filterOptions.subscribe((data) => {
      this.filters = Object.assign({}, data);
    })
  }

  setDate(event: any, key: any) {
    this.filters[key] = event.target.value;
    this.store.dispatch(setFilterOptions({filters: {...this.filters} }));
  }

}
