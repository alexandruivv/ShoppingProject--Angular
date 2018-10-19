import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingService} from '../shopping.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  ingredient: Ingredient;
  indexIngredient: number;
  @ViewChild('f') form: NgForm;

  constructor(private shoppingService: ShoppingService) {
  }

  ngOnInit() {
    this.subscription = this.shoppingService.editIngredient.subscribe(
      (value: number) => {
        this.ingredient = this.shoppingService.getIngredient(value);
        this.indexIngredient = value;
      }
    );
  }

  saveIngredient(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.ingredient) {
      this.shoppingService.updateIngredient(this.indexIngredient, ingredient);
    } else {
      this.shoppingService.saveIngredient(ingredient);
    }
    form.reset();
    if(this.ingredient){
      this.ingredient = null;
    }
  }

  onClear(form: NgForm) {
    form.reset();
    this.ingredient = null;
  }

  onDelete(f: NgForm) {
    this.onClear(f);
    this.shoppingService.deleteIngredient(this.indexIngredient);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
