import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  ingredientsModified = new Subject<Ingredient[]>();
  editIngredient = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Tomato', 3), new Ingredient('Carot', 2)
  ];

  constructor() {
  }

  saveIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsModified.next(this.getIngredients().slice());
  }

  saveIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsModified.next(this.getIngredients().slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients.slice()[index];
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientsModified.next(this.getIngredients());
  }

  deleteIngredient(id: number) {
    this.ingredients.splice(id, 1);
    this.ingredientsModified.next(this.getIngredients().slice());
  }
}
