import {Component, OnInit} from '@angular/core';
import {Recipe} from './recipe.model';
import {RecipesService} from './recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  providers: []
})
export class RecipeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
