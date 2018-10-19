import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipesService} from '../recipes.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editForm: FormGroup;
  editMode = false;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipesService: RecipesService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  initForm() {
    let name = '';
    let imagePath = '';
    let description = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipesService.getRecipe(this.id);
      name = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if (recipe['ingredients']) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern('^[1-9]+[0-9]*$')
            ])
          }));
        }
      }
    }

    this.editForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    const name = this.editForm.get('name').value;
    const desc = this.editForm.get('description').value;
    const imagePath = this.editForm.get('imagePath').value;
    const ingredients = [];


    const formArray = (<FormArray>this.editForm.get('ingredients')).controls;
    for (const formGroup of formArray) {
      const ingredient = new Ingredient(formGroup.value.name, formGroup.value.amount);
      ingredients.push(ingredient);
    }

    const recipe = new Recipe(name, desc, imagePath, ingredients);
    if (!this.editMode) {
      this.recipesService.saveRecipe(recipe);
    } else {
      this.recipesService.updateRecipe(this.id, recipe);
    }
    if (this.editForm) {
      confirm('Do you want to update the recipe ?');
    } else {
      confirm('Do you want to save the recipe ?');
    }
    this.onCancelEdit();
  }

  onAddIngredient() {
    (<FormArray>this.editForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9]+[0-9]*$')
      ])
    }));
  }

  onCancelEdit() {
    if (this.editMode) {
      this.router.navigate(['/recipes', this.id]);
    } else {
      this.router.navigate(['/recipes']);
    }
  }

  deleteIngredient(index: number) {
    (<FormArray>this.editForm.get('ingredients')).removeAt(index);
  }
}
