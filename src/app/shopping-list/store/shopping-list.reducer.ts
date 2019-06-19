import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListAction from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedingredient: Ingredient;
  editedingredientIndex: number;
}

export interface AppState {
  shoppingList: State,
}

const initialState: State = {
  ingredients: [ new Ingredient('Apples', 5),new Ingredient('Tomatoes', 10)],
  editedingredient : null,
  editedingredientIndex : -1
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListAction.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListAction.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListAction.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      }
    case ShoppingListAction.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedingredientIndex]
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      }
      console.log(updatedIngredient);
      const updatedIngredients = [...state.ingredients];
      console.log(updatedIngredients);
      updatedIngredients[state.editedingredientIndex] = updatedIngredient;
      return {
       ...state,
       ingredients: updatedIngredients,
       editedingredientIndex: -1,
       editedingredient: null
      }
    case ShoppingListAction.DELETE_INGREDIENT:
      return {
       ...state,
       ingredients: state.ingredients.filter((ig , igIndex) => {
         return igIndex !== state.editedingredientIndex;
       }),
       editedingredientIndex: -1,
       editedingredient: null
      }
    case ShoppingListAction.START_EDIT:
        return {
          ...state,
          editedingredientIndex: action.payload,
          editedingredient: {...state.ingredients[action.payload]}
        }
    case ShoppingListAction.STOP_EDIT:
      return {
          ...state,
          editedingredientIndex: null,
          editedingredient: -1
      }
    default:
      return state;
  }
}
