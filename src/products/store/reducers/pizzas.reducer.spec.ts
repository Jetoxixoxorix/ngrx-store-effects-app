import * as fromPizzas from "./pizzas.reducer";
import * as fromActions from "../actions/pizzas.action";
import { Pizza } from "src/products/models/pizza.model";

describe("PizzaReducer", () => {
  describe("undefined action", () => {
    it("should return the default state", () => {
      const { initialState } = fromPizzas;
      const action = {} as any;
      const state = fromPizzas.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe("LOAD_PIZZAS action", () => {
    it("should set loading to true", () => {
      const { initialState } = fromPizzas;
      const action = new fromActions.LoadPizzas();
      const state = fromPizzas.reducer(initialState, action);

      expect(state.entities).toEqual({});
      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(true);
    });
  });

  describe("LOAD_PIZZAS_SUCCES action", () => {
    it("should map array to entities", () => {
      const pizzas: Pizza[] = [
        {id: 1, name: 'qwe', toppings:[]},
        {id: 2, name: 'asd', toppings:[]}
      ]
      const entities = {
        1: pizzas[0],
        2: pizzas[1]
      }

      const { initialState } = fromPizzas;
      const action = new fromActions.LoadPizzasSuccess(pizzas);
      const state = fromPizzas.reducer(initialState, action);

      expect(state.entities).toEqual(entities);
      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
    });
  });
});
