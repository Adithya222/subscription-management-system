import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {getBrandById} from "../../brand/state/brands.selector";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../store/app.state";
import {Router} from "@angular/router";
import {CustomValidationService} from "../../../services/customvalidation.service";
import {getFormLoading} from "../../../store/Shared/shared.selector";
import {setFormLoading, setModalStatus} from "../../../store/Shared/shared.actions";
import {RecurringService} from "../../../services/recurring.service";
import {merge} from "lodash";

@Component({
  selector: 'app-create-recurring-cycle',
  templateUrl: './create-recurring-cycle.component.html',
  styleUrls: ['./create-recurring-cycle.component.css']
})
export class CreateRecurringCycleComponent implements OnInit {

  @Output() outputData = new EventEmitter<any>()


  @Input()
  set recurringId(recurringId: any) {
    this.setRecurringData(recurringId);
  }

  recuringForm!: FormGroup;
  recurring: any;
  showFormLoading: Observable<boolean> | undefined;
  recurringSubscription: Subscription = new Subscription();


  constructor(
    private fb: FormBuilder,
    private store: Store<CoreAppState>,
    private router: Router,
    private customValidator: CustomValidationService,
    private el: ElementRef,
    private recuttingService: RecurringService
  ) {
  }

  ngOnInit(): void {
    if (!this.recuringForm) {
      this.initializeForms()
    }
    this.showFormLoading = this.store.select(getFormLoading);
  }

  initializeForms() {
    this.recuringForm = this.fb.group({
      recurringCycle: new FormControl(null, [Validators.required]),
      noDays: new FormControl(null, [Validators.required])
    })
  }


  setRecurringData(id: any) {
    if (id) {
      if (!this.recuringForm) {
        this.initializeForms()
      }
      this.recuttingService.getAllRecurringsById(id).subscribe((response: any) => {
        this.recurring = response.data.data
        this.recuringForm.patchValue(this.recurring)
      })

    }
  }

  saveBrand(msg: string) {
    if (!this.recuringForm.valid) {
      this.recuringForm.markAllAsTouched();
      this.customValidator.scrollToFirstInvalidControl(this.el);
    } else {

      this.recuttingService.addRecurring(this.recuringForm.getRawValue()).subscribe((response: any) => {

        var obj = {
          type: 'CREATE',
          data: response.data.data
        }
        this.outputData.emit(obj);
        this.store.dispatch(setModalStatus({status: false}));

      })
    }
  }

  updateBrand() {
    if (!this.recuringForm.valid) {
      this.recuringForm.markAllAsTouched();
      this.customValidator.scrollToFirstInvalidControl(this.el);
    } else {
      const recurring = merge({}, this.recurring, this.recuringForm.value);
      this.store.dispatch(setFormLoading({status: true}));

      this.recuttingService.updateRecurring(recurring).subscribe((response: any) => {
        var obj = {
          type: 'UPDATE',
          data: response.data.data
        }
        this.outputData.emit(obj);
        this.store.dispatch(setModalStatus({status: false}));


      })

    }
  }
}
