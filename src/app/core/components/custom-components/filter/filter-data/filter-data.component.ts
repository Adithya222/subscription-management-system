import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../../store/app.state";
import {getFilterOptions, getFilterOptionsFields, getSelectedOption} from "../state/filter.selector";
import {Observable} from "rxjs";
import {setSelectedOption} from "../state/filter.actions";

@Component({
  selector: 'app-filter-data',
  templateUrl: './filter-data.component.html',
  styleUrls: ['./filter-data.component.css']
})
export class FilterDataComponent implements OnInit, OnDestroy {

  mainOptions: Observable<any> | undefined;
  selectedOption: Observable<any> | undefined;

  @Output() filteredData = new EventEmitter<any>()

  constructor(
      private store: Store<CoreAppState>,
  ) { }

  ngOnInit(): void {
    this.mainOptions = this.store.select(getFilterOptionsFields);
    this.selectedOption = this.store.select(getSelectedOption);
  }

  selectOption(event: any) {
    this.store.dispatch(setSelectedOption({selectedOption: event}));
  }

  onSubmit(pop: any) {
    this.filteredData.emit('filter');
    pop.close();
  }

  onReset(pop: any) {
    this.filteredData.emit('reset');
    pop.close();
  }

  ngOnDestroy(): void {
    this.store.dispatch(setSelectedOption({selectedOption: {}}))
  }

}
