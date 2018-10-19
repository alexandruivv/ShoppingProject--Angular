import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipesService} from '../recipes.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() id: number;
  recipe: Recipe;

  constructor(private recipesService: RecipesService) {
  }

  ngOnInit() {
    this.recipe = this.recipesService.getRecipe(this.id);
  }
}
