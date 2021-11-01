import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import * as fromServices from "../../services/toppings.service";
import * as toppingsActions from "../actions/toppings.action";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs/observable/of";

@Injectable()
export class ToppingsEffect {
  constructor(
    private actions$: Actions,
    private toppingsService: fromServices.ToppingsService
  ) {}

  @Effect() // TODO change to createEffect
  loadToppings$ = this.actions$.ofType(toppingsActions.LOAD_TOPPINGS).pipe(
    switchMap(() => {
      return this.toppingsService.getToppings().pipe(
        map((toppings) => new toppingsActions.LoadToppingsSuccess(toppings)),
        catchError((error) => of(new toppingsActions.LoadToppingsFail(error)))
      );
    })
  );
}
