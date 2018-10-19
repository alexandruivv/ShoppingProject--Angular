import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipesService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(+params['id']);
      }
    );
  }

  addToShoppingList() {
    const ingredients = this.recipe.ingredients;
    this.recipeService.addIngredientsToShoppingList(ingredients);
    window.alert('Ingredients added to shopping list !');
  }

  onDeleteRecipe() {
    confirm('Do you want to delete this recipe ?');
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
