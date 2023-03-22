import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, mergeMap, of, switchMap} from "rxjs";
import {setErrorMsg, setFormLoading, setLoadingSpinner, setModalStatus} from "../../../store/Shared/shared.actions";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../store/app.state";
import {catchError} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {HelperService} from "../../../services/helper.service";
import {PlanService} from "../../../services/plan.service";
import {
  addPlan,
  addPlanSuccess, deletePlan, deletePlanSuccess,
  emptyPlansArray,
  emptyPlansArraySuccess,
  loadPlans,
  loadPlansSuccess, updatePlan, updatePlanSuccess
} from "./plan.actions";
import {Plan} from "../../../models/plan.model";

@Injectable()
export class PlanEffects {
  constructor(
    private actions$: Actions,
    private planService: PlanService,
    private store: Store<CoreAppState>,
    private toastr: ToastrService,
    private helperService: HelperService,
  ) {
  }

  loadPlans$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPlans),
      mergeMap((action) => {
        this.store.dispatch(setLoadingSpinner({status: true}))
        return this.planService.getPlans(action.filters).pipe(
          map((plans) => {
            this.store.dispatch(setLoadingSpinner({status: false}))
            return loadPlansSuccess({plans});
          }),
          catchError((err: any) => {
            this.store.dispatch(setLoadingSpinner({status: false}))
            return of(setErrorMsg({message: err.message}));
          })
        );
      })
    )
  })

  emptyPlansArray$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(emptyPlansArray),
      mergeMap((action) => {
        const plans: Plan[] = [];
        return of(emptyPlansArraySuccess({plans}));
      })
    )
  })

  addPlan$ = createEffect(() => {
    return this.actions$.pipe(ofType(addPlan), mergeMap((action) => {
      return this.planService.addPlan(action.plan).pipe(
        map((data) => {
          const plan = {...action.plan, ...data.data.data};
          this.toastr.success(data.message);
          action.msg == 'close' ? this.store.dispatch(setModalStatus({status: false})) : null;
          return addPlanSuccess({plan});
        }),
        catchError((err: any) => {
          this.toastr.error('Something went wrong');
          return of(err.message);
        })
      );
    }));
  })

  updatePlan$ = createEffect(() => {
    return this.actions$.pipe(ofType(updatePlan), switchMap((action) => {
      return this.planService.updatePlan(action.plan).pipe(
        map((data) => {
          this.toastr.success(data.message, 'Success');
          this.store.dispatch(setFormLoading({status: false}));
          this.store.dispatch(setModalStatus({status: false}))
          this.store.dispatch(setLoadingSpinner({status: false}))
          return updatePlanSuccess({plan: action.plan});
        }),
        catchError((err: any) => {
          this.toastr.error(err.message, 'Error');
          this.store.dispatch(setModalStatus({status: false}))
          this.store.dispatch(setFormLoading({status: false}));
          this.store.dispatch(setLoadingSpinner({status: false}))
          return of(err.message);
        })
      );
    }))
  })

  deletePlan$ = createEffect(() => {
    return this.actions$.pipe(ofType(deletePlan), switchMap((action) => {
      return this.planService.deletePlan(action.plan).pipe(
        map((data) => {
          this.store.dispatch(setLoadingSpinner({status: false}));
          this.toastr.success('Plan deleted');
          return deletePlanSuccess({id: action.plan.id});
        }),
        catchError((err: any) => {
          this.toastr.error('Something went wrong');
          this.store.dispatch(setLoadingSpinner({status: false}));
          return of(err.message);
        }),
      );
    }))
  })

}
