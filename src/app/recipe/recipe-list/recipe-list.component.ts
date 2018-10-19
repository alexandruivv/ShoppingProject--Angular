import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipesService} from '../recipes.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{
  subscription: Subscription;
  recipes: Recipe[];

  constructor(private recipesService: RecipesService,
              private router: Router) {
  }

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
    this.subscription = this.recipesService.recipeListModified.subscribe(
      (value: Recipe[]) => {
        this.recipes = value;
      }
    );
  }

  onNewRecipe() {
    this.router.navigate(['/recipes/new']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
