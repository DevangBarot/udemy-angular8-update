import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class AddIncredient implements Action {
    readonly type = ADD_INGREDIENT;
    payload: Ingredient;
}