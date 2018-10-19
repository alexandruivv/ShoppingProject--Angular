import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingService} from '../shopping/shopping.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    new Recipe('Spaghetti', 'Some tasty spaghetti with meat and vegetables', 'https://www.tasteofhome.com/wp' +
      '-content/uploads/2018/01/' +
      'Cheesy-Cheddar-Broccoli-Casserole_EXPS_SDFM17_28900_C09_30_6b-696x696.jpg', [
      new Ingredient('Broccoli', 3),
      new Ingredient('Spaghetti', 200),
      new Ingredient('Meat', 1)
    ]),
    new Recipe('Mushrooms Pizza', 'Pizza with mushrooms and tasty spicy sauce', 'https://www.bbcgoodfood.com/sites/default/fi' +
      'les/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg', [
      new Ingredient('Mushrooms', 20),
      new Ingredient('Spicy Sauce', 1),
      new Ingredient('Egg', 2)
    ])
  ];

  recipeListModified = new Subject<Recipe[]>();


  constructor(private shoppingService: ShoppingService) {
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.saveIngredients(ingredients);
  }

  deleteIngredient(indexRecipe: number, indexIngredient: number) {
    this.recipes[indexRecipe].ingredients.splice(indexIngredient, 1);
    this.recipeListModified.next(this.recipes.slice());
  }

  saveRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeListModified.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeListModified.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeListModified.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }
}
